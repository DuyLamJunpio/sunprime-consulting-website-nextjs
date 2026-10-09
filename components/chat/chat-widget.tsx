"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { chatCopy, type ChatCopy } from "@/components/chat/chat-copy";
import { ChatBubbleIcon, ChevronDownIcon, CloseIcon, UserIcon } from "@/components/chat/chat-icons";
import ChatView from "@/components/chat/chat-view";
import ExpertLinks, { ExpertIconPreloader } from "@/components/chat/expert-links";
import { useChat } from "@/components/chat/use-chat";
import {
  useFooterClearance,
  useIsPastHero,
  useMobileScrollLock,
  useVisualViewportBounds,
} from "@/components/chat/use-widget-layout";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/cn";
import { CHAT_ENABLED } from "@/lib/chat/config";

type PanelView = "menu" | "chat";

/**
 * Đáy của nút nổi: mặc định cách đáy màn hình 1rem (cộng vùng an toàn của iPhone); khi footer lọt vào màn hình,
 * hook useFooterClearance đặt --chat-footer-clear để nút "dừng" ngay trên mép footer, không đè lên footer.
 */
const ROOT_STYLE = {
  "--chat-bottom": "max(calc(1rem + env(safe-area-inset-bottom, 0px)), var(--chat-footer-clear, 0px))",
} as CSSProperties;

const PANEL_CLASS = cn(
  "fixed z-[60] flex flex-col overflow-hidden border border-border bg-surface-base shadow-soft-xl outline-none animate-fade-in-up motion-reduce:animate-none",
  // Điện thoại: gần toàn màn hình, bám theo vùng nhìn thấy để bàn phím ảo không che ô nhập.
  "left-2 right-2 top-[calc(0.5rem_+_var(--chat-vv-top,0px))] h-[var(--chat-vv-height,calc(100dvh_-_1rem))] rounded-2xl",
  // Từ 640px: hộp 24rem nằm ngay trên nút nổi.
  "sm:left-auto sm:right-6 sm:top-auto sm:bottom-[calc(var(--chat-bottom)_+_4.5rem)] sm:h-[38rem] sm:max-h-[calc(100dvh_-_8rem)] sm:w-96"
);

const OPTION_CLASS =
  "flex w-full items-center gap-3 rounded-2xl border border-border bg-surface-base p-4 text-left shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-ring hover:shadow-soft-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

type MenuViewProps = {
  copy: ChatCopy;
  titleId: string;
  showExperts: boolean;
  onToggleExperts: () => void;
  onOpenChat: () => void;
  onClose: () => void;
};

/** Màn hình chọn cách trao đổi: hỏi trợ lý AI hoặc nhắn tin với chuyên viên. */
function MenuView({ copy, titleId, showExperts, onToggleExperts, onOpenChat, onClose }: MenuViewProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex shrink-0 items-start justify-between gap-3 bg-linear-to-br from-brand via-brand-strong to-brand-ink py-3 pl-5 pr-2 text-text-inverse">
        <div className="min-w-0 py-1">
          <h2 id={titleId} className="font-heading text-lg font-semibold text-text-inverse">
            {copy.menuTitle}
          </h2>
          <p className="mt-0.5 text-sm text-white/80">{copy.menuSubtitle}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={copy.close}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-text-inverse transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </header>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain p-4">
        <button type="button" onClick={onOpenChat} className={OPTION_CLASS}>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
            <ChatBubbleIcon className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-[15px] font-semibold text-text-primary">{copy.askAssistant}</span>
            <span className="mt-0.5 block text-sm text-text-muted">{copy.askAssistantHint}</span>
          </span>
        </button>

        <div>
          <button
            type="button"
            onClick={onToggleExperts}
            aria-expanded={showExperts}
            className={OPTION_CLASS}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <UserIcon className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-semibold text-text-primary">{copy.messageExpert}</span>
              <span className="mt-0.5 block text-sm text-text-muted">{copy.messageExpertHint}</span>
            </span>
            <ChevronDownIcon
              className={cn("h-5 w-5 shrink-0 text-text-muted transition-transform duration-200", showExperts && "rotate-180")}
            />
          </button>
          {showExperts ? <ExpertLinks /> : null}
        </div>
      </div>
    </div>
  );
}

/**
 * MỘT nút nổi duy nhất ở góc dưới bên phải, thay cho cụm nút Zalo/Telegram/WhatsApp cũ.
 * Bấm vào mở panel với hai lựa chọn: hỏi trợ lý AI (khung chat ngay trong panel) hoặc nhắn tin với chuyên viên.
 */
export default function ChatWidget() {
  const { lang } = useI18n();
  const copy = chatCopy[lang];
  const pathname = usePathname();
  const chat = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<PanelView>("menu");
  const [showExperts, setShowExperts] = useState(false);
  const titleId = useId();
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Trên trang chủ chỉ hiện nút sau khi cuộn qua hero (như cụm nút cũ); các trang khác luôn hiện.
  const isPastHero = useIsPastHero(pathname);
  const isVisible = isOpen || pathname !== "/" || isPastHero;

  useFooterClearance(rootRef, fabRef, isOpen, pathname);
  useMobileScrollLock(isOpen);
  useVisualViewportBounds(rootRef, isOpen);

  useEffect(() => {
    if (isOpen) panelRef.current?.focus();
  }, [isOpen]);

  const openPanel = () => {
    setView("menu");
    setShowExperts(false);
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
    fabRef.current?.focus();
  };

  const handlePanelKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      closePanel();
    }
  };

  return (
    <div ref={rootRef} style={ROOT_STYLE}>
      <ExpertIconPreloader />
      {isOpen ? (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-labelledby={titleId}
          tabIndex={-1}
          onKeyDown={handlePanelKeyDown}
          className={PANEL_CLASS}
        >
          {view === "chat" ? (
            <ChatView
              chat={chat}
              copy={copy}
              enabled={CHAT_ENABLED}
              titleId={titleId}
              onBack={() => setView("menu")}
              onClose={closePanel}
            />
          ) : (
            <MenuView
              copy={copy}
              titleId={titleId}
              showExperts={showExperts}
              onToggleExperts={() => setShowExperts((current) => !current)}
              onOpenChat={() => setView("chat")}
              onClose={closePanel}
            />
          )}
        </div>
      ) : null}

      <button
        ref={fabRef}
        type="button"
        onClick={isOpen ? closePanel : openPanel}
        aria-label={isOpen ? copy.close : copy.launcherLabel}
        aria-expanded={isOpen}
        aria-controls={isOpen ? panelId : undefined}
        aria-hidden={!isVisible}
        tabIndex={isVisible ? 0 : -1}
        className={cn(
          // Không dùng transition-all: vị trí `bottom` phải bám theo thao tác cuộn ngay lập tức, nếu bị làm mượt thì nút trễ và đè lên footer.
          "group fixed bottom-[var(--chat-bottom)] right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-text-inverse shadow-soft-lg ring-1 ring-white/20 transition duration-300 hover:-translate-y-0.5 hover:bg-brand-strong hover:shadow-brand-glow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:right-6",
          isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        )}
      >
        {isOpen ? <CloseIcon className="h-6 w-6" /> : <ChatBubbleIcon className="h-6 w-6" />}
        {isOpen ? null : (
          <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded bg-neutral-50 px-2 py-1 text-xs font-medium text-neutral-800 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 sm:block">
            {copy.launcherLabel}
          </span>
        )}
      </button>
    </div>
  );
}
