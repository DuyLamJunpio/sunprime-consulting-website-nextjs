import { CHAT_LIMITS } from "@/lib/chat/config";
import type { ChatErrorCode } from "@/lib/chat/stream-protocol";
import type { Lang } from "@/lib/i18n/messages";

/**
 * Toàn bộ chữ hiển thị của nút nổi và khung chat, theo từng ngôn ngữ (cách làm chung của dự án: chuỗi viết sẵn, không dùng thư viện i18n).
 * Lời chào và dòng lưu ý ở chân khung chat bản tiếng Việt là nguyên văn theo yêu cầu, đừng chỉnh khi chưa hỏi lại.
 */
export type ChatCopy = {
  launcherLabel: string;
  menuTitle: string;
  menuSubtitle: string;
  askAssistant: string;
  askAssistantHint: string;
  messageExpert: string;
  messageExpertHint: string;
  close: string;
  back: string;
  chatTitle: string;
  meetExpert: string;
  greeting: string;
  disclaimer: string;
  suggestionsLabel: string;
  suggestions: readonly string[];
  inputLabel: string;
  inputPlaceholder: string;
  inputLimitPlaceholder: string;
  send: string;
  typing: string;
  zaloCta: string;
  limitNotice: string;
  /** Ghi chú dưới câu trả lời bị gián đoạn giữa chừng (đã có một phần nội dung). */
  interruptedNote: string;
  errors: Record<ChatErrorCode, string>;
};

const vi: ChatCopy = {
  launcherLabel: "Nhận tư vấn ngay",
  menuTitle: "Nhận tư vấn ngay",
  menuSubtitle: "Chọn cách trao đổi phù hợp với anh/chị.",
  askAssistant: "Hỏi trợ lý SunPrime",
  askAssistantHint: "Giải đáp nhanh về kế toán, thuế, thủ tục doanh nghiệp",
  messageExpert: "Nhắn tin với chuyên viên",
  messageExpertHint: "Qua Zalo, Telegram hoặc WhatsApp",
  close: "Đóng",
  back: "Quay lại",
  chatTitle: "Trợ lý SunPrime",
  meetExpert: "Gặp chuyên viên",
  greeting:
    "Xin chào, tôi là trợ lý AI của SunPrime. Tôi hỗ trợ giải đáp nhanh về kế toán, thuế và thủ tục doanh nghiệp. Với trường hợp cụ thể của anh/chị, chuyên viên sẽ liên hệ tư vấn trực tiếp.",
  disclaimer: "Nội dung mang tính tham khảo, không thay thế tư vấn chính thức có hồ sơ.",
  suggestionsLabel: "Gợi ý câu hỏi",
  suggestions: [
    "Chi phí thành lập công ty?",
    "Hạn nộp tờ khai thuế GTGT?",
    "Hộ kinh doanh hay công ty TNHH?",
    "SunPrime có những dịch vụ nào?",
  ],
  inputLabel: "Nhập câu hỏi",
  inputPlaceholder: "Nhập câu hỏi của anh/chị…",
  inputLimitPlaceholder: "Đã hết lượt hỏi trong phiên này",
  send: "Gửi",
  typing: "Đang trả lời…",
  zaloCta: "Nhắn Zalo cho chuyên viên",
  limitNotice: `Anh/chị đã dùng hết ${CHAT_LIMITS.maxSessionQuestions} lượt hỏi của phiên này. Vui lòng liên hệ chuyên viên qua Zalo để được hỗ trợ tiếp.`,
  interruptedNote: "Câu trả lời bị gián đoạn. Anh/chị có thể hỏi lại hoặc nhắn chuyên viên qua Zalo.",
  errors: {
    invalid_request: "Tôi chưa hiểu được yêu cầu này. Anh/chị vui lòng thử lại hoặc liên hệ chuyên viên qua Zalo.",
    message_too_long: `Câu hỏi quá dài (tối đa ${CHAT_LIMITS.maxQuestionChars} ký tự). Anh/chị vui lòng rút gọn giúp tôi.`,
    rate_limited:
      "Thiết bị này đã gửi nhiều câu hỏi trong thời gian ngắn. Anh/chị vui lòng thử lại sau hoặc liên hệ chuyên viên qua Zalo.",
    session_limit: `Anh/chị đã dùng hết ${CHAT_LIMITS.maxSessionQuestions} lượt hỏi của phiên này. Vui lòng liên hệ chuyên viên qua Zalo để được hỗ trợ tiếp.`,
    busy: "Trợ lý đang quá tải. Anh/chị vui lòng thử lại sau ít phút hoặc nhắn chuyên viên qua Zalo.",
    unavailable: "Trợ lý tạm thời chưa trả lời được. Anh/chị vui lòng nhắn chuyên viên qua Zalo để được hỗ trợ ngay.",
    not_configured: "Trợ lý tạm thời chưa trả lời được. Anh/chị vui lòng nhắn chuyên viên qua Zalo để được hỗ trợ ngay.",
    refused: "Tôi chưa thể trả lời câu hỏi này. Anh/chị vui lòng liên hệ chuyên viên qua Zalo để được hỗ trợ.",
    empty:
      "Tôi chưa có câu trả lời cho câu hỏi này. Anh/chị vui lòng diễn đạt lại hoặc liên hệ chuyên viên qua Zalo.",
    network:
      "Không kết nối được tới trợ lý. Anh/chị vui lòng kiểm tra mạng và thử lại, hoặc nhắn chuyên viên qua Zalo.",
  },
};

