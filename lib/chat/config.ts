/**
 * Giới hạn và tham số của trợ lý chat SunPrime.
 * Không chứa bí mật nào: file này được cả server (app/api/chat) lẫn client (components/chat) import.
 * Khoá API đọc từ biến môi trường ANTHROPIC_API_KEY, chỉ ở phía server.
 */
export const CHAT_LIMITS = {
  /** Độ dài tối đa của một câu hỏi (ký tự). */
  maxQuestionChars: 500,
  /** Câu trả lời cũ của trợ lý được cắt về mức này khi gửi lại làm ngữ cảnh. */
  maxAssistantChars: 2000,
  /** Chỉ gửi lên API số tin nhắn gần nhất này (tương đương 3 lượt hỏi - đáp). */
  maxHistoryMessages: 6,
  /** Số câu hỏi tối đa mỗi phiên trò chuyện. */
  maxSessionQuestions: 15,
  /** Số câu hỏi tối đa mỗi địa chỉ IP trong một giờ. */
  ipQuestionsPerHour: 20,
  /**
   * Chốt chặn toàn hệ thống. Giới hạn theo IP/phiên có thể bị lách bằng cách giả header hoặc đổi phiên,
   * nên cần một trần chung để chi phí không vượt kiểm soát.
   */
  globalQuestionsPerHour: 100,
  globalQuestionsPerDay: 600,
  /**
   * Trần số token đầu ra cho mỗi câu trả lời (giữ câu trả lời ngắn gọn; system prompt cũng yêu cầu trả lời ngắn).
   * Tokenizer của Haiku 5.5 đếm nhiều hơn Haiku 4.5 khoảng 30% (tài liệu migration guide), nên nới từ 600 lên 800.
   */
  maxOutputTokens: 800,
  /** Thời gian tối đa cho một lượt gọi tới Claude API (ms). */
  upstreamTimeoutMs: 45_000,
  /** Kích thước tối đa của body request (ký tự). */
  maxRequestBodyChars: 20_000,
} as const;

/**
 * Chat AI chỉ được bật khi có cấu hình production rõ ràng. Mặc định false để
 * giao diện có thể phát hành trước mà không gửi bất kỳ request nào tới /api/chat.
 */
export const CHAT_ENABLED = process.env.NEXT_PUBLIC_CHAT_ENABLED === "true";

/** Một "phiên" ở phía server được tính trong khoảng thời gian này kể từ lượt hỏi đầu tiên. */
export const CHAT_SESSION_WINDOW_MS = 6 * 60 * 60 * 1000;

/**
 * Model mặc định: Claude Haiku 5.5 (`claude-haiku-5-5`), model mới nhất và rẻ nhất trong bảng model của tài liệu
 * Claude API (từ 0,10 USD đầu vào / 0,50 USD đầu ra cho mỗi triệu token). Tên model này là ID cố định, không có hậu tố ngày.
 * Đổi model bằng biến môi trường ANTHROPIC_CHAT_MODEL, không cần sửa code.
 */
export const DEFAULT_CHAT_MODEL = "claude-haiku-5-5";
