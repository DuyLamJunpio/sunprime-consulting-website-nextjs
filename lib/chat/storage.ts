/**
 * Lưu lịch sử hội thoại trong sessionStorage để không mất khi chuyển trang hay tải lại trang
 * (mất khi đóng tab). Mọi thao tác đọc/ghi đều bọc try/catch vì sessionStorage có thể bị chặn
 * hoặc không có (chế độ riêng tư, chính sách trình duyệt, chạy phía server).
 *
 * File này cố ý chỉ import kiểu để chạy được trực tiếp trong test của Node.
 */

export type StoredChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  /** Mã lỗi (xem stream-protocol.ts); phía dùng sẽ kiểm tra lại giá trị này. */
  error?: string;
};

export type StoredChatSession = {
  sessionId: string | null;
  questionCount: number;
  limitReached: boolean;
  messages: StoredChatMessage[];
};

const STORAGE_KEY = "sunprime-chat";
const STORAGE_VERSION = 1;
const MAX_STORED_MESSAGES = 60;
const MAX_STORED_CONTENT_CHARS = 5000;
const MAX_STORED_QUESTION_COUNT = 1000;
const SESSION_ID_PATTERN = /^[A-Za-z0-9_-]{8,64}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toStoredMessage(value: unknown): StoredChatMessage | null {
  if (!isRecord(value)) return null;

  const { id, role, content, error } = value;
  if (typeof id !== "string" || id.length === 0 || id.length > 64) return null;
  if (role !== "user" && role !== "assistant") return null;
  if (typeof content !== "string") return null;

  const message: StoredChatMessage = { id, role, content: content.slice(0, MAX_STORED_CONTENT_CHARS) };
  return typeof error === "string" && error.length <= 40 ? { ...message, error } : message;
}

/** Đọc và kiểm tra chuỗi JSON đã lưu; không tin dữ liệu trong storage (có thể bị sửa tay hoặc từ phiên bản cũ). */
export function parseStoredSession(raw: string | null): StoredChatSession | null {
  if (!raw) return null;

  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!isRecord(value) || value.version !== STORAGE_VERSION || !Array.isArray(value.messages)) return null;

  const { sessionId, questionCount, limitReached, messages } = value;
  const validCount =
    typeof questionCount === "number" && Number.isInteger(questionCount) && questionCount >= 0;

  return {
    sessionId: typeof sessionId === "string" && SESSION_ID_PATTERN.test(sessionId) ? sessionId : null,
    questionCount: validCount ? Math.min(questionCount, MAX_STORED_QUESTION_COUNT) : 0,
    limitReached: limitReached === true,
    messages: messages
      .map(toStoredMessage)
      .filter((message): message is StoredChatMessage => message !== null)
      .slice(-MAX_STORED_MESSAGES),
  };
}

export function loadChatSession(): StoredChatSession | null {
  try {
    return parseStoredSession(window.sessionStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

export function saveChatSession(session: StoredChatSession): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ version: STORAGE_VERSION, ...session }));
  } catch {
    // Không lưu được (đầy bộ nhớ hoặc bị chặn): hội thoại vẫn dùng bình thường trong trang hiện tại.
  }
}
