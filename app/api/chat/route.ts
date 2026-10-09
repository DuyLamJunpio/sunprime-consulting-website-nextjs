import Anthropic from "@anthropic-ai/sdk";
import { getClientIp } from "@/lib/chat/client-ip";
import { CHAT_LIMITS, CHAT_SESSION_WINDOW_MS, DEFAULT_CHAT_MODEL } from "@/lib/chat/config";
import { parseChatRequest, type ChatTurn } from "@/lib/chat/conversation";
import { createSlidingWindowLimiter, type SlidingWindowLimiter } from "@/lib/chat/rate-limit";
import { encodeChatEvent, type ChatErrorCode, type ChatStreamEvent } from "@/lib/chat/stream-protocol";
import { SYSTEM_PROMPT } from "@/lib/chat/system-prompt";

/** Cần Node.js runtime: dùng SDK Anthropic và bộ giới hạn giữ trong bộ nhớ tiến trình. */
export const runtime = "nodejs";

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;
const GLOBAL_KEY = "global";
/** UTF-8 tối đa 4 byte mỗi ký tự: chặn sớm theo Content-Length trước khi đọc body. */
const MAX_BODY_BYTES = CHAT_LIMITS.maxRequestBodyChars * 4;
const CLIENT_CLOSED_REQUEST = 499;

const STREAM_HEADERS = {
  "Content-Type": "application/x-ndjson; charset=utf-8",
  // no-transform và X-Accel-Buffering: để proxy/nén không gom đệm làm mất hiệu ứng stream.
  "Cache-Control": "no-cache, no-transform",
  "X-Accel-Buffering": "no",
};

// Các bộ giới hạn sống trong bộ nhớ tiến trình (xem lưu ý triển khai trong lib/chat/rate-limit.ts).
const sessionLimiter = createSlidingWindowLimiter({
  limit: CHAT_LIMITS.maxSessionQuestions,
  windowMs: CHAT_SESSION_WINDOW_MS,
});
const ipLimiter = createSlidingWindowLimiter({ limit: CHAT_LIMITS.ipQuestionsPerHour, windowMs: HOUR_MS });
const globalHourLimiter = createSlidingWindowLimiter({
  limit: CHAT_LIMITS.globalQuestionsPerHour,
  windowMs: HOUR_MS,
  maxKeys: 1,
});
const globalDayLimiter = createSlidingWindowLimiter({
  limit: CHAT_LIMITS.globalQuestionsPerDay,
  windowMs: DAY_MS,
  maxKeys: 1,
});

let anthropicClient: Anthropic | null = null;

/** Khoá API lấy từ ANTHROPIC_API_KEY (chỉ ở server). Chỉ thử lại 1 lần để người dùng không chờ quá lâu. */
function getClient(): Anthropic {
  anthropicClient ??= new Anthropic({ maxRetries: 1 });
  return anthropicClient;
}

function errorResponse(code: ChatErrorCode, status: number, headers: Record<string, string> = {}): Response {
  return Response.json({ error: code }, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

type BodyResult = { ok: true; value: unknown } | { ok: false; status: number };

async function readJsonBody(request: Request): Promise<BodyResult> {
  const declaredBytes = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredBytes) && declaredBytes > MAX_BODY_BYTES) return { ok: false, status: 413 };

  try {
    const text = await request.text();
    if (text.length > CHAT_LIMITS.maxRequestBodyChars) return { ok: false, status: 413 };
    return { ok: true, value: JSON.parse(text) };
  } catch {
    return { ok: false, status: 400 };
  }
}

type LimitCheck = { limiter: SlidingWindowLimiter; key: string; code: ChatErrorCode };
type LimitRejection = { code: ChatErrorCode; retryAfterSeconds: number };

function limitChecks(ip: string, sessionId: string): LimitCheck[] {
  return [
    { limiter: sessionLimiter, key: sessionId, code: "session_limit" },
    { limiter: ipLimiter, key: ip, code: "rate_limited" },
    // Chạm trần toàn hệ thống: báo "quá tải" thay vì đổ lỗi cho riêng người dùng này.
    { limiter: globalHourLimiter, key: GLOBAL_KEY, code: "busy" },
    { limiter: globalDayLimiter, key: GLOBAL_KEY, code: "busy" },
  ];
}

function findRejection(checks: readonly LimitCheck[]): LimitRejection | null {
  for (const { limiter, key, code } of checks) {
    const decision = limiter.check(key);
    if (!decision.allowed) return { code, retryAfterSeconds: decision.retryAfterSeconds };
  }
  return null;
}

