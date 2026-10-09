type IconProps = { className?: string };

/** Icon nét đơn giản, trang trí (ẩn với trình đọc màn hình). Dùng SVG nhúng để hiện ngay, không phụ thuộc CDN. */
const SHARED_PROPS = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
} as const;

export function ChatBubbleIcon({ className }: IconProps) {
  return (
    <svg {...SHARED_PROPS} className={className}>
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.6-.7L3 21l1.9-5.1A8.4 8.4 0 1 1 21 11.5Z" />
      <path d="M8.5 10.5h7" />
      <path d="M8.5 14h4.5" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg {...SHARED_PROPS} className={className}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export function BackIcon({ className }: IconProps) {
  return (
    <svg {...SHARED_PROPS} className={className}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export function SendIcon({ className }: IconProps) {
  return (
    <svg {...SHARED_PROPS} className={className}>
      <path d="M22 2 11 13" />
      <path d="m22 2-7 20-4-9-9-4 20-7Z" />
    </svg>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg {...SHARED_PROPS} className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function UserIcon({ className }: IconProps) {
  return (
    <svg {...SHARED_PROPS} className={className}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
