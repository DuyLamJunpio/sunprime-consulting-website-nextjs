import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  /** Bề rộng tối đa. Mặc định "default" (max-w-7xl). */
  size?: "narrow" | "default" | "wide";
  as?: ElementType;
};

const sizeMap = {
  narrow: "max-w-3xl",
  default: "max-w-7xl",
  wide: "max-w-[88rem]",
} as const;

/** Container chuẩn: căn giữa, padding ngang responsive nhất quán toàn site. */
export default function Container({
  children,
  className,
  size = "default",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizeMap[size], className)}>
      {children}
    </Tag>
  );
}
