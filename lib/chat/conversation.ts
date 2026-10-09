/**
 * Kiểm tra và chuẩn hoá yêu cầu chat từ client trước khi gửi lên Claude API.
 * Không tin dữ liệu client gửi: chỉ nhận các vai trò user/assistant, giới hạn độ dài và số tin nhắn,
 * và bảo đảm hội thoại gửi đi bắt đầu và kết thúc bằng tin của người dùng.
 *
 * File này cố ý không import gì để chạy được trực tiếp trong test của Node.
 */

export type ChatRole = "user" | "assistant";
export type ChatTurn = { role: ChatRole; content: string };

export type ChatRequestLimits = {
  maxQuestionChars: number;
  maxAssistantChars: number;
  maxHistoryMessages: number;
};

export type ParsedChatRequest = { sessionId: string; messages: ChatTurn[] };

type ParseFailureCode = "invalid_request" | "message_too_long";
export type ParseChatResult =
  | { ok: true; value: ParsedChatRequest }
  | { ok: false; code: ParseFailureCode };

type TurnResult = { ok: true; turn: ChatTurn } | { ok: false; code: ParseFailureCode };

const SESSION_ID_PATTERN = /^[A-Za-z0-9_-]{8,64}$/;
/** Trần số phần tử chấp nhận để việc kiểm tra không tốn tài nguyên với body bất thường. */
const MAX_RAW_MESSAGES = 50;

const fail = (code: ParseFailureCode): { ok: false; code: ParseFailureCode } => ({ ok: false, code });

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseTurn(raw: unknown, limits: ChatRequestLimits): TurnResult {
  if (!isRecord(raw)) return fail("invalid_request");

  const { role, content } = raw;
  if ((role !== "user" && role !== "assistant") || typeof content !== "string") {
    return fail("invalid_request");
  }

  const text = content.trim();
  if (text.length === 0) return fail("invalid_request");

  if (role === "user") {
    return text.length > limits.maxQuestionChars
      ? fail("message_too_long")
      : { ok: true, turn: { role, content: text } };
  }

  // Câu trả lời cũ của trợ lý chỉ làm ngữ cảnh: cắt ngắn để giới hạn số token đầu vào.
  return { ok: true, turn: { role, content: text.slice(0, limits.maxAssistantChars) } };
}

/** Giữ các tin gần nhất, bắt đầu từ tin của người dùng, và gộp các tin liên tiếp cùng vai trò. */
function normalizeTurns(turns: readonly ChatTurn[], maxMessages: number): ChatTurn[] {
  const recent = turns.slice(-maxMessages);
  const firstUserIndex = recent.findIndex((turn) => turn.role === "user");
  if (firstUserIndex === -1) return [];

  return recent.slice(firstUserIndex).reduce<ChatTurn[]>((merged, turn) => {
    const previous = merged.at(-1);
    if (previous && previous.role === turn.role) {
      return [...merged.slice(0, -1), { role: turn.role, content: `${previous.content}\n\n${turn.content}` }];
    }
    return [...merged, turn];
  }, []);
}

export function parseChatRequest(input: unknown, limits: ChatRequestLimits): ParseChatResult {
  if (!isRecord(input)) return fail("invalid_request");

  const { sessionId, messages } = input;
  if (typeof sessionId !== "string" || !SESSION_ID_PATTERN.test(sessionId)) return fail("invalid_request");
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_RAW_MESSAGES) {
    return fail("invalid_request");
  }

  const turns: ChatTurn[] = [];
  for (const raw of messages) {
    const parsed = parseTurn(raw, limits);
    if (!parsed.ok) return parsed;
    turns.push(parsed.turn);
  }

  const normalized = normalizeTurns(turns, limits.maxHistoryMessages);
  if (normalized.at(-1)?.role !== "user") return fail("invalid_request");

  return { ok: true, value: { sessionId, messages: normalized } };
}
