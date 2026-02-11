import React from 'react';

export default function ContactFloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 animate-fade-up" style={{ animationDelay: '1s' }}>
      <a
        href="https://zalo.me/YOUR_PHONE_NUMBER"
        target="_blank"
        rel="noreferrer"
        className="w-12 h-12 bg-[#0068FF] rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30 hover:scale-110 hover:-translate-y-1 transition-all duration-300 group relative"
      >
        <iconify-icon icon="simple-icons:zalo" className="text-2xl" />
        <span className="absolute right-14 bg-neutral-50 text-neutral-800 text-xs font-medium px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat Zalo
        </span>
      </a>

      <a
        href="https://t.me/YOUR_USERNAME"
        target="_blank"
        rel="noreferrer"
        className="w-12 h-12 bg-[#26A5E4] rounded-full flex items-center justify-center text-white shadow-lg shadow-sky-500/30 hover:scale-110 hover:-translate-y-1 transition-all duration-300 group relative"
      >
        <iconify-icon icon="simple-icons:telegram" className="text-2xl" />
        <span className="absolute right-14 bg-neutral-50 text-neutral-800 text-xs font-medium px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Telegram
        </span>
      </a>

      <a
        href="https://wa.me/YOUR_PHONE_NUMBER"
        target="_blank"
        rel="noreferrer"
        className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30 hover:scale-110 hover:-translate-y-1 transition-all duration-300 group relative"
      >
        <iconify-icon icon="simple-icons:whatsapp" className="text-2xl" />
        <span className="absolute right-14 bg-neutral-50 text-neutral-800 text-xs font-medium px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          WhatsApp
        </span>
      </a>
    </div>
  );
}