function logUpstreamFailure(error: unknown): void {
  const name = error instanceof Error ? error.name : "UnknownError";
  const status = error instanceof Anthropic.APIError && error.status ? ` (HTTP ${error.status})` : "";
  // Không ghi nội dung hội thoại: chỉ ghi loại lỗi để vận hành theo dõi.
  console.error(`[chat] Claude API call failed: ${name}${status}`);
}

/** Lỗi tạm thời (quá tải, mất kết nối, 5xx) thì người dùng thử lại được; lỗi cấu hình (khoá, model) thì không. */
function classifyUpstreamError(error: unknown): ChatErrorCode {
  if (
    error instanceof Anthropic.APIConnectionError ||
    error instanceof Anthropic.RateLimitError ||
    error instanceof Anthropic.InternalServerError
  ) {
    return "busy";
  }
  return "unavailable";
}

function openUpstream(messages: ChatTurn[], signal: AbortSignal) {
  return getClient().messages.create(
    {
      model: process.env.ANTHROPIC_CHAT_MODEL?.trim() || DEFAULT_CHAT_MODEL,
      max_tokens: CHAT_LIMITS.maxOutputTokens,
      // Haiku 5.5 bật thinking thích ứng theo mặc định và tính token suy nghĩ vào max_tokens: tắt đi để câu trả lời
      // ngắn không bị cụt hoặc rỗng, trả lời nhanh và rẻ hơn. Tham số này cũng được các model Haiku đời cũ chấp nhận.
      thinking: { type: "disabled" },
      system: SYSTEM_PROMPT,
      messages,
      stream: true,
    },
    { signal }
  );
}

type UpstreamStream = Awaited<ReturnType<typeof openUpstream>>;

/** Chuyển luồng sự kiện của Claude thành luồng NDJSON gọn cho client (chỉ giữ phần văn bản). */
function toEventStream(upstream: UpstreamStream, signal: AbortSignal): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  let isClosed = false;

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: ChatStreamEvent) => controller.enqueue(encoder.encode(encodeChatEvent(event)));
      let hasText = false;
      let stopReason: string | null = null;

      try {
        for await (const event of upstream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            if (event.delta.text) {
              hasText = true;
              send({ type: "delta", text: event.delta.text });
            }
          } else if (event.type === "message_delta") {
            stopReason = event.delta.stop_reason;
          }
        }

        if (stopReason === "refusal") send({ type: "error", code: "refused" });
        else if (!hasText) send({ type: "error", code: "empty" });
        else send({ type: "done" });
      } catch (error) {
        // Client tự ngắt kết nối thì không cần báo lỗi; còn lại báo cho client để hiện thông báo thân thiện.
        if (!signal.aborted) {
          logUpstreamFailure(error);
          send({ type: "error", code: "busy" });
        }
      } finally {
        if (!isClosed) {
          isClosed = true;
          controller.close();
        }
      }
    },
    cancel() {
      // Client đóng kết nối: dừng gọi Claude để không tốn thêm token.
      isClosed = true;
      upstream.controller.abort();
    },
  });
}

async function streamAnswer(messages: ChatTurn[], clientSignal: AbortSignal): Promise<Response> {
  const timeoutSignal = AbortSignal.timeout(CHAT_LIMITS.upstreamTimeoutMs);
  const signal = AbortSignal.any([clientSignal, timeoutSignal]);

  try {
    const upstream = await openUpstream(messages, signal);
    return new Response(toEventStream(upstream, signal), { headers: STREAM_HEADERS });
  } catch (error) {
    if (clientSignal.aborted) return new Response(null, { status: CLIENT_CLOSED_REQUEST });
    logUpstreamFailure(error);
    return errorResponse(timeoutSignal.aborted ? "busy" : classifyUpstreamError(error), 503);
  }
}

export async function POST(request: Request): Promise<Response> {
  // Thiếu khoá thì báo ngay, không tính vào hạn mức của người dùng.
  if (!process.env.ANTHROPIC_API_KEY) return errorResponse("not_configured", 503);

  const body = await readJsonBody(request);
  if (!body.ok) return errorResponse("invalid_request", body.status);

  const parsed = parseChatRequest(body.value, CHAT_LIMITS);
  if (!parsed.ok) return errorResponse(parsed.code, 400);

  const checks = limitChecks(getClientIp(request.headers), parsed.value.sessionId);
  const rejection = findRejection(checks);
  if (rejection) {
    return errorResponse(rejection.code, 429, { "Retry-After": String(rejection.retryAfterSeconds) });
  }
  // Ghi nhận hạn mức trước khi gọi Claude để các yêu cầu đồng thời không lọt qua cùng một lượt kiểm tra.
  for (const { limiter, key } of checks) limiter.record(key);

  return streamAnswer(parsed.value.messages, request.signal);
}
