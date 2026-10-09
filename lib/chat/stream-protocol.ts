/**
 * Giao thức stream giữa app/api/chat (server) và khung chat (client): mỗi dòng là một sự kiện JSON (NDJSON).
 *   {"type":"delta","text":"..."}   phần văn bản mới của câu trả lời
 *   {"type":"done"}                 trả lời xong
 *   {"type":"error","code":"..."}   lỗi xảy ra giữa chừng, `code` thuộc CHAT_ERROR_CODES
 * Lỗi xảy ra TRƯỚC khi stream bắt đầu được trả bằng mã HTTP thường kèm JSON {"error": code}.
 *
 * File này cố ý không import gì để chạy được trực tiếp trong test của Node.
 */

export const CHAT_ERROR_CODES = [
  "invalid_request",
  "message_too_long",
  "rate_limited",
  "session_limit",
  "busy",
  "unavailable",
  "not_configured",
  "refused",
  "empty",
  "network",
] as const;

export type ChatErrorCode = (typeof CHAT_ERROR_CODES)[number];

export type ChatStreamEvent =
  | { type: "delta"; text: string }
  | { type: "done" }
  | { type: "error"; code: ChatErrorCode };

export function isChatErrorCode(value: unknown): value is ChatErrorCode {
  return typeof value === "string" && (CHAT_ERROR_CODES as readonly string[]).includes(value);
}

export function encodeChatEvent(event: ChatStreamEvent): string {
  return `${JSON.stringify(event)}\n`;
}

function parseEvent(line: string): ChatStreamEvent | null {
  let value: unknown;
  try {
    value = JSON.parse(line);
  } catch {
    return null;
  }
  if (typeof value !== "object" || value === null) return null;

  const record = value as Record<string, unknown>;
  switch (record.type) {
    case "delta":
      return typeof record.text === "string" ? { type: "delta", text: record.text } : null;
    case "done":
      return { type: "done" };
    case "error":
      return isChatErrorCode(record.code) ? { type: "error", code: record.code } : null;
    default:
      return null;
  }
}

function toEvents(lines: readonly string[]): ChatStreamEvent[] {
  return lines
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map(parseEvent)
    .filter((event): event is ChatStreamEvent => event !== null);
}

export type ChatEventParser = {
  /** Nạp thêm một khối dữ liệu, trả về các sự kiện đã đủ dòng. */
  push: (chunk: string) => ChatStreamEvent[];
  /** Kết thúc luồng: xử lý nốt dòng cuối không có ký tự xuống dòng. */
  flush: () => ChatStreamEvent[];
};

/** Parser có đệm: ghép được dòng JSON bị cắt giữa hai khối mạng. */
export function createChatEventParser(): ChatEventParser {
  let buffer = "";

  return {
    push(chunk) {
      const lines = `${buffer}${chunk}`.split("\n");
      buffer = lines.pop() ?? "";
      return toEvents(lines);
    },
    flush() {
      const rest = buffer;
      buffer = "";
      return toEvents([rest]);
    },
  };
}
