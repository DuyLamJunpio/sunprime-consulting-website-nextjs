"use client";

/**
 * Template chạy lại mỗi lần điều hướng → dùng để tạo hiệu ứng vào trang mượt.
 * Tôn trọng prefers-reduced-motion (tắt chuyển động khi người dùng yêu cầu).
 *
 * QUAN TRỌNG: chỉ animate `opacity`, KHÔNG dùng `transform`.
 * `transform` trên phần tử cha sẽ phá vỡ `position: fixed`/`sticky` của con
 * (vd: modal slide-over, thanh lọc sticky) khiến chúng bị giới hạn trong vùng trang.
 */

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