const en: ChatCopy = {
  launcherLabel: "Get advice now",
  menuTitle: "Get advice now",
  menuSubtitle: "Choose the way that suits you best.",
  askAssistant: "Ask the SunPrime assistant",
  askAssistantHint: "Quick answers on accounting, tax and business procedures",
  messageExpert: "Message a specialist",
  messageExpertHint: "Via Zalo, Telegram or WhatsApp",
  close: "Close",
  back: "Back",
  chatTitle: "SunPrime Assistant",
  meetExpert: "Talk to a specialist",
  greeting:
    "Hello, I'm SunPrime's AI assistant. I can quickly answer questions about accounting, tax and business procedures. For your specific case, a specialist will advise you directly.",
  disclaimer: "For reference only; not a substitute for formal advice based on your documents.",
  suggestionsLabel: "Suggested questions",
  suggestions: [
    "Cost of setting up a company?",
    "VAT return deadlines?",
    "Household business or LLC?",
    "What services does SunPrime offer?",
  ],
  inputLabel: "Type your question",
  inputPlaceholder: "Type your question…",
  inputLimitPlaceholder: "No questions left in this session",
  send: "Send",
  typing: "Answering…",
  zaloCta: "Message a specialist on Zalo",
  limitNotice: `You have used all ${CHAT_LIMITS.maxSessionQuestions} questions in this session. Please contact a specialist on Zalo for further help.`,
  interruptedNote: "The answer was interrupted. You can ask again or message a specialist on Zalo.",
  errors: {
    invalid_request: "I could not understand that request. Please try again or contact a specialist on Zalo.",
    message_too_long: `Your question is too long (max ${CHAT_LIMITS.maxQuestionChars} characters). Please shorten it.`,
    rate_limited: "This device has sent many questions in a short time. Please try again later or contact a specialist on Zalo.",
    session_limit: `You have used all ${CHAT_LIMITS.maxSessionQuestions} questions in this session. Please contact a specialist on Zalo for further help.`,
    busy: "The assistant is overloaded. Please try again in a few minutes or message a specialist on Zalo.",
    unavailable: "The assistant is temporarily unavailable. Please message a specialist on Zalo for immediate help.",
    not_configured: "The assistant is temporarily unavailable. Please message a specialist on Zalo for immediate help.",
    refused: "I cannot answer this question. Please contact a specialist on Zalo for help.",
    empty: "I do not have an answer for this question. Please rephrase it or contact a specialist on Zalo.",
    network: "Could not reach the assistant. Please check your connection and try again, or message a specialist on Zalo.",
  },
};

export const chatCopy: Record<Lang, ChatCopy> = { vi, en };
