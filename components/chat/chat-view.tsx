"use client";

import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent, type KeyboardEvent } from "react";
import type { ChatCopy } from "@/components/chat/chat-copy";
import { BackIcon, CloseIcon, SendIcon, UserIcon } from "@/components/chat/chat-icons";
import type { ChatController, ChatMessage } from "@/components/chat/use-chat";
import { CHAT_LIMITS } from "@/lib/chat/config";
import { cn } from "@/lib/cn";
import { contactChannels } from "@/lib/contact-channels";

const MAX_INPUT_HEIGHT_PX = 112;
/** Chỉ hiện bộ đếm ký tự khi gần chạm giới hạn. */
const COUNTER_THRESHOLD = Math.floor(CHAT_LIMITS.maxQuestionChars * 0.8);

const HEADER_BUTTON_CLASS =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-text-inverse transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
const ZALO_CTA_CLASS =
  "mt-3 inline-flex items-center rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-text-inverse transition-colors hover:bg-brand-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

function ZaloLink({ label, className }: { label: string; className: string }) {
  return (
    <a href={contactChannels.zalo.url} target="_blank" rel="noopener noreferrer" className={className}>
      {label}
    </a>
  );
}

function MessageBubble({ message, copy }: { message: ChatMessage; copy: ChatCopy }) {
  // Câu trả lời chưa có chữ nào được thay bằng chỉ báo "Đang trả lời"; thông báo hết lượt có khối riêng bên dưới.
  if (message.isStreaming && message.content === "") return null;
  if (message.error === "session_limit" && message.content === "") return null;

  const isUser = message.role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-br-md bg-brand text-text-inverse"
            : "rounded-bl-md border border-border bg-surface-section text-text-secondary"
        )}
      >
        {message.content || (message.error ? copy.errors[message.error] : null)}
        {message.content && message.error ? (
          <span className="mt-2 block text-xs italic text-text-muted">{copy.interruptedNote}</span>
        ) : null}
        {message.error ? (
          <div>
            <ZaloLink label={copy.zaloCta} className={ZALO_CTA_CLASS} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function TypingIndicator({ label }: { label: string }) {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-border bg-surface-section px-3.5 py-2.5 text-sm text-text-muted">
        <span className="flex gap-1" aria-hidden="true">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-text-muted motion-reduce:animate-none" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-text-muted [animation-delay:150ms] motion-reduce:animate-none" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-text-muted [animation-delay:300ms] motion-reduce:animate-none" />
        </span>
        {label}
      </div>
    </div>
  );
}

type ChatViewProps = {
  chat: ChatController;
  copy: ChatCopy;
  titleId: string;
  onBack: () => void;
  onClose: () => void;
};

/** Khung chat với trợ lý: đầu khung luôn có nút "Gặp chuyên viên", chân khung luôn có dòng lưu ý. */
export default function ChatView({ chat, copy, titleId, onBack, onClose }: ChatViewProps) {
  const { messages, isStreaming, isLimitReached, send } = chat;
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const inputId = useId();

  const hasUserMessage = messages.some((message) => message.role === "user");
  const lastMessage = messages.at(-1);
  const isWaitingForFirstToken = lastMessage?.isStreaming === true && lastMessage.content === "";
  const canSend = draft.trim().length > 0 && !isStreaming && !isLimitReached;

  // Tự cuộn xuống cuối khi có tin mới hoặc đang nhận chữ. Chưa có tin nào thì giữ nguyên để lời chào không bị cắt mép trên.
  useEffect(() => {
    const list = listRef.current;
    if (list && messages.length > 0) list.scrollTop = list.scrollHeight;
  }, [messages, isLimitReached]);

  // Chỉ tự đặt con trỏ vào ô nhập trên thiết bị có chuột; trên điện thoại làm vậy sẽ bật bàn phím che lời chào.
  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) inputRef.current?.focus();
  }, []);

  const submit = () => {
    if (!canSend) return;
    const text = draft;
    setDraft("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    void send(text);
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.currentTarget;
    setDraft(input.value);
    input.style.height = "auto";
    input.style.height = `${Math.min(input.scrollHeight, MAX_INPUT_HEIGHT_PX)}px`;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    // Bỏ qua Enter khi đang gõ dấu tiếng Việt (IME) để không gửi nhầm lúc chốt chữ.
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      submit();
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit();
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex shrink-0 items-center gap-1 bg-linear-to-br from-brand via-brand-strong to-brand-ink px-2 py-2 text-text-inverse">
        <button type="button" onClick={onBack} aria-label={copy.back} className={HEADER_BUTTON_CLASS}>
          <BackIcon className="h-5 w-5" />
        </button>
        <h2 id={titleId} className="min-w-0 flex-1 truncate px-1 font-heading text-base font-semibold text-text-inverse">
          {copy.chatTitle}
        </h2>
        <button type="button" onClick={onClose} aria-label={copy.close} className={HEADER_BUTTON_CLASS}>
          <CloseIcon className="h-5 w-5" />
        </button>
      </header>

      <div className="shrink-0 border-b border-border bg-surface-section px-3 py-2">
        <a
          href={contactChannels.zalo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-brand bg-surface-base px-3 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <UserIcon className="h-4 w-4" />
          {copy.meetExpert}
        </a>
      </div>

      <div
        ref={listRef}
        role="log"
        aria-live="polite"
        aria-busy={isStreaming}
        className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-3 py-4"
      >
        <div className="flex justify-start">
          <p className="max-w-[85%] rounded-2xl rounded-bl-md border border-border bg-surface-section px-3.5 py-2.5 text-sm leading-relaxed text-text-secondary">
            {copy.greeting}
          </p>
        </div>

        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} copy={copy} />
        ))}

        {isWaitingForFirstToken ? <TypingIndicator label={copy.typing} /> : null}

        {isLimitReached && !isStreaming ? (
          <div className="rounded-2xl border border-brand-ring bg-brand-soft px-3.5 py-3 text-sm leading-relaxed text-brand-ink">
            {copy.limitNotice}
            <div>
              <ZaloLink label={copy.zaloCta} className={ZALO_CTA_CLASS} />
            </div>
          </div>
        ) : null}
      </div>

      {!hasUserMessage ? (
        <div className="shrink-0 px-3 pb-3">
          <p className="mb-2 text-xs font-medium text-text-muted">{copy.suggestionsLabel}</p>
          <div className="flex flex-wrap gap-2">
            {copy.suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                disabled={isStreaming}
                onClick={() => void send(suggestion)}
                className="rounded-full border border-border-strong bg-surface-base px-3 py-1.5 text-left text-xs font-medium text-text-secondary transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="shrink-0 border-t border-border bg-surface-base px-3 pt-3">
        <label htmlFor={inputId} className="sr-only">
          {copy.inputLabel}
        </label>
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            id={inputId}
            rows={1}
            value={draft}
            maxLength={CHAT_LIMITS.maxQuestionChars}
            disabled={isLimitReached}
            placeholder={isLimitReached ? copy.inputLimitPlaceholder : copy.inputPlaceholder}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="max-h-28 min-h-11 flex-1 resize-none rounded-xl border border-border-strong bg-surface-base px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-ring disabled:cursor-not-allowed disabled:bg-surface-section"
          />
          <button
            type="submit"
            disabled={!canSend}
            aria-label={copy.send}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand text-text-inverse transition-colors hover:bg-brand-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SendIcon className="h-5 w-5" />
          </button>
        </div>
        {draft.length >= COUNTER_THRESHOLD ? (
          <p className="mt-1 text-right text-xs text-text-muted">
            {draft.length}/{CHAT_LIMITS.maxQuestionChars}
          </p>
        ) : null}
      </form>

      <p className="shrink-0 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] pt-2 text-center text-[11px] leading-snug text-text-muted">
        {copy.disclaimer}
      </p>
    </div>
  );
}
