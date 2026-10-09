"use client";

import { useEffect, useState, type RefObject } from "react";

/** Nút nổi dừng cách mép trên footer khoảng này (px). */
const FOOTER_GAP_PX = 8;
/** Trên trang chủ, nút chỉ hiện khi đã cuộn qua hero thêm chừng này (px). */
const HERO_TRIGGER_OFFSET_PX = 80;
/** Panel trên điện thoại cách mép màn hình 0.5rem mỗi phía (trên + dưới = 16px). */
const MOBILE_PANEL_MARGIN_TOTAL_PX = 16;
const MOBILE_QUERY = "(max-width: 639px)";

/** Trên trang chủ: đã cuộn qua khối hero (#hero-section) chưa. Trang khác luôn trả về false và không dùng giá trị này. */
export function useIsPastHero(pathname: string): boolean {
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const heroElement = document.getElementById("hero-section");
    if (!heroElement || pathname !== "/") return;

    const handleScroll = () => {
      const heroBottom = heroElement.offsetTop + heroElement.offsetHeight;
      setIsPastHero(window.scrollY + HERO_TRIGGER_OFFSET_PX >= heroBottom);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return isPastHero;
}

/**
 * Khi footer lọt vào màn hình, nâng nút nổi lên để nó "dừng" ngay trên mép footer thay vì đè lên footer
 * (đặt biến CSS --chat-footer-clear trên phần tử gốc). Khi footer phủ kín màn hình, nút trượt ra ngoài và bị ẩn
 * khỏi bàn phím/trình đọc màn hình. Khi panel đang mở thì không nâng, để panel đứng yên lúc người dùng đang trò chuyện.
 */
export function useFooterClearance(
  rootRef: RefObject<HTMLDivElement | null>,
  fabRef: RefObject<HTMLButtonElement | null>,
  isOpen: boolean,
  pathname: string
): void {
  useEffect(() => {
    const root = rootRef.current;
    const fab = fabRef.current;
    if (!root || !fab) return;

    const footer = document.querySelector("body > footer");
    let frame = 0;

    const update = () => {
      frame = 0;
      const overlap = footer && !isOpen ? window.innerHeight - footer.getBoundingClientRect().top : 0;
      const clearance = overlap > 0 ? Math.round(overlap + FOOTER_GAP_PX) : 0;
      root.style.setProperty("--chat-footer-clear", `${clearance}px`);
      fab.style.visibility = clearance >= window.innerHeight ? "hidden" : "";
    };
    const schedule = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Chiều cao trang đổi (ảnh, tin tức tải xong) làm footer dịch chỗ dù người dùng không cuộn.
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, [rootRef, fabRef, isOpen, pathname]);
}

/** Trên điện thoại, panel gần toàn màn hình nên khoá cuộn trang phía sau khi panel đang mở. */
export function useMobileScrollLock(isOpen: boolean): void {
  useEffect(() => {
    if (!isOpen || !window.matchMedia(MOBILE_QUERY).matches) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);
}

/**
 * Cho panel trên điện thoại bám theo vùng nhìn thấy thật (visualViewport) để bàn phím ảo không che ô nhập.
 * Đặt biến CSS --chat-vv-height và --chat-vv-top; từ 640px trở lên panel không dùng các biến này.
 */
export function useVisualViewportBounds(rootRef: RefObject<HTMLDivElement | null>, isOpen: boolean): void {
  useEffect(() => {
    const root = rootRef.current;
    const viewport = window.visualViewport;
    if (!isOpen || !root || !viewport) return;

    const apply = () => {
      root.style.setProperty("--chat-vv-height", `${Math.round(viewport.height - MOBILE_PANEL_MARGIN_TOTAL_PX)}px`);
      root.style.setProperty("--chat-vv-top", `${Math.round(viewport.offsetTop)}px`);
    };

    apply();
    viewport.addEventListener("resize", apply);
    viewport.addEventListener("scroll", apply);
    return () => {
      viewport.removeEventListener("resize", apply);
      viewport.removeEventListener("scroll", apply);
      root.style.removeProperty("--chat-vv-height");
      root.style.removeProperty("--chat-vv-top");
    };
  }, [rootRef, isOpen]);
}
