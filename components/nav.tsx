"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/components/i18n-provider";

export default function Nav() {
  const { lang, toggleLanguage } = useI18n();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOverHero, setIsOverHero] = useState(false);
  const mainNavLinkClass = isOverHero
    ? "relative inline-flex pb-1 text-white transition-all duration-300 hover:-translate-y-0.5 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100"
    : "relative inline-flex pb-1 text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:text-brand after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:after:scale-x-100";
  const mobileNavLinkClass =
    "py-2 text-lg font-medium text-text-secondary transition-all duration-200 hover:translate-x-1 hover:text-brand";
  const navText = lang === "vi"
    ? {
      home: "Trang chủ",
      about: "Giới thiệu",
      services: "Dịch vụ",
      news: "Tin tức",
      consult: "Nhận tư vấn miễn phí",
      portal: "Cổng B2B",
      setupBusiness: "Thành lập doanh nghiệp",
      hr: "Nhân sự",
    }
    : {
      home: "Home",
      about: "About",
      services: "Services",
      news: "News",
      consult: "Get Free Consultation",
      portal: "B2B Portal",
      setupBusiness: "Business Setup",
      hr: "Human Resources",
    };

  useEffect(() => {
    const heroElement = document.getElementById("hero-section");

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (pathname === "/" && heroElement) {
        const heroBottom = heroElement.offsetTop + heroElement.offsetHeight;
        const navHeight = 80;
        setIsOverHero(currentScrollY + navHeight < heroBottom);
      } else {
        setIsOverHero(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Đóng menu mobile khi chuyển trang
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Khóa scroll nền + đóng bằng phím Escape khi menu mobile mở
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const navThemeClass = isOverHero
    ? "border-transparent bg-transparent backdrop-blur-0"
    : "border-slate-100 bg-surface-base/95 backdrop-blur-sm";
  const logoTextClass = isOverHero
    ? "text-white transition-colors duration-300"
    : "text-brand transition-colors duration-300 group-hover:text-brand-strong";
  const desktopTextToneClass = isOverHero ? "text-white" : "text-text-secondary";
  const languageButtonClass = isOverHero
    ? "flex items-center gap-2 text-base font-normal text-white transition-colors hover:text-white"
    : "flex items-center gap-2 text-base font-normal text-text-secondary transition-colors hover:text-text-primary";
  const ctaButtonClass = isOverHero
    ? "transform rounded-lg border border-white/45 bg-transparent px-5 py-2.5 font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:text-white active:translate-y-0"
    : "transform rounded-lg bg-brand-soft px-5 py-2.5 font-medium text-brand transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-soft-hover active:translate-y-0";
  const mobileMenuButtonClass = isOverHero
    ? "p-2 text-white hover:text-white lg:hidden"
    : "p-2 text-text-secondary hover:text-text-primary lg:hidden";

  // Bấm vào link trỏ đúng trang đang đứng (không có hash) → cuộn mượt lên đầu.
  // (Điều hướng sang trang khác đã tự về đầu trang theo mặc định của Next.)
  const handleSamePathClick = (href: string) => {
    if (!href.includes("#") && href === pathname) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${navThemeClass} translate-y-0`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="flex h-20 items-center justify-between">
          {/* Left: Logo & Search */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" onClick={() => handleSamePathClick("/")} className="group flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5">
              {/* <div className={logoContainerClass}>
                <Image
                  src="/logo.png"
                  alt="Sunprime Logo"
                  width={36}
                  height={36}
                  className={logoImageClass}
                />
              </div> */}
              <span className="text-xl font-semibold uppercase tracking-[0.18em]">
                <span className={logoTextClass}>
                  SunPrime
                </span>
              </span>
            </Link>
          </div>

          {/* Right: Links & Actions (Desktop) */}
          <div className="hidden items-center gap-8 lg:flex">
            <div className={`flex items-center gap-6 text-base font-normal ${desktopTextToneClass}`}>
              <Link href="/" onClick={() => handleSamePathClick("/")} className={mainNavLinkClass}>
                {navText.home}
              </Link>
              <Link href="/gioi-thieu" onClick={() => handleSamePathClick("/gioi-thieu")} className={mainNavLinkClass}>
                {navText.about}
              </Link>
              <Link href="/services" onClick={() => handleSamePathClick("/services")} className={mainNavLinkClass}>
                {navText.services}
              </Link>
              <Link href="/tin-tuc" onClick={() => handleSamePathClick("/tin-tuc")} className={mainNavLinkClass}>
                {navText.news}
              </Link>
            </div>

            <button
              type="button"
              onClick={toggleLanguage}
              className={languageButtonClass}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                data-lucide="globe"
                className="lucide lucide-globe h-4 w-4"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              <span>{lang === "vi" ? "EN" : "VI"}</span>
            </button>

            <Link
              href="#"
              className={ctaButtonClass}
            >
              {navText.consult}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className={mobileMenuButtonClass}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              {isMobileMenuOpen ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </>
              ) : (
                <>
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay (animated) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Đóng menu"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 top-20 z-40 cursor-default bg-text-primary/30 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 top-full z-50 flex w-full flex-col gap-1 border-b border-border bg-surface-base px-4 py-4 shadow-soft-xl lg:hidden"
            >
              {[
                { href: "/", label: navText.home },
                { href: "/gioi-thieu", label: navText.about },
                { href: "/services", label: navText.services },
                { href: "/services#ke-toan", label: lang === "vi" ? "Kế toán" : "Accounting" },
                { href: "/services#thanh-lap", label: navText.setupBusiness },
                { href: "/services#nhan-su", label: navText.hr },
                { href: "/tin-tuc", label: navText.news },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${mobileNavLinkClass} rounded-lg px-3 hover:bg-surface-section`}
                  onClick={() => {
                    handleSamePathClick(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-3 flex flex-col gap-3 border-t border-border-soft pt-4">
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-section px-4 py-3 font-medium text-text-secondary transition-all duration-200 hover:text-text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                  <span>{lang === "vi" ? "EN / VI" : "VI / EN"}</span>
                </button>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-xl bg-brand px-4 py-3 font-semibold text-white shadow-soft transition-all duration-200 hover:bg-brand-strong"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {navText.consult}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}