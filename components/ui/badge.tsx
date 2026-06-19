import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  /** Tông màu. Mặc định "brand". */
  tone?: "brand" | "accent" | "neutral";
  /** Chấm tròn nhấp nháy ở đầu (cho "mới", "nổi bật"...). */
  withDot?: boolean;
};

const tones = {
  brand: "border-brand/30 bg-brand-soft text-brand-ink",
  accent: "border-accent/25 bg-accent-soft text-accent-ink",
  neutral: "border-border bg-surface-section text-text-secondary",
} as const;

const dotTones = {
  brand: "bg-brand",
  accent: "bg-accent",
  neutral: "bg-text-muted",
} as const;

/** Nhãn nhỏ (eyebrow/pill) dùng cho điểm nhấn phía trên tiêu đề hoặc tag. */
export default function Badge({
  children,
  className,
  tone = "brand",
  withDot = false,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em]",
        tones[tone],
        className
      )}
    >
      {withDot && (
        <span className={cn("h-1.5 w-1.5 animate-pulse rounded-full", dotTones[tone])} />
      )}
      {children}
    </span>
  );
}
