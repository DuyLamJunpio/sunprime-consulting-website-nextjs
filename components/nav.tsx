"use client";

import { serviceCategories } from "@/data/services";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Nav() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isOverHero, setIsOverHero] = useState(false);
  const mainNavLinkClass = isOverHero
    ? "relative inline-flex pb-1 text-white transition-all duration-300 hover:-translate-y-0.5 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100"
    : "relative inline-flex pb-1 text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:text-brand after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:after:scale-x-100";
  const mobileNavLinkClass =
    "py-2 text-lg font-medium text-text-secondary transition-all duration-200 hover:translate-x-1 hover:text-brand";
  const sunprimePortalUrl = "https://portal.sunprime.vn";
  const desktopServiceNav = ["ke-toan", "thanh-lap", "nhan-su"]
    .map((categoryId) => serviceCategories.find((category) => category.id === categoryId))
    .filter((category): category is NonNullable<typeof category> => Boolean(category));

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
  const logoContainerClass = isOverHero
    ? "text-[#4F46E5] transition-transform duration-300 group-hover:scale-110"
    : "text-[#4F46E5] transition-transform duration-300 group-hover:scale-110";
  const logoImageClass = isOverHero
    ? "h-9 w-9 object-contain brightness-125 contrast-125 saturate-125"
    : "h-9 w-9 object-contain";

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${navThemeClass} translate-y-0`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="flex h-20 items-center justify-between">
          {/* Left: Logo & Search */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5">
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
              <Link href="/" className={mainNavLinkClass}>
                Trang chủ
              </Link>
              <Link href="/gioi-thieu" className={mainNavLinkClass}>
                Giới thiệu
              </Link>
              <Link href="/services" className={mainNavLinkClass}>
                Dịch vụ
              </Link>
              <Link href="#" className={mainNavLinkClass}>
                Tin tức
              </Link>
            </div>

            <button
              type="button"
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
              <span>EN</span>
            </button>

            <Link
              href="#"
              className={ctaButtonClass}
            >
              Nhận tư vấn miễn phí
            </Link>

            {/* <Link
              href={sunprimePortalUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2.5 font-medium text-emerald-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-100 hover:text-emerald-800"
            >
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.2)]" />
              SunPrime Portal
            </Link> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle mobile menu"
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
              data-lucide="menu"
              className="lucide lucide-menu h-6 w-6"
            >
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`absolute left-0 top-full w-full border-b border-slate-200 bg-surface-base px-4 py-4 shadow-xl lg:hidden ${isMobileMenuOpen ? "flex flex-col gap-4" : "hidden"
          }`}
      >
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-lg border border-slate-200 bg-surface-section py-3 pl-4 pr-4 text-base focus:ring-2 focus:ring-brand"
        />
        <Link href="#" className={`${mobileNavLinkClass} border-b border-slate-100`}>
          Get legal help
        </Link>
        <Link href="#" className="border-b border-slate-100 py-2 text-lg font-medium text-brand transition-all duration-200 hover:translate-x-1">
          Search for lawyers
        </Link>
        <Link href="/gioi-thieu" className={mobileNavLinkClass}>
          Giới thiệu
        </Link>
        <Link href="#" className={mobileNavLinkClass}>
          Write a review
        </Link>
        <Link href="#" className={mobileNavLinkClass}>
          For lawyers
        </Link>
        <Link
          href={sunprimePortalUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2.5 font-medium text-emerald-700 transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-100 hover:text-emerald-800"
        >
          SunPrime Portal
        </Link>
      </div>
    </nav>
  );
}