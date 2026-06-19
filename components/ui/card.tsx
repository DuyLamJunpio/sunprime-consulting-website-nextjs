import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** Bật hiệu ứng nâng + đổ bóng khi hover. Mặc định true. */
  interactive?: boolean;
  as?: ElementType;
};

/** Card nền sáng, viền mềm, bóng đổ depth — khối nội dung chuẩn toàn site. */
export default function Card({
  children,
  className,
  interactive = true,
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-3xl border border-border bg-surface-card shadow-soft transition-all duration-300",
        interactive &&
          "hover:-translate-y-1 hover:border-brand-ring hover:shadow-soft-lg",
        className
      )}
    >
      {children}
    </Tag>
  );
}
