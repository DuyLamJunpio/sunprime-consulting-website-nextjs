"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type FeedbackItem = {
  text: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
};

type NavProps = {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileServicesOpen: boolean;
  setIsMobileServicesOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileHeaderHidden: boolean;
  isMobileHeaderElevated: boolean;
  openMegaMenu: () => void;
  closeMegaMenu: () => void;
  isMegaMenuOpen: boolean;
  isFeedbackVisible: boolean;
  activeFeedback: FeedbackItem;
  renderStars: (count: number) => React.ReactNode;
  progressRef: React.RefObject<HTMLDivElement | null>;
};

export default function SiteNav({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  isMobileServicesOpen,
  setIsMobileServicesOpen,
  isMobileHeaderHidden,
  isMobileHeaderElevated,
  openMegaMenu,
  closeMegaMenu,
  isMegaMenuOpen,
  isFeedbackVisible,
  activeFeedback,
  renderStars,
  progressRef,
}: NavProps) {
  const pathname = usePathname();
  const getLinkClass = (href: string, size: 'lg' | 'xl') => {
    const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
    if (size === 'xl') {
      return `block text-2xl font-medium font-geist ${isActive ? 'text-neutral-900' : 'text-neutral-500'}`;
    }
    return `block text-lg font-medium font-geist transition-all hover:translate-x-1 ${isActive ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'}`;
  };

  return (
    <>
      <div
        id="mega-menu"
        onMouseEnter={openMegaMenu}
        onMouseLeave={closeMegaMenu}
        className={`fixed top-0 bottom-0 right-0 left-72 z-9999 bg-neutral-50/95 backdrop-blur-sm border-l border-neutral-100 shadow-2xl transition-opacity duration-200 ${isMegaMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <>
          <div className="absolute inset-0 bg-neutral-50/95 backdrop-blur-sm ml-72 border-l border-neutral-100 shadow-2xl" />
          <div className="relative w-full h-full flex flex-col justify-center px-20">
            <div className="max-w-5xl w-full">
              <div className="border-b border-neutral-200 pb-8 mb-8">
                <h2 className="text-4xl font-medium text-neutral-900 font-geist tracking-tight">
                  Dịch vụ cũng cấp
                </h2>
                <p className="text-neutral-500 mt-2 text-lg">
                  Giải pháp toàn diện giúp doanh nghiệp tăng trưởng.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-12">
                <div className="space-y-6">
                  <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest font-geist">
                    Quản lý và thành lập doanh nghiệp
                  </h3>
                  <ul className="space-y-4">
                    <li>
                      <a
                        href="#"
                        className="block text-xl text-neutral-800 hover:text-neutral-900 transition-colors"
                      >
                        Tư vấn thành lập hộ kinh doanh / doanh nghiệp
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block text-xl text-neutral-800 hover:text-neutral-900 transition-colors"
                      >
                        Soạn thảo hồ sơ pháp lý đầy đủ
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block text-xl text-neutral-800 hover:text-neutral-900 transition-colors"
                      >
                        Tư vấn mô hình vận hành & quản trị ban đầu
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block text-xl text-neutral-800 hover:text-neutral-900 transition-colors"
                      >
                        Đăng ký thuế, hóa đơn điện tử, tài khoản ngân hàng
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest font-geist">
                    Dịch vụ Kế toán
                  </h3>
                  <ul className="space-y-4">
                    <li>
                      <a
                        href="#"
                        className="block text-xl text-neutral-800 hover:text-neutral-900 transition-colors"
                      >
                        Kế toán trọn gói cho hộ kinh doanh & doanh nghiệp
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block text-xl text-neutral-800 hover:text-neutral-900 transition-colors"
                      >
                        Kê khai và quyết toán thuế GTGT, TNCN, TNDN
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block text-xl text-neutral-800 hover:text-neutral-900 transition-colors"
                      >
                        Lập sổ sách kế toán theo đúng chuẩn mực
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block text-xl text-neutral-800 hover:text-neutral-900 transition-colors"
                      >
                        Báo cáo tài chính tháng / quý / năm
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block text-xl text-neutral-800 hover:text-neutral-900 transition-colors"
                      >
                        Đại diện làm việc với cơ quan thuế
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block text-xl text-neutral-800 hover:text-neutral-900 transition-colors"
                      >
                        Rà soát – xử lý rủi ro kế toán & thuế
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>

      <div
        id="mobile-header"
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-[#FFFCF0]/95 backdrop-blur-sm transition-transform duration-300 lg:hidden flex items-center justify-between ${isMobileHeaderHidden ? '-translate-y-full' : 'translate-y-0'} ${isMobileHeaderElevated ? 'shadow-sm' : ''}`}
      >
        <button onClick={() => setIsMobileMenuOpen(true)} className="flex items-center gap-2 text-neutral-900 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="font-medium text-lg">Menu</span>
        </button>
        <a href="#home" className="text-xl sm:text-2xl tracking-tighter font-medium text-right">
          SUNPRIME
          <span className="text-neutral-400 group-hover:text-neutral-900 transition-colors">
            <span className="hidden sm:inline">{' '}CONSULTING</span>
          </span>
        </a>
      </div>
      <div
        id="mobile-menu-wrapper"
        className={`relative z-[999] ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div
          className={`fixed inset-0 bg-neutral-900/40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
              <div className={`pointer-events-auto w-screen max-w-xs transform transition-transform duration-300 ease-in-out bg-[#FFFCF0] shadow-xl p-6 h-full flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="mb-12 animate-clip-in" style={{ animationDelay: '0.1s' }}>
                    <a href="#home" className="flex items-start gap-3 group font-geist">
                      <span className="block text-3xl tracking-tighter font-medium">
                        SUNPRIME
                        <span className="block text-neutral-400 group-hover:text-neutral-900 transition-colors">
                          CONSULTING
                        </span>
                      </span>
                    </a>
                  </div>
                  <button
                    id="close-menu-btn"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-neutral-500 hover:text-neutral-900 focus:outline-none"
                  >
                    <span className="sr-only">Close menu</span>
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 space-y-6 overflow-y-auto">
                  <Link href="/" className={getLinkClass('/', 'xl')}>
                    Home
                  </Link>
                  <Link href="/stories" className={getLinkClass('/stories', 'xl')}>
                    Stories
                  </Link>
                  <div className="group">
                    <div className="flex items-center justify-between">
                      <Link href="/services" className={getLinkClass('/services', 'xl')}>
                        Services
                      </Link>
                      <button
                        id="mobile-services-toggle"
                        className="p-2 text-neutral-500"
                        onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                        type="button"
                      >
                        <svg
                          id="mobile-services-icon"
                          className={`w-6 h-6 transform transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>
                    <div
                      id="mobile-services-menu"
                      className={`${isMobileServicesOpen ? 'block' : 'hidden'} pl-4 mt-3 space-y-3 border-l-2 border-neutral-200 ml-1`}
                    >
                      <a href="/services/design" className="block text-lg text-neutral-400">
                        Product Design
                      </a>
                      <a href="/services/web" className="block text-lg text-neutral-400">
                        Web Development
                      </a>
                    </div>
                  </div>
                  <Link href="/pricing" className={getLinkClass('/pricing', 'xl')}>
                    Blog
                  </Link>
                  <Link href="/contact" className={getLinkClass('/contact', 'xl')}>
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <aside className="lg:w-64 lg:fixed lg:h-screen hidden lg:flex lg:flex-col z-50 glass-panel bg-neutral-100 lg:backdrop-blur-none lg:border-none lg:border-r w-full border-neutral-200/50 border-b pt-8 pr-8 pb-0 lg:pb-5 pl-8 justify-between">
        <div>
          <div className="mb-12 animate-clip-in" style={{ animationDelay: '0.1s' }}>
            <a href="#home" className="flex flex-col items-center group font-geist">
              <Image
                src="/Thiết kế chưa có tên (1).png"
                alt="Sunprime Logo"
                width={48}
                height={48}
                className="w-12 h-12 object-contain mb-3"
              />
              <span className="block text-3xl tracking-tighter font-medium text-center">
                SUNPRIME
                <span className="block text-neutral-400 group-hover:text-neutral-900 transition-colors">
                  CONSULTING
                </span>
              </span>
            </a>
          </div>
          <nav className="space-y-4 pb-8 animate-clip-in" style={{ animationDelay: '0.2s' }}>
            <Link href="/" className={getLinkClass('/', 'lg')}>
              Home
            </Link>
            <Link href="/stories" className={getLinkClass('/stories', 'lg')}>
              Stories
            </Link>
            <Link
              href="/services"
              id="services-trigger"
              className={getLinkClass('/services', 'lg')}
              onMouseEnter={openMegaMenu}
              onMouseLeave={closeMegaMenu}
            >
              Services
            </Link>
            <Link href="/pricing" className={getLinkClass('/pricing', 'lg')}>
              Blog
            </Link>
            <Link href="/contact" className={getLinkClass('/contact', 'lg')}>
              Contact
            </Link>
          </nav>
        </div>

        <a href="#feedback" className="w-full max-w-[320px] flex flex-col gap-4">
          <div className="relative w-full bg-white rounded-2xl border border-neutral-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] overflow-hidden group hover:border-neutral-300 transition-colors duration-300">
            <div className="flex items-center justify-between px-5 pt-5 pb-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-white border border-neutral-200 text-neutral-500">
                  <iconify-icon icon="solar:chat-round-line-linear" width={14} />
                </div>
                <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Feedback
                </span>
              </div>
              <div className="flex items-center gap-1.5 pl-2 pr-2.5 py-1 rounded-full bg-white border border-neutral-200">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-neutral-600 tracking-tight">42</span>
              </div>
            </div>
            <div className="px-5 py-2 min-h-[140px] flex flex-col justify-between relative">
              <div className="absolute top-2 left-5 opacity-10 text-neutral-400 pointer-events-none">
                <iconify-icon icon="solar:quote-up-linear" width={32} />
              </div>
              <div className={`relative z-10 mt-2 ${isFeedbackVisible ? 'fade-enter-active' : 'fade-exit-active'}`}>
                <p className="text-sm leading-relaxed text-neutral-800 font-normal line-clamp-4">
                  &ldquo;{activeFeedback.text}&rdquo;
                </p>
              </div>
              <div className="flex gap-0.5 mt-3 text-amber-400">
                {renderStars(activeFeedback.rating)}
              </div>
            </div>
            <div className="mt-2 bg-white/70 border-t border-neutral-200 px-5 py-3 flex flex-col gap-3">
              <div className="flex items-center gap-3 w-full">
                <div className="relative">
                  <Image
                    id="user-avatar"
                    src={activeFeedback.avatar}
                    alt={activeFeedback.name}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full border border-neutral-200 bg-neutral-50 object-cover"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border border-emerald-500 flex items-center justify-center">
                    <iconify-icon icon="solar:verified-check-bold" className="text-white text-[10px]" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-neutral-900 tracking-tight">
                    {activeFeedback.name}
                  </span>
                  <span className="text-xs text-neutral-500 font-normal">
                    {activeFeedback.role}
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-neutral-200">
              <div
                ref={progressRef}
                id="progress-bar"
                className="h-full bg-neutral-900 w-0 transition-all duration-5000 ease-linear"
              />
            </div>
          </div>
        </a>
      </aside>
    </>
  );
}
