"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CHAT_LIMITS } from "@/lib/chat/config";
import type { ChatRole, ChatTurn } from "@/lib/chat/conversation";
import { loadChatSession, saveChatSession, type StoredChatMessage } from "@/lib/chat/storage";
import { createChatEventParser, isChatErrorCode, type ChatErrorCode, type ChatStreamEvent } from "@/lib/chat/stream-protocol";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  /** Có giá trị khi câu trả lời thất bại: giao diện hiện thông báo thân thiện kèm nút nhắn Zalo. */
  error?: ChatErrorCode;
  isStreaming?: boolean;
};

type ChatState = {
  sessionId: string | null;
  questionCount: number;
  /** Server báo đã hết hạn mức của phiên (ngoài bộ đếm phía client). */
  limitReached: boolean;
  messages: ChatMessage[];
};

const CHAT_ENDPOINT = "/api/chat";
const EMPTY_STATE: ChatState = { sessionId: null, questionCount: 0, limitReached: false, messages: [] };

class ChatRequestError extends Error {
  readonly code: ChatErrorCode;

  constructor(code: ChatErrorCode) {
    super(code);
    this.name = "ChatRequestError";
    this.code = code;
  }
}

function createId(): string {
  // crypto.randomUUID chỉ có trong ngữ cảnh bảo mật (HTTPS, localhost); dự phòng cho http thường.
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Khôi phục hội thoại từ sessionStorage. Tin đang nhận dở khi trang bị tải lại không được lưu nên không có tin "đang stream". */
function restoreState(): ChatState {
  const stored = loadChatSession();
  if (!stored) return EMPTY_STATE;

  return {
    sessionId: stored.sessionId,
    questionCount: stored.questionCount,
    limitReached: stored.limitReached,
    messages: stored.messages.map(({ error, ...message }) => ({
      ...message,
      ...(isChatErrorCode(error) ? { error } : {}),
    })),
  };
}

const toStored = ({ id, role, content, error }: ChatMessage): StoredChatMessage => ({
  id,
  role,
  content,
  ...(error ? { error } : {}),
});

/** Chỉ gửi vài lượt gần nhất; bỏ các tin lỗi và tin rỗng (không phải nội dung thật của hội thoại). */
const toApiTurns = (messages: readonly ChatMessage[]): ChatTurn[] =>
  messages
    .filter((message) => !message.error && message.content.length > 0)
    .map(({ role, content }) => ({ role, content }))
    .slice(-CHAT_LIMITS.maxHistoryMessages);

async function readErrorCode(response: Response): Promise<ChatErrorCode> {
  try {
    const body: unknown = await response.json();
    const code = typeof body === "object" && body !== null ? (body as { error?: unknown }).error : undefined;
    if (isChatErrorCode(code)) return code;
  } catch {
    // Phản hồi lỗi không phải JSON (ví dụ trang lỗi của proxy): dùng mã suy ra từ HTTP status.
  }
  return response.status === 429 ? "rate_limited" : "unavailable";
}

async function streamAnswer(
  payload: { sessionId: string; messages: ChatTurn[] },
  signal: AbortSignal,
  onDelta: (text: string) => void
): Promise<void> {
  const response = await fetch(CHAT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal,
  });
  if (!response.ok || !response.body) throw new ChatRequestError(await readErrorCode(response));

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  const parser = createChatEventParser();
  let isFinished = false;

  const handle = (events: ChatStreamEvent[]) => {
    for (const event of events) {
      if (event.type === "delta") onDelta(event.text);
      else if (event.type === "error") throw new ChatRequestError(event.code);
      else isFinished = true;
    }
  };

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    handle(parser.push(decoder.decode(value, { stream: true })));
  }
  handle(parser.flush());

  // Luồng đóng mà không có tín hiệu kết thúc: kết nối bị đứt giữa chừng.
  if (!isFinished) throw new ChatRequestError("network");
}

export type ChatController = {
  messages: ChatMessage[];
  isStreaming: boolean;
  isLimitReached: boolean;
  send: (text: string) => Promise<void>;
};

/**
 * Trạng thái hội thoại của trợ lý: gửi câu hỏi, nhận câu trả lời theo luồng, lưu lịch sử trong sessionStorage.
 * Đặt ở component luôn được mount (nút nổi) để hội thoại không mất khi đóng panel hay đổi màn hình.
 */
export function useChat(): ChatController {
  const [state, setState] = useState<ChatState>(restoreState);
  const abortRef = useRef<AbortController | null>(null);

  const isStreaming = state.messages.at(-1)?.isStreaming === true;
  const isLimitReached = state.limitReached || state.questionCount >= CHAT_LIMITS.maxSessionQuestions;

  // Lưu lịch sử sau mỗi thay đổi, trừ lúc đang nhận dở câu trả lời.
  useEffect(() => {
    if (isStreaming) return;
    saveChatSession({
      sessionId: state.sessionId,
      questionCount: state.questionCount,
      limitReached: state.limitReached,
      messages: state.messages.map(toStored),
    });
  }, [isStreaming, state]);

  // Huỷ yêu cầu đang chạy khi component bị gỡ khỏi trang.
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const send = useCallback(
    async (rawText: string) => {
      const text = rawText.trim();
      if (!text || text.length > CHAT_LIMITS.maxQuestionChars || isStreaming || isLimitReached) return;

      const userMessage: ChatMessage = { id: createId(), role: "user", content: text };
      const assistantId = createId();
      const sessionId = state.sessionId ?? createId();
      const payload = { sessionId, messages: toApiTurns([...state.messages, userMessage]) };

      setState((prev) => ({
        ...prev,
        sessionId,
        questionCount: prev.questionCount + 1,
        messages: [
          ...prev.messages,
          userMessage,
          { id: assistantId, role: "assistant", content: "", isStreaming: true },
        ],
      }));

      const updateAssistant = (update: (message: ChatMessage) => ChatMessage) =>
        setState((prev) => ({
          ...prev,
          messages: prev.messages.map((message) => (message.id === assistantId ? update(message) : message)),
        }));

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        await streamAnswer(payload, controller.signal, (delta) =>
          updateAssistant((message) => ({ ...message, content: message.content + delta }))
        );
        updateAssistant((message) => ({ ...message, isStreaming: false }));
      } catch (error) {
        if (controller.signal.aborted) return;
        const code = error instanceof ChatRequestError ? error.code : "network";
        setState((prev) => ({
          ...prev,
          limitReached: prev.limitReached || code === "session_limit",
          messages: prev.messages.map((message) =>
            message.id === assistantId ? { ...message, isStreaming: false, error: code } : message
          ),
        }));
      }
    },
    [isLimitReached, isStreaming, state.messages, state.sessionId]
  );

  return { messages: state.messages, isStreaming, isLimitReached, send };
}
