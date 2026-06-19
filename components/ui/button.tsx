import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-tight transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:pointer-events-none disabled:opacity-60 active:translate-y-0";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-soft hover:-translate-y-0.5 hover:bg-brand-strong hover:shadow-brand-glow",
  secondary:
    "bg-brand-soft text-brand-ink hover:-translate-y-0.5 hover:bg-brand-soft-hover",
  outline:
    "border border-border-strong bg-transparent text-text-primary hover:-translate-y-0.5 hover:border-brand hover:text-brand",
  ghost: "bg-transparent text-text-secondary hover:bg-surface-section hover:text-text-primary",
  inverse:
    "border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:-translate-y-0.5 hover:bg-white/20",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-[15px]",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

/** Nút dùng chung — hỗ trợ render thành <button> hoặc <Link>/<a>. */
export default function Button(props: ButtonProps) {
  const { children, variant = "primary", size = "md", className, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, target, rel } = props;
    const isExternal = href.startsWith("http") || target === "_blank";
    return (
      <Link
        href={href}
        target={target}
        rel={rel ?? (isExternal ? "noreferrer" : undefined)}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  // Nhánh button: `rest` chỉ còn các thuộc tính HTML hợp lệ của <button>.
  const buttonAttributes = rest as Omit<ButtonAsButton, keyof CommonProps>;
  return (
    <button className={classes} {...buttonAttributes}>
      {children}
    </button>
  );
}
