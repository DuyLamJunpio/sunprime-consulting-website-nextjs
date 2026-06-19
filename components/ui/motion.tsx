"use client";

/**
 * Motion primitives dùng chung cho toàn site (framer-motion).
 * - Tôn trọng prefers-reduced-motion: tự tắt chuyển động khi người dùng yêu cầu.
 * - Dùng <Reveal> cho khối xuất hiện khi cuộn tới, <Stagger>/<StaggerItem> cho danh sách.
 *
 * Lưu ý kỹ thuật: các motion component được tạo SẴN ở cấp module (không tạo trong render)
 * để tránh tạo lại component mỗi lần render — tốt cho hiệu năng và đúng quy tắc React.
 */

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Registry motion component tĩnh theo tên thẻ. */
const MOTION_TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  ul: motion.ul,
  li: motion.li,
  span: motion.span,
} as const;

type MotionTagName = keyof typeof MOTION_TAGS;

type Direction = "up" | "down" | "left" | "right" | "none";

const offsetFor = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Hướng trôi vào. Mặc định "up". */
  direction?: Direction;
  /** Khoảng cách trôi (px). Mặc định 24. */
  distance?: number;
  /** Trễ (giây) trước khi chạy. */
  delay?: number;
  /** Thời lượng (giây). Mặc định 0.6. */
  duration?: number;
  /** Lặp lại mỗi lần vào viewport hay chỉ chạy 1 lần. Mặc định 1 lần. */
  once?: boolean;
  as?: MotionTagName;
};

export function Reveal({
  children,
  className,
  direction = "up",
  distance = 24,
  delay = 0,
  duration = 0.6,
  once = true,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = MOTION_TAGS[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offsetFor(direction, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "0px 0px -10% 0px" }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** Khoảng cách thời gian giữa các item (giây). */
  stagger?: number;
  delay?: number;
  once?: boolean;
  as?: MotionTagName;
};

export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  once = true,
  as = "div",
}: StaggerProps) {
  const reduce = useReducedMotion();
  const MotionTag = MOTION_TAGS[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </MotionTag>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: MotionTagName;
};

export function StaggerItem({ children, className, as = "div" }: StaggerItemProps) {
  const reduce = useReducedMotion();
  const MotionTag = MOTION_TAGS[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag className={className} variants={itemVariants}>
      {children}
    </MotionTag>
  );
}
