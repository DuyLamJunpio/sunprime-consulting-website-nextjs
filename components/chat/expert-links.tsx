"use client";

import type { MouseEvent } from "react";
import { contactChannels } from "@/lib/contact-channels";

const APP_FALLBACK_DELAY_MS = 1200;

/**
 * Mở ứng dụng (Telegram, WhatsApp) trước; nếu trang vẫn còn hiển thị sau một lúc, mở bản web.
 * Giữ nguyên cách hoạt động của cụm nút nổi cũ.
 */
function openAppThenFallback(appUrl: string, webUrl: string): void {
  const startedAt = Date.now();
  let didHide = false;

  const handleHidden = () => {
    didHide = true;
  };
  document.addEventListener("visibilitychange", handleHidden, { once: true });

  window.location.href = appUrl;

  window.setTimeout(() => {
    document.removeEventListener("visibilitychange", handleHidden);

    const elapsed = Date.now() - startedAt;
    const pageStillVisible = document.visibilityState === "visible";
    if (!didHide && pageStillVisible && elapsed >= APP_FALLBACK_DELAY_MS - 100) {
      window.open(webUrl, "_blank", "noopener,noreferrer");
    }
  }, APP_FALLBACK_DELAY_MS);
}

type ExpertChannel = {
  id: string;
  label: string;
  icon: string;
  /** Màu nhận diện của chính ứng dụng (Zalo, Telegram, WhatsApp). */
  brandClass: string;
  href: string;
  appUrl?: string;
};

const CHANNELS: readonly ExpertChannel[] = [
  {
    id: "zalo",
    label: "Chat Zalo",
    icon: "simple-icons:zalo",
    brandClass: "bg-[#0068FF]",
    href: contactChannels.zalo.url,
  },
  {
    id: "telegram",
    label: "Telegram",
    icon: "simple-icons:telegram",
    brandClass: "bg-[#26A5E4]",
    href: contactChannels.telegram.url,
    appUrl: contactChannels.telegram.appUrl,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: "simple-icons:whatsapp",
    brandClass: "bg-[#25D366]",
    href: contactChannels.whatsapp.url,
    appUrl: contactChannels.whatsapp.appUrl,
  },
];

/**
 * Nạp sẵn (ẩn) các icon Zalo/Telegram/WhatsApp ngay khi vào trang, như cụm nút cũ vốn luôn hiển thị chúng,
 * để vòng tròn kênh liên hệ có biểu tượng ngay khi người dùng xổ danh sách ra, không phải chờ tải icon.
 */
export function ExpertIconPreloader() {
  return (
    <span hidden aria-hidden="true">
      {CHANNELS.map((channel) => (
        <iconify-icon key={channel.id} icon={channel.icon} />
      ))}
    </span>
  );
}

/** Danh sách liên kết nhắn tin trực tiếp với chuyên viên (Zalo, Telegram, WhatsApp). */
export default function ExpertLinks() {
  const handleClick = (channel: ExpertChannel) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (!channel.appUrl) return;
    event.preventDefault();
    openAppThenFallback(channel.appUrl, channel.href);
  };

  return (
    <ul className="mt-2 space-y-2">
      {CHANNELS.map((channel) => (
        <li key={channel.id}>
          <a
            href={channel.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick(channel)}
            className="flex items-center gap-3 rounded-xl border border-border bg-surface-base px-3 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:border-brand-ring hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white ${channel.brandClass}`}
            >
              <iconify-icon icon={channel.icon} className="text-xl" />
            </span>
            {channel.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
