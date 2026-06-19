import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/motion";
import Badge from "@/components/ui/badge";

type SectionHeadingProps = {
  /** Nhãn nhỏ phía trên tiêu đề. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Thẻ heading cho SEO. Mặc định h2. */
  as?: "h1" | "h2" | "h3";
  tone?: "brand" | "accent" | "neutral";
};

/** Khối tiêu đề section nhất quán: eyebrow + heading + mô tả, có hiệu ứng reveal. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  as: Tag = "h2",
  tone = "brand",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        isCenter ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <Badge tone={tone} withDot>
          {eyebrow}
        </Badge>
      )}
      <Tag
        className={cn(
          "font-heading font-semibold text-text-primary",
          Tag === "h1"
            ? "text-4xl sm:text-5xl lg:text-6xl"
            : "text-3xl sm:text-4xl lg:text-[2.75rem]",
          isCenter && "mx-auto max-w-3xl"
        )}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            "text-base leading-relaxed text-text-muted sm:text-lg",
            isCenter ? "mx-auto max-w-2xl" : "max-w-2xl"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
