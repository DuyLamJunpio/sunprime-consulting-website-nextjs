'use client';

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const FALLBACK_DELAY_MS = 1200;
const CONTACT_CONFIG = {
  phoneNumber: '0988412965',
  telegramUsername: '@duytung180703',
  defaultCountryCode: '84',
} as const;

const TELEGRAM_USERNAME = CONTACT_CONFIG.telegramUsername.replace(/^@/, '');
const ZALO_WEB_URL = `https://zalo.me/${CONTACT_CONFIG.phoneNumber}`;
const normalizeWhatsAppPhone = (rawPhone: string, defaultCountryCode: string) => {
  const digits = rawPhone.replace(/\D/g, '');
  if (digits.startsWith(defaultCountryCode)) return digits;
  if (digits.startsWith('0')) return `${defaultCountryCode}${digits.slice(1)}`;
  return `${defaultCountryCode}${digits}`;
};
const WHATSAPP_PHONE = normalizeWhatsAppPhone(
  CONTACT_CONFIG.phoneNumber,
  CONTACT_CONFIG.defaultCountryCode
);

const openAppThenFallback = (appUrl: string, webUrl: string) => {
  const now = Date.now();
  let didHide = false;

  const handleHidden = () => {
    didHide = true;
  };

  document.addEventListener('visibilitychange', handleHidden, { once: true });

  window.location.href = appUrl;

  window.setTimeout(() => {
    document.removeEventListener('visibilitychange', handleHidden);

    const elapsed = Date.now() - now;
    const pageStillVisible = document.visibilityState === 'visible';

    if (!didHide && pageStillVisible && elapsed >= FALLBACK_DELAY_MS - 100) {
      window.open(webUrl, '_blank', 'noopener,noreferrer');
    }
  }, FALLBACK_DELAY_MS);
};

export default function ContactFloatingButtons() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(pathname !== "/");

  useEffect(() => {
    const heroElement = document.getElementById("hero-section");

    if (!heroElement || pathname !== "/") {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroBottom = heroElement.offsetTop + heroElement.offsetHeight;
      const triggerOffset = 80;
      setIsVisible(currentScrollY + triggerOffset >= heroBottom);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <div
      className={`contact-stack fixed bottom-6 right-6 z-50 flex flex-col gap-4 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <div className="contact-cta-badge contact-cta-toast">
        <span className="contact-cta-dot" />
        Nhận tư vấn ngay
      </div>

      <a
        href={ZALO_WEB_URL}
        target="_blank"
        rel="noreferrer"
        className="contact-fab contact-fab-1 group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#0068FF] text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:scale-110"
      >
        <iconify-icon icon="simple-icons:zalo" className="text-2xl" />
        <span className="absolute right-14 bg-neutral-50 text-neutral-800 text-xs font-medium px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat Zalo
        </span>
      </a>

      <a
        href={`https://t.me/${TELEGRAM_USERNAME}`}
        onClick={(event) => {
          event.preventDefault();
          openAppThenFallback(
            `tg://resolve?domain=${TELEGRAM_USERNAME}`,
            `https://t.me/${TELEGRAM_USERNAME}`
          );
        }}
        className="contact-fab contact-fab-2 group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#26A5E4] text-white shadow-lg shadow-sky-500/30 transition-all duration-300 hover:-translate-y-1 hover:scale-110"
      >
        <iconify-icon icon="simple-icons:telegram" className="text-2xl" />
        <span className="absolute right-14 bg-neutral-50 text-neutral-800 text-xs font-medium px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Telegram
        </span>
      </a>

      <a
        href={`https://wa.me/${WHATSAPP_PHONE}`}
        onClick={(event) => {
          event.preventDefault();
          openAppThenFallback(
            `whatsapp://send?phone=${WHATSAPP_PHONE}`,
            `https://wa.me/${WHATSAPP_PHONE}`
          );
        }}
        className="contact-fab contact-fab-3 group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-500/30 transition-all duration-300 hover:-translate-y-1 hover:scale-110"
      >
        <iconify-icon icon="simple-icons:whatsapp" className="text-2xl" />
        <span className="absolute right-14 bg-neutral-50 text-neutral-800 text-xs font-medium px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          WhatsApp
        </span>
      </a>
    </div>
  );
}
