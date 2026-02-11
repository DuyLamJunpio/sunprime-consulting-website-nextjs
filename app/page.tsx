'use client';

import ContactFloatingButtons from '@/components/contact';
import SiteFooter from '@/components/footer';
import SiteNav from '@/components/nav';
import { partners } from '@/data/partners';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import React, { useEffect, useRef, useState } from 'react';

const feedbacks = [
  {
    text: 'The API documentation is simply world-class. It made integration into our existing stack seamless and saved us weeks of development time.',
    name: 'Sarah Jenkins',
    role: 'CTO, Vercel',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    rating: 5,
  },
  {
    text: 'I was skeptical at first, but the performance gains are undeniable. Our dashboard load times dropped by 40% instantly.',
    name: 'Marcus Chen',
    role: 'Senior Dev, Linear',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    rating: 5,
  },
  {
    text: 'Customer support actually responds with helpful code snippets, not just links to FAQs. A breath of fresh air in this industry.',
    name: 'Elena Rodriguez',
    role: 'Product Manager, Raycast',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    rating: 4,
  },
  {
    text: 'The design consistency across the platform is beautiful. It feels like a tool built by people who truly care about craftsmanship.',
    name: 'David Park',
    role: 'Designer, Figma',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    rating: 5,
  },
] as const;

const faqItems = [
  {
    question: 'Doanh nghiệp nhỏ có cần làm kế toán bài bản không?',
    answer: 'Cần, để tránh rủi ro và kiểm soát chi phí ngay từ đầu.',
  },
  {
    question: 'SunPrime Consulting có phù hợp với nhà hàng nhỏ không?',
    answer: 'Phù hợp, vì giải pháp được thiết kế theo quy mô thực tế.',
  },
] as const;

const testimonialScrollDistance = 540;

export default function Home() {
  // --- LOGIC STATES ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileHeaderHidden, setIsMobileHeaderHidden] = useState(false);
  const [isMobileHeaderElevated, setIsMobileHeaderElevated] = useState(false);

  const [feedbackIndex, setFeedbackIndex] = useState(0);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(true);

  // Carousel Logic
  const [carouselIndex, setCarouselIndex] = useState(0);
  const router = useRouter();
  const totalCards = partners.length;

  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const feedbackIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const testimonialRailRef = useRef<HTMLDivElement | null>(null);
  const lastScrollTopRef = useRef(0);
  const megaMenuTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isTestimonialPrevDisabled, setIsTestimonialPrevDisabled] = useState(true);
  const [isTestimonialNextDisabled, setIsTestimonialNextDisabled] = useState(false);

  // Xử lý Toast hiện lên sau 3s
  useEffect(() => {
    const timer = setTimeout(() => setIsToastOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const resetProgressBar = () => {
    if (!progressRef.current) return;
    const bar = progressRef.current;
    bar.style.transition = 'none';
    bar.style.width = '0%';
    void bar.offsetWidth;
    bar.style.transition = 'width 5000ms linear';
    bar.style.width = '100%';
  };

  const openMegaMenu = () => {
    if (megaMenuTimerRef.current) {
      clearTimeout(megaMenuTimerRef.current);
    }
    setIsMegaMenuOpen(true);
  };

  const closeMegaMenu = () => {
    if (megaMenuTimerRef.current) {
      clearTimeout(megaMenuTimerRef.current);
    }
    megaMenuTimerRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 50);
  };

  useEffect(() => {
    resetProgressBar();
  }, [feedbackIndex]);

  useEffect(() => {
    feedbackIntervalRef.current = setInterval(() => {
      setIsFeedbackVisible(false);
      feedbackTimeoutRef.current = setTimeout(() => {
        setFeedbackIndex((prev) => (prev + 1) % feedbacks.length);
        setIsFeedbackVisible(true);
      }, 200);
    }, 5000);

    return () => {
      if (feedbackIntervalRef.current) clearInterval(feedbackIntervalRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const rail = testimonialRailRef.current;
    if (!rail) return;

    const updateButtonStates = () => {
      const scrollLeft = rail.scrollLeft;
      const maxScroll = rail.scrollWidth - rail.clientWidth;
      setIsTestimonialPrevDisabled(scrollLeft <= 10);
      setIsTestimonialNextDisabled(scrollLeft >= maxScroll - 10);
    };

    updateButtonStates();
    rail.addEventListener('scroll', updateButtonStates);
    window.addEventListener('resize', updateButtonStates);

    return () => {
      rail.removeEventListener('scroll', updateButtonStates);
      window.removeEventListener('resize', updateButtonStates);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop <= 0) {
        setIsMobileHeaderHidden(false);
        setIsMobileHeaderElevated(false);
        lastScrollTopRef.current = scrollTop;
        return;
      }

      if (scrollTop > lastScrollTopRef.current && scrollTop > 50) {
        setIsMobileHeaderHidden(true);
        setIsMobileHeaderElevated(false);
      } else {
        setIsMobileHeaderHidden(false);
        setIsMobileHeaderElevated(true);
      }

      lastScrollTopRef.current = scrollTop;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Xử lý Spotlight (chuột di chuyển)
  const handleSpotlight = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  // Xử lý xoay Carousel
  const rotateCarousel = (direction: number) => {
    if (direction === 1) {
      setCarouselIndex((prev) => (prev + 1) % totalCards);
    } else {
      setCarouselIndex((prev) => (prev - 1 + totalCards) % totalCards);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      rotateCarousel(1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Class helper cho Carousel
  const getCardClass = (index: number) => {
    const activeIndex = carouselIndex;
    const nextIndex = (carouselIndex + 1) % totalCards;
    const prevIndex = (carouselIndex - 1 + totalCards) % totalCards;

    if (index === activeIndex) return 'carousel-card active';
    if (index === nextIndex) return 'carousel-card next';
    if (index === prevIndex) return 'carousel-card prev';
    return 'carousel-card';
  };

  const renderStars = (count: number) =>
    Array.from({ length: 5 }, (_, index) => {
      const isFilled = index < count;
      return (
        <iconify-icon
          key={`star-${index}`}
          icon={isFilled ? 'solar:star-bold' : 'solar:star-linear'}
          width={14}
          className={isFilled ? '' : 'text-neutral-300'}
        />
      );
    });

  const scrollTestimonials = (direction: number) => {
    const rail = testimonialRailRef.current;
    if (!rail) return;
    rail.scrollBy({
      left: direction * testimonialScrollDistance,
      behavior: 'smooth',
    });
  };

  const activeFeedback = feedbacks[feedbackIndex];

  return (
    <div className="min-h-screen overflow-x-hidden selection:bg-neutral-200 selection:neutral-900 text-neutral-900 bg-neutral-100 relative font-sans">

      {/* --- 1. MOBILE TOAST --- */}
      {/* Copy div id="mobile-toast" từ dòng 159 -> 206 */}
      {/* Thay đổi: class translate-y thêm logic state */}
      <div
        id="mobile-toast"
        className={`fixed bottom-4 left-4 right-4 z-60 lg:hidden transform transition-transform duration-500 ease-out ${isToastOpen ? 'translate-y-0' : 'translate-y-[150%]'}`}
      >
        {/* Paste nội dung bên trong div mobile-toast cũ vào đây. 
              Sửa nút close onclick="closeToast()" thành onClick={() => setIsToastOpen(false)} 
          */}

        <div className="bg-neutral-50 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-neutral-100 p-4 relative">
          <button
            onClick={() => setIsToastOpen(false)}
            className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-900 p-1"
          >
            <iconify-icon icon="solar:close-circle-bold" width={20} />
          </button>
          <div className="flex gap-3 items-start pr-6">
            <div className="relative shrink-0">
              <Image
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="User"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full border border-neutral-200 bg-neutral-50 object-cover"
              />
              <div className="absolute -bottom-1 -right-1 bg-neutral-50 rounded-full p-0.5">
                <iconify-icon
                  icon="solar:verified-check-bold"
                  className="text-neutral-500 text-xs"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-neutral-900">
                  Felix Henderson
                </span>
                <div className="flex text-neutral-400 text-[10px]">
                  <iconify-icon icon="solar:star-bold" />
                  <iconify-icon icon="solar:star-bold" />
                  <iconify-icon icon="solar:star-bold" />
                  <iconify-icon icon="solar:star-bold" />
                  <iconify-icon icon="solar:star-bold" />
                </div>
              </div>
              <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                &ldquo;The API documentation is simply world-class. It made integration
                incredibly fast.&rdquo;
              </p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-neutral-100 flex justify-end">
            <a
              href="#feedback"
              className="text-xs font-medium text-neutral-700 hover:text-neutral-900 flex items-center gap-1"
            >
              Xem thêm đánh giá
              <iconify-icon icon="solar:arrow-right-linear" />
            </a>
          </div>
        </div>


      </div>


      <SiteNav
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isMobileServicesOpen={isMobileServicesOpen}
        setIsMobileServicesOpen={setIsMobileServicesOpen}
        isMobileHeaderHidden={isMobileHeaderHidden}
        isMobileHeaderElevated={isMobileHeaderElevated}
        openMegaMenu={openMegaMenu}
        closeMegaMenu={closeMegaMenu}
        isMegaMenuOpen={isMegaMenuOpen}
        isFeedbackVisible={isFeedbackVisible}
        activeFeedback={activeFeedback}
        renderStars={renderStars}
        progressRef={progressRef}
      />

      {/* Background Grid Lines */}
      <div className="fixed grid-lines w-full h-full top-0 right-0 bottom-0 left-0"></div>


      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen max-w-[1600px] mx-auto">

        {/* --- 5. MAIN CONTENT --- */}
        <main
          onMouseEnter={closeMegaMenu}
          className="flex-1 lg:ml-64 lg:p-16 flex flex-col gap-20 lg:gap-12 overflow-hidden pt-24 lg:pt-6 pr-6 pb-6 pl-6 gap-x-20 gap-y-20"
        >
          <Script
            id="faq-schema"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqItems.map((item) => ({
                  "@type": "Question",
                  name: item.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answer,
                  },
                })),
              }),
            }}
          />

          {/* --- HERO SECTION --- */}
          {/* Copy <section id="home"> từ dòng 520 -> 687 */}
          <section id="home" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 -mt-5 lg:-mt-0 items-start">
            <div className="lg:col-span-7 space-y-8 animate-clip-in lg:-mt-10" style={{ animationDelay: "0.4s" }}>
              <a
                href="#home"
                className="group inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100/80 transition-all duration-300 hover:border-neutral-300"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>

                <span className="text-xs font-medium font-geist text-neutral-600 uppercase tracking-wide">
                  SunPrime Portal v1.0 đã được phát hành
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              <h1 className="leading-[0.95] lg:text-7xl xl:text-7xl text-5xl font-medium text-neutral-900 tracking-tight font-geist">
                Kế toán – Pháp lý doanh nghiệp: Chuẩn ngay từ đầu
              </h1>

              <p className="leading-snug text-lg font-normal text-neutral-500 font-geist">
                SunPrime Consulting là đơn vị tư vấn doanh nghiệp chuyên về thành lập, pháp lý, kế toán và vận hành.
                Chúng tôi đồng hành cùng doanh nghiệp xây dựng nền tảng chuẩn luật – rõ số – vững hệ thống, đặc biệt trong lĩnh vực nhà hàng – khách sạn.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-6 pb-4">
                <a
                  href="#feedback"
                  className="glass-button all-unset cursor-pointer outline-none focus:outline-none z-30 pointer-events-auto text-base rounded-full relative group"
                >
                  <span className="button-text relative block select-none font-medium text-base text-neutral-800 tracking-tight px-8 py-4 font-geist text-lg">
                    Liên hệ chúng tôi
                  </span>
                  <div className="button-shine"></div>
                </a>
              </div>

              <section className="animate-fade-up w-full space-y-4 border-t border-neutral-200 pt-6" style={{ animationDelay: "0.6s" }}>
                <p className="text-sm text-neutral-400 font-geist">
                  Được tin tưởng bởi các khách hàng
                </p>

                <div className="overflow-hidden mask-image-gradient w-full relative gap-x-4 gap-y-4">
                  <div className="z-10 bg-gradient-to-r from-white to-transparent w-20 h-full absolute top-0 left-0" />
                  <div className="bg-gradient-to-l from-white to-transparent w-20 h-full z-10 absolute top-0 right-0" />

                  <div className="flex w-max animate-marquee hover:pause-animation">
                    <div className="flex pr-4 pl-4 items-center gap-x-8">
                      <iconify-icon
                        icon="simple-icons:vercel"
                        className="text-3xl text-neutral-300 hover:text-neutral-900 transition-colors duration-300"
                      />
                      <iconify-icon
                        icon="simple-icons:stripe"
                        className="text-3xl text-neutral-300 hover:text-neutral-900 transition-colors duration-300"
                      />
                      <iconify-icon
                        icon="simple-icons:notion"
                        className="text-3xl text-neutral-300 hover:text-neutral-900 transition-colors duration-300"
                      />
                      <iconify-icon
                        icon="simple-icons:airbnb"
                        className="text-3xl text-neutral-300 hover:text-neutral-900 transition-colors duration-300"
                      />
                      <iconify-icon
                        icon="simple-icons:google"
                        className="text-3xl text-neutral-300 hover:text-neutral-900 transition-colors duration-300"
                      />
                      <iconify-icon
                        icon="simple-icons:logitech"
                        className="text-3xl text-neutral-300 hover:text-neutral-900 transition-colors duration-300"
                      />
                    </div>

                    <div className="flex items-center gap-x-8 px-4">
                      <iconify-icon
                        icon="simple-icons:vercel"
                        className="text-3xl text-neutral-300 hover:text-neutral-900 transition-colors duration-300"
                      />
                      <iconify-icon
                        icon="simple-icons:stripe"
                        className="text-3xl text-neutral-300 hover:text-neutral-900 transition-colors duration-300"
                      />
                      <iconify-icon
                        icon="simple-icons:notion"
                        className="text-3xl text-neutral-300 hover:text-neutral-900 transition-colors duration-300"
                      />
                      <iconify-icon
                        icon="simple-icons:airbnb"
                        className="text-3xl text-neutral-300 hover:text-neutral-900 transition-colors duration-300"
                      />
                      <iconify-icon
                        icon="simple-icons:google"
                        className="text-3xl text-neutral-300 hover:text-neutral-900 transition-colors duration-300"
                      />
                      <iconify-icon
                        icon="simple-icons:logitech"
                        className="text-3xl text-neutral-300 hover:text-neutral-900 transition-colors duration-300"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="lg:col-span-5 h-full animate-clip-in" style={{ animationDelay: "0.5s" }}>
              <div className="bg-neutral-50 border border-neutral-200 p-3 rounded-[2.5rem] relative">
                <div className="grid grid-cols-2 grid-rows-3 gap-3 h-[600px] w-full rounded-2xl overflow-hidden">
                  <div className="col-span-1 row-span-3 relative group overflow-hidden bg-neutral-100 rounded-2xl">
                    <div className="absolute top-4 left-4 z-20">
                      <div className="bg-white/90 backdrop-blur-md w-10 h-10 flex items-center justify-center rounded-xl shadow-sm">
                        <iconify-icon icon="solar:graph-up-bold" className="text-blue-600 text-2xl" />
                      </div>
                    </div>
                    <Image
                      src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop"
                      width={987}
                      height={987}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      alt="Marketing Strategy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 z-20">
                      <h3 className="text-white font-medium text-xl leading-tight mb-1">
                        Tư vấn quản lý
                        <br />
                        Thành lập Doanh nghiệp
                      </h3>
                    </div>
                  </div>

                  <div className="col-span-1 row-span-2 relative group overflow-hidden bg-neutral-100 rounded-2xl">
                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-white/90 backdrop-blur-md w-10 h-10 flex items-center justify-center rounded-xl shadow-sm">
                        <iconify-icon icon="solar:calculator-minimalistic-bold" className="text-orange-500 text-2xl" />
                      </div>
                    </div>
                    <Image
                      src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop"
                      width={1035}
                      height={1035}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      alt="Accounting"
                    />
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent">
                      <span className="text-white text-xl font-medium">Dịch vụ Kế toán</span>
                    </div>
                  </div>

                  <div className="col-span-1 row-span-1 relative group overflow-hidden bg-white border border-neutral-100 rounded-2xl">
                    <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                      <div className="flex justify-between items-start">
                        <div className="bg-neutral-100 w-10 h-10 flex items-center justify-center rounded-xl">
                          <iconify-icon icon="solar:document-add-bold" className="text-neutral-900 text-2xl" />
                        </div>
                        <div className="bg-green-100 text-green-700 text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                          Chuyển sang by KOD
                        </div>
                      </div>
                      <div>
                        <h4 className="text-neutral-900 font-semibold text-lg">Marketing</h4>
                        <p className="text-neutral-500 text-sm mt-1">Tìm hiểu đội ngũ của chúng tôi</p>
                      </div>
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-neutral-300 rounded-full z-0 group-hover:scale-110 transition-transform duration-500"></div>
                  </div>
                </div>

                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-tr from-blue-100/50 to-purple-100/50 rounded-full blur-3xl opacity-60"></div>
              </div>
            </div>
          </section>

          {/* --- CAROUSEL 3D SECTION --- */}
          {/* Đây là phần khó nhất, đã được map logic React ở trên */}
          <section className="animate-fade-up w-full pt-12 pb-12 relative">
            <div className="flex mb-12 pr-2 pl-2 items-end justify-between">
              <h2 className="lg:text-5xl text-4xl font-medium text-neutral-900 tracking-tight">Khách hàng của chúng tôi</h2>
              <div className="flex gap-4">
                <button onClick={() => rotateCarousel(-1)} className="w-12 h-12 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-50 transition-colors">
                  {/* Icon Left */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    className="text-xl"
                    style={{}}
                    data-icon-set="solar"
                    data-solar="arrow-left-linear"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M20 12H4m0 0l6-6m-6 6l6 6"
                    />
                  </svg>

                </button>
                <button onClick={() => rotateCarousel(1)} className="w-12 h-12 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-50 transition-colors">
                  {/* Icon Right */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    className="text-xl"
                    style={{}}
                    data-icon-set="solar"
                    data-solar="arrow-right-linear"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M4 12h16m0 0l-6-6m6 6l-6 6"
                    />
                  </svg>

                </button>
              </div>
            </div>

            <div className="carousel-container flex w-full h-[500px] relative items-center justify-center overflow-hidden">
              {partners.map((company, index) => (
                <div
                  key={company.name}
                  className={`lg:w-3/4 glass-panel spotlight-card cursor-pointer w-full h-full rounded-3xl pt-2 pr-2 pb-2 pl-2 absolute transition-all duration-600 ${getCardClass(index)}`}
                  onMouseMove={handleSpotlight}
                  onClick={() => router.push(`/stories?partner=${company.id}`)}
                >
                  <div className="w-full h-full bg-neutral-50 rounded-2xl overflow-hidden relative group">
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
                      <span className="bg-neutral-50/80 backdrop-blur px-3 py-1 rounded-full text-xs font-medium border border-neutral-900/5 font-geist">
                        {company.industry}
                      </span>
                    </div>
                    <div className={`relative overflow-hidden flex bg-linear-to-br ${company.gradient} w-full h-full items-center justify-center`}>
                      <Image
                        src={company.image}
                        alt={`${company.name} cover`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                      <div className="absolute bottom-6 right-6 bg-neutral-100 text-neutral-900 text-xs font-medium px-3 py-1.5 rounded-full shadow-md opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                        View detail
                      </div>
                      <div className="absolute left-6 bottom-6 flex max-w-[520px] flex-col gap-3">
                        <div className="flex items-center gap-3 bg-neutral-100 text-neutral-900 px-3 py-2 rounded-xl w-fit shadow-md">
                          <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-neutral-200 bg-white">
                            <Image
                              src={company.logoImage}
                              alt={`${company.name} logo`}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg md:text-xl font-semibold tracking-tight font-geist">
                              {company.name}
                            </h3>
                            <p className="text-[11px] md:text-xs text-neutral-700 mt-0.5 font-geist">
                              {company.industry}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm md:text-base text-neutral-900 font-geist bg-neutral-100 px-3 py-2 rounded-xl max-w-[52ch] shadow-md">
                          {company.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-900 text-xs font-semibold shadow-md">
                            {company.industry}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-900 text-xs font-semibold shadow-md">
                            Khach hang
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* --- SECTION: ABOUT / VISION / VALUES --- */}
          <section className="animate-fade-up w-full pt-12 pb-12 px-4" style={{ animationDelay: '0.1s' }}>
            <div className="w-full max-w-7xl mx-auto">
              <div className="mb-12 md:mb-16">
                <div className="flex flex-col items-start gap-4 max-w-3xl">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white pl-2 pr-3 py-1 text-xs font-medium text-neutral-600 shadow-sm">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
                      <iconify-icon icon="solar:users-group-rounded-linear" width={14} />
                    </span>
                    Về Sun Prime Consulting
                  </span>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-neutral-900 tracking-tight leading-[1.1]">
                    Kiến tạo nền tảng vững chắc <br className="hidden sm:block" /> cho doanh nghiệp F&B
                  </h2>

                  <p className="text-base md:text-lg text-neutral-500 font-normal leading-relaxed max-w-2xl mt-2">
                    Chúng tôi cung cấp giải pháp toàn diện từ pháp lý, kế toán đến vận hành, giúp doanh nghiệp
                    tập trung vào tăng trưởng bền vững.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-fr">
                <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-neutral-300 lg:col-span-2 lg:flex-row lg:items-center gap-8">
                  <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-50/50 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10 flex flex-col justify-between h-full w-full">
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-100 bg-neutral-50 text-neutral-900 shadow-sm shrink-0">
                      <iconify-icon icon="solar:building-2-linear" width={24} />
                    </div>

                    <div>
                      <h3 className="text-xl font-medium text-neutral-900 mb-4 tracking-tight">Về chúng tôi</h3>
                      <p className="text-base leading-7 text-neutral-500 font-normal">
                        Sun Prime Consulting là đơn vị tư vấn doanh nghiệp chuyên về thành lập, pháp lý, kế
                        toán và vận hành. Chúng tôi đồng hành cùng doanh nghiệp xây dựng nền tảng{' '}
                        <span className="text-neutral-900 font-medium">chuẩn luật – rõ số – vững hệ thống</span>,
                        đặc biệt trong lĩnh vực nhà hàng – khách sạn.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-neutral-300 row-span-2">
                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-amber-50/50 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-100 bg-neutral-50 text-neutral-900 shadow-sm shrink-0">
                      <iconify-icon icon="solar:medal-star-linear" width={24} />
                    </div>

                    <h3 className="text-xl font-medium text-neutral-900 mb-6 tracking-tight">Giá trị cốt lõi</h3>

                    <ul className="space-y-4 flex-grow">
                      {[
                        "Thực chiến & hiệu quả thực tế",
                        "Tuân thủ pháp lý – chuẩn mực kế toán",
                        "Tư duy hệ thống & dài hạn",
                        "Minh bạch – chính trực",
                        "Đồng hành cùng doanh nghiệp",
                      ].map((value, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                            <iconify-icon icon="solar:check-read-linear" width={12} />
                          </span>
                          <span className="text-sm text-neutral-600 font-medium pt-0.5">{value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-neutral-300">
                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-indigo-50/50 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-50 border border-neutral-100 text-neutral-900 shrink-0">
                        <iconify-icon icon="solar:target-linear" width={20} />
                      </div>
                      <h3 className="text-lg font-medium text-neutral-900 tracking-tight">Tầm nhìn</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-neutral-500">
                      Trở thành đơn vị tư vấn vận hành doanh nghiệp thực chiến, đáng tin cậy hàng đầu cho ngành
                      nhà hàng – khách sạn.
                    </p>
                  </div>
                </div>

                <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-neutral-300">
                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-50/50 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-50 border border-neutral-100 text-neutral-900 shrink-0">
                        <iconify-icon icon="solar:flag-2-linear" width={20} />
                      </div>
                      <h3 className="text-lg font-medium text-neutral-900 tracking-tight">Sứ mệnh</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-neutral-500">
                      Giúp doanh nghiệp vận hành minh bạch, kiểm soát rủi ro và tăng trưởng bền vững thông qua
                      pháp lý, kế toán và hệ thống quản trị hiệu quả.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- SECTION: SERVICES & COMMITMENTS --- */}
          <section className="animate-fade-up w-full pt-12 pb-12 px-4" style={{ animationDelay: '0.1s' }}>
            <div className="bg-stone-50 border-stone-200 border rounded-3xl p-3 sm:p-4 shadow-2xl">
              <div className="flex flex-col gap-6">
                {[
                  {
                    title: "Dịch vụ Kế toán",
                    image:
                      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop",
                    accent: "from-emerald-500/15 via-transparent to-transparent",
                    icon: (
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-emerald-600">
                        <path
                          d="M7 8h10M7 12h10M7 16h6M4 4h16v16H4z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    ),
                    items: [
                      "Kế toán trọn gói cho hộ kinh doanh & doanh nghiệp",
                      "Kê khai và quyết toán thuế GTGT, TNCN, TNDN",
                      "Lập sổ sách kế toán theo đúng chuẩn mực",
                      "Báo cáo tài chính tháng / quý / năm",
                      "Đại diện làm việc với cơ quan thuế",
                      "Rà soát – xử lý rủi ro kế toán & thuế",
                    ],
                  },
                  {
                    title: "Tư vấn quản lý & Thành lập Doanh nghiệp",
                    image:
                      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1600&auto=format&fit=crop",
                    accent: "from-indigo-500/15 via-transparent to-transparent",
                    icon: (
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-indigo-600">
                        <path
                          d="M4 20h16M6 20V8l6-4 6 4v12M9 20v-6h6v6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ),
                    items: [
                      "Tư vấn thành lập hộ kinh doanh / doanh nghiệp",
                      "Soạn thảo hồ sơ pháp lý đầy đủ",
                      "Tư vấn mô hình vận hành & quản trị ban đầu",
                      "Đăng ký thuế, hóa đơn điện tử, tài khoản ngân hàng",
                    ],
                  },
                  {
                    title: "Cam kết & Chi phí",
                    image:
                      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
                    accent: "from-amber-500/15 via-transparent to-transparent",
                    icon: (
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-amber-600">
                        <path
                          d="M12 3l7 4v5c0 4.5-3.1 7.6-7 9-3.9-1.4-7-4.5-7-9V7l7-4z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.5 12.5l1.8 1.8 3.7-3.7"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    ),
                    items: [
                      "Đúng luật – đúng hạn – đúng số liệu",
                      "Bảo mật tuyệt đối thông tin doanh nghiệp",
                      "Chịu trách nhiệm hồ sơ kế toán do Sun Prime thực hiện",
                      "Đồng hành & hỗ trợ khi phát sinh kiểm tra thuế",
                      "Báo giá trọn gói – rõ ràng – không phát sinh",
                      "Tư vấn đúng nhu cầu, không bán dư dịch vụ",
                      "Minh bạch ngay từ đầu",
                    ],
                  },
                ].map((group, index) => (
                  <div
                    key={group.title}
                    className={`relative overflow-hidden rounded-3xl border border-neutral-200/70 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 ${index === 1 ? "md:translate-y-6" : index === 2 ? "md:-translate-y-4" : ""
                      }`}
                  >
                    <div className={`pointer-events-none absolute inset-0 bg-linear-to-br ${group.accent}`} />
                    <div className="grid md:grid-cols-12 gap-6 items-center relative">
                      <div className={`md:col-span-5 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                        <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm">
                          <Image
                            src={group.image}
                            alt={group.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-neutral-900/35 to-transparent" />
                          <div className="absolute left-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-800 shadow-sm">
                            {group.icon}
                            <span>Dịch vụ Sun Prime</span>
                          </div>
                        </div>
                      </div>
                      <div className={`md:col-span-7 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-100 border border-neutral-200">
                            {group.icon}
                          </span>
                          <h3 className="text-2xl md:text-3xl font-medium text-neutral-900 tracking-tight font-geist">
                            {group.title}
                          </h3>
                        </div>
                        <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-neutral-700 font-geist">
                          {group.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex gap-3">
                              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-neutral-100 border border-neutral-200 text-emerald-600">
                                <svg viewBox="0 0 20 20" aria-hidden="true" className="h-3.5 w-3.5">
                                  <path
                                    d="M5 10.5l3 3 7-7"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="animate-scaleIn animation-delay-300 sm:p-2 bg-white w-full max-w-none z-10 border-neutral-200 border rounded-3xl p-6 relative shadow-2xl overflow-hidden">
            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-200/40 blur-3xl" />
            <div className="flex animate-fadeInUp sm:p-6 p-6 gap-6 items-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl border border-neutral-200 bg-neutral-50">
                <iconify-icon icon="solar:route-bold-duotone" width={24} />
              </div>
              <div>
                <h2 className="text-[44px] leading-[0.9] sm:text-6xl lg:text-7xl xl:text-5xl text-neutral-900 tracking-tighter font-geist">
                  Cách thức làm việc
                </h2>
                <p className="sm:text-base text-sm text-neutral-700 tracking-tight font-geist mt-2">
                  Minh bạch, có quy trình, luôn đồng hành cùng doanh nghiệp.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 z-10 mt-6 relative items-stretch gap-3 lg:grid-cols-12 sm:gap-3 sm:mt-8">
              {[
                {
                  step: 'Bước 01',
                  title: 'Tiếp nhận & đánh giá hiện trạng',
                  desc: 'Lắng nghe mục tiêu, đánh giá quy trình, điểm nghẽn và dữ liệu hiện có.',
                  image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1600&auto=format&fit=crop',
                  icon: 'solar:clipboard-list-bold-duotone',
                  accent: 'from-emerald-500/15 via-transparent to-transparent',
                },
                {
                  step: 'Bước 02',
                  title: 'Đề xuất giải pháp phù hợp',
                  desc: 'Tư vấn lộ trình tối ưu, mô hình vận hành và kế hoạch triển khai rõ ràng.',
                  image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop',
                  icon: 'solar:lightbulb-bold-duotone',
                  accent: 'from-indigo-500/15 via-transparent to-transparent',
                },
                {
                  step: 'Bước 03',
                  title: 'Triển khai, chuẩn hóa & bàn giao',
                  desc: 'Thực thi, chuẩn hóa quy trình, đào tạo và bàn giao đầy đủ tài liệu.',
                  image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop',
                  icon: 'solar:shield-check-bold-duotone',
                  accent: 'from-amber-500/15 via-transparent to-transparent',
                },
                {
                  step: 'Bước 04',
                  title: 'Theo dõi & hỗ trợ vận hành',
                  desc: 'Theo sát hiệu quả, tối ưu liên tục và hỗ trợ vận hành dài hạn.',
                  image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1600&auto=format&fit=crop',
                  icon: 'solar:hand-stars-bold-duotone',
                  accent: 'from-rose-500/15 via-transparent to-transparent',
                },
              ].map((item, index) => (
                <div
                  key={item.step}
                  className={`lg:col-span-3 sm:p-8 hover-lift flex flex-col bg-white h-full border-neutral-200 border rounded-3xl p-6 relative shadow-sm hover:shadow-md transition-shadow duration-300 ${index === 1 ? "lg:translate-y-6" : index === 2 ? "lg:-translate-y-4" : ""
                    }`}
                >
                  <div className={`pointer-events-none absolute inset-0 bg-linear-to-br ${item.accent}`} />
                  <div className="relative h-40 sm:h-48 rounded-2xl bg-neutral-100 border border-neutral-200 overflow-hidden">
                    <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 bg-white/95 text-xs sm:text-sm text-neutral-800 tracking-tight font-geist shadow-sm">
                      <iconify-icon icon={item.icon} width={16} />
                      {item.step}
                    </span>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 25vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-neutral-900/40 to-transparent" />
                    <div className="absolute left-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-800 shadow-sm">
                      <iconify-icon icon={item.icon} width={16} />
                      Quy trình rõ ràng
                    </div>
                  </div>
                  <h3 className="sm:text-3xl text-2xl text-neutral-900 tracking-tighter mt-6 font-geist">
                    {item.title}
                  </h3>
                  <p className="sm:text-base text-sm text-neutral-600 tracking-tight max-w-[52ch] mt-2 font-geist">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-neutral-200 bg-neutral-50 rounded-2xl p-6 sm:p-8">
              <div className="max-w-2xl">
                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-900 font-geist">
                  Cam kết đồng hành cùng doanh nghiệp
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 mt-2 font-geist">
                  Chúng tôi không chỉ triển khai mà còn theo sát vận hành, đo lường hiệu quả và tối ưu liên tục
                  để đảm bảo kết quả thực tế.
                </p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-full border border-neutral-900 bg-neutral-900 text-neutral-50 px-5 py-2.5 text-sm font-medium shadow-sm transition-all duration-300 hover:bg-neutral-800 hover:-translate-y-0.5 hover:shadow-md">
                Đặt lịch tư vấn miễn phí
                <iconify-icon icon="solar:arrow-right-linear" width={16} />
              </button>
            </div>
          </section>

          <div className="flex flex-col z-10 w-full mt-20 mr-auto mb-20 ml-auto relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 mb-4 gap-4">
              <div className="flex flex-col gap-4">
                <div className="text-neutral-100">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="28" height="28" viewBox="0 0 24 24" className="w-[28px] h-[28px]" strokeWidth="2" style={{ width: 28, height: 28, color: '#999999' }}>
                    <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2" opacity="0.5" />
                    <path fill="currentColor" d="M12 6a1 1 0 0 1 1 1v4.586l2.707 2.707a1 1 0 0 1-1.414 1.414l-3-3A1 1 0 0 1 11 12V7a1 1 0 0 1 1-1" />
                  </svg>
                </div>
                <p className="leading-relaxed text-base text-neutral-900 font-geist">
                  Your learning path adapts based on progress and skill assessments.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="text-neutral-100">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="28" height="28" viewBox="0 0 24 24" className="w-[28px] h-[28px]" strokeWidth="2" style={{ width: 28, height: 28, color: '#999' }}>
                    <path fill="currentColor" d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12" opacity="0.5" />
                    <path fill="currentColor" d="M12 7.75a.75.75 0 0 1 .75.75v3.69l2.28 2.28a.75.75 0 1 1-1.06 1.06l-2.5-2.5a.75.75 0 0 1-.22-.53V8.5a.75.75 0 0 1 .75-.75" />
                  </svg>
                </div>
                <p className="leading-relaxed text-base font-medium text-neutral-900 font-normal font-geist">
                  The system knows when to push or hold back — based on mastery zones.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="text-neutral-900">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="28" height="28" viewBox="0 0 24 24" className="w-[28px] h-[28px]" strokeWidth="2" style={{ width: 28, height: 28, color: '#999' }}>
                    <path fill="currentColor" d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22" opacity="0.5" />
                    <path fill="currentColor" d="M16.03 8.97a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47l4.47-4.47a.75.75 0 0 1 1.06 0" />
                  </svg>
                </div>
                <p className="leading-relaxed text-base font-medium text-neutral-900 font-normal font-geist">
                  No more switching platforms. Theory, practice, and labs unified.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="text-neutral-900">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="28" height="28" viewBox="0 0 24 24" className="w-[28px] h-[28px]" strokeWidth="2" style={{ color: '#999', width: 28, height: 28 }}>
                    <path fill="currentColor" d="M19.83 8.7L12 2.1a.08.08 0 0 0-.07 0L4.17 8.7A1 1 0 0 0 4 9.6V20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9.6a1 1 0 0 0-.17-.9" opacity="0.5" />
                    <path fill="currentColor" d="M12.75 18a.75.75 0 0 1-1.5 0v-4a.75.75 0 0 1 1.5 0z" />
                  </svg>
                </div>
                <p className="leading-relaxed text-base font-medium text-neutral-900 font-normal font-geist">
                  Portfolio, skills, and credentials tracked. Always know your value.
                </p>
              </div>
            </div>

            <div className="overflow-hidden min-h-[500px] lg:min-h-[600px] shadow-neutral-900/30 bg-neutral-900 rounded-[2rem] relative shadow-2xl">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              <div className="grid grid-cols-1 min-h-[500px] h-full relative gap-y-3 lg:grid-cols-1 lg:min-h-[600px]">
                <div className="flex flex-col md:p-12 lg:p-16 bg-center bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/a5387a0b-52c6-40c2-b3be-ef86329b19cc_1600w.webp)] bg-cover pt-8 pr-8 pb-8 pl-8 saturate-50 justify-center">
                  <p className="leading-relaxed text-base font-medium text-neutral-50 mb-2 font-geist">
                    Case study - Workly
                  </p>
                  <h2 className="leading-tight md:text-4xl lg:text-5xl text-2xl font-normal text-neutral-50 tracking-tight mb-8 font-geist">
                    Redesigned product UX and brand positioning after poor early adoption. Result:
                    clearer value proposition, higher retention, stronger sales demos.
                  </h2>

                  <button className="group flex items-center gap-3 bg-neutral-50 hover:bg-neutral-100 transition-all text-neutral-900 text-sm font-medium rounded-full px-6 py-3 w-fit shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                    <span className="font-geist">Read more</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>

                  <div className="mt-12 pt-8 border-t border-neutral-50/10">
                    <p className="text-xs text-neutral-50/50 uppercase tracking-widest mb-4 font-medium font-geist">
                      Trusted by teams at
                    </p>
                    <div className="flex flex-wrap items-center gap-6 opacity-60">
                      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="20" viewBox="0 0 512 127.964" className="w-[100px] h-[20px] text-neutral-50" strokeWidth="2">
                        <path fill="currentColor" d="m4.086 51.292l72.586 72.587c1.06 1.06.549 2.859-.924 3.134a64 64 0 0 1-7.508.947a1.9 1.9 0 0 1-1.46-.554L.558 61.184a1.9 1.9 0 0 1-.554-1.46c.17-2.546.489-5.051.948-7.507c.275-1.473 2.074-1.984 3.134-.925M2.04 80.682c-.484-1.806 1.65-2.946 2.973-1.623l43.893 43.893c1.322 1.322.183 3.457-1.624 2.972c-22.009-5.9-39.34-23.233-45.242-45.242m6.362-48.609c.616-1.067 2.073-1.23 2.945-.36l84.904 84.905c.871.871.708 2.328-.36 2.945a64 64 0 0 1-5.548 2.851a1.885 1.885 0 0 1-2.11-.394L5.945 39.732a1.885 1.885 0 0 1-.395-2.11a64 64 0 0 1 2.852-5.549M63.912 0c35.375 0 64.052 28.677 64.052 64.052c0 18.78-8.081 35.672-20.957 47.387c-.743.677-1.883.632-2.594-.079L16.604 23.551a1.88 1.88 0 0 1-.079-2.594C28.241 8.082 45.133 0 63.912 0m194.14 35.248c4.591 0 8.313-3.735 8.313-8.343s-3.722-8.343-8.313-8.343c-4.59 0-8.312 3.735-8.312 8.343c0 4.507 3.561 8.18 8.014 8.338zm-71.202 72.761V18.567h14.773v76.356h39.83v13.086zm105.144-36.497v36.497H277.7V44.62h14.115v10.865l.179-.12q2.153-5.102 6.938-8.524q4.784-3.482 12.201-3.482q6.578 0 11.961 2.942q5.383 2.88 8.612 8.464q3.23 5.583 3.23 13.686v39.56h-14.294V70.43q0-7.203-3.828-10.925q-3.766-3.781-10.108-3.782q-4.066 0-7.415 1.681q-3.35 1.68-5.323 5.163q-1.974 3.48-1.974 8.944m147.608-28.154q5.98 0 10.764 1.561q4.786 1.5 8.134 4.322q3.41 2.821 5.204 6.664q1.793 3.84 1.794 8.464v43.64h-13.696v-8.944h-.239q-1.435 2.701-3.888 4.982q-2.392 2.282-6.1 3.662q-3.708 1.32-8.912 1.32q-6.338 0-11.243-2.1q-4.904-2.16-7.775-6.363q-2.87-4.263-2.87-10.565q0-5.463 2.033-8.944a15.7 15.7 0 0 1 5.502-5.583q3.529-2.1 8.014-3.182q4.485-1.08 9.33-1.62l2.647-.301q4.076-.472 6.684-.84q3.467-.48 4.904-1.5q1.494-1.022 1.495-3.182v-.48q0-2.881-1.436-5.043q-1.436-2.16-4.126-3.421q-2.632-1.26-6.4-1.261t-6.638 1.26q-2.871 1.2-4.546 3.362a9.16 9.16 0 0 0-1.914 4.922h-13.816q.3-5.882 3.648-10.565q3.35-4.681 9.271-7.443q5.981-2.822 14.175-2.822m11.84 34.037q-.582.426-1.783.806l-.31.094q-1.374.42-3.348.84l-4.246.78q-2.274.361-4.666.721q-3.29.42-6.1 1.501t-4.546 2.941q-1.674 1.86-1.674 4.863q0 3.84 3.05 6.063q3.05 2.16 8.195 2.16q5.082 0 8.552-1.86q3.468-1.92 5.142-4.983q1.735-3.12 1.735-6.843zm26.527 30.614V44.62h13.755v10.445h.18q1.735-5.403 5.442-8.224q3.768-2.88 9.869-2.881q1.496 0 2.69.12l1.49.08q.326.02.605.04v12.906l-.322-.046a67 67 0 0 0-2.429-.254a46 46 0 0 0-4.187-.18q-3.529 0-6.46 1.62q-2.93 1.622-4.664 4.983q-1.675 3.301-1.675 8.344v36.437zm-227.094 0V44.62h14.294v63.39zM374.38 43.18q6.758 0 12.26 2.4q5.564 2.401 9.51 6.844q3.947 4.382 6.1 10.445q2.153 6.003 2.154 13.326v3.842h-45.976q.165 4.962 1.957 8.884q1.974 4.263 5.742 6.663q3.827 2.402 9.15 2.402q3.947 0 6.938-1.201q2.99-1.2 4.963-3.302a12.9 12.9 0 0 0 2.932-4.982h13.456q-1.196 6.183-5.203 10.925q-4.007 4.683-10.048 7.384q-5.98 2.64-13.277 2.641q-9.45 0-16.328-4.262q-6.877-4.261-10.585-11.706q-3.709-7.503-3.709-17.108q0-9.665 3.828-17.168T358.83 47.44q6.76-4.261 15.55-4.262m.179 11.525q-4.904 0-8.553 2.221q-3.586 2.22-5.62 6.303q-1.452 2.956-1.836 6.723h32.078q-.384-3.766-1.834-6.723q-1.974-4.082-5.622-6.303q-3.649-2.22-8.613-2.221" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="20" viewBox="0 0 512 99" className="w-[80px] h-[20px] text-neutral-50" strokeWidth="2">
                        <path fill="currentColor" d="M340.962 29.149c21.899 0 34.319 16.728 33.204 39.946h-51.657c1.49 9.834 10.433 16.77 20.328 15.765a25.35 25.35 0 0 0 18.199-7.097l9.023 9.784a35.5 35.5 0 0 1-27.12 10.747c-22.052 0-36.297-14.701-36.297-34.573a33.81 33.81 0 0 1 34.32-34.572m-236.382 0c21.9 0 34.319 16.728 33.204 39.946H86.178c1.49 9.812 10.4 16.74 20.277 15.765a25.35 25.35 0 0 0 18.2-7.097l9.023 9.784a35.5 35.5 0 0 1-27.121 10.747c-22.052 0-36.296-14.701-36.296-34.573A33.81 33.81 0 0 1 104.58 29.15m333.51 12.42l-11.812 6.894a17.13 17.13 0 0 0-14.853-7.554c-7.553 0-11.406 3.7-11.406 7.96c0 4.257 6.083 6.082 15.664 8.211l.656.145l.658.148q.495.111.991.229l.662.158q.331.08.663.163l.663.168l.661.174c9.364 2.507 18.264 6.865 18.264 18.586c0 9.175-7.96 21.494-26.817 21.392a31.02 31.02 0 0 1-29.098-15.36l12.724-6.843a18.91 18.91 0 0 0 16.982 9.682c7.96 0 12.065-4.106 12.065-8.77s-7.705-6.489-16.07-8.212l-.678-.145l-.679-.148l-.34-.076l-.678-.154c-10.504-2.427-20.588-6.518-20.588-19.247c0-10.494 10.138-20.278 25.65-20.278a30.42 30.42 0 0 1 26.716 12.876M293.31 0v96.925h-14.093V87.8a28.24 28.24 0 0 1-22.152 10.494a33.41 33.41 0 0 1-33.103-34.573A33.103 33.103 0 0 1 257.166 29.2a28.59 28.59 0 0 1 22.051 10.139V0zM58.297 30.77v12.978L18.452 84.303h40.555v12.774H0V84.15l39.845-40.554H.912V30.771zM464.399 0v63.468l29.858-33.052h17.135l-25.904 28.439L512 96.925h-15.867l-20.581-29.453l-11.153 12.218v17.286h-14.092V0zM182.09 29.2c16.73 0 30.822 10.898 30.822 28.945v38.78h-14.498V59.92c0-10.848-5.272-17.388-15.918-17.388a15.715 15.715 0 0 0-16.78 17.388v37.006H151.37v-38.78c0-18.047 13.99-28.946 30.72-28.946m76.902 13.534c-11.59 0-20.987 9.396-20.987 20.987s9.396 20.987 20.987 20.987s20.987-9.396 20.987-20.987s-9.396-20.987-20.987-20.987m63.468 15.259l36.144.05c-.491-9.14-8.298-16.153-17.439-15.664c-9.38-.55-17.57 6.287-18.705 15.614m-236.28 0l36.042.05c-.518-9.12-8.316-16.102-17.438-15.613c-9.325-.498-17.448 6.297-18.605 15.563" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:justify-end lg:p-0 lg:pr-12 -bottom-40 lg:scale-100 hidden sm:block pt-8 pr-12 pb-8 pl-8 absolute right-0 scale-50 items-end justify-center">
                <div className="relative w-[280px] md:w-[320px] transform translate-y-8 lg:translate-y-16">
                  <div className="bg-neutral-800 rounded-[2.5rem] p-3 relative shadow-2xl" style={{ boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)' }}>
                    <div className="relative bg-white rounded-[2rem] overflow-hidden">
                      <div className="flex items-center justify-between px-6 py-3 bg-neutral-50">
                        <span className="text-xs font-semibold text-neutral-900 font-geist">9:41</span>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-2 bg-neutral-400 rounded-sm" />
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="text-neutral-400">
                            <path fill="currentColor" d="M12 3C7.5 3 3.75 4.95 1 8l11 13l11-13c-2.75-3.05-6.5-5-11-5" />
                          </svg>
                          <div className="w-6 h-3 border border-neutral-400 rounded-sm relative">
                            <div className="absolute inset-0.5 bg-neutral-500 rounded-sm" style={{ width: '70%' }} />
                          </div>
                        </div>
                      </div>

                      <div className="p-5 space-y-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-lg font-normal text-neutral-900 tracking-tight font-geist">Hi, Marcus</p>
                          </div>
                          <div className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="text-neutral-600">
                              <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4" />
                            </svg>
                          </div>
                        </div>

                        <div className="bg-neutral-700 rounded-2xl px-4 py-4">
                          <p className="text-[10px] text-neutral-400 uppercase tracking-wider mb-1 font-geist">
                            Today&apos;s suggestion
                          </p>
                          <p className="text-base font-normal text-neutral-50 tracking-tight mb-3 font-geist">
                            Complete Module 3
                          </p>
                          <div className="space-y-2">
                            <div className="h-1 rounded-full overflow-hidden">
                              <div className="h-full bg-linear-to-r from-neutral-600 to-neutral-500 rounded-full" style={{ width: '65%' }} />
                            </div>
                            <div className="flex justify-between text-[10px]">
                              <span className="text-neutral-400 font-geist">2h 15m · Zone 2</span>
                              <span className="text-neutral-400 font-geist">65%</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4">
                          <p className="text-[10px] text-neutral-400 uppercase tracking-wider mb-1 font-geist">
                            Weekly Progress
                          </p>
                          <p className="text-xl font-normal text-neutral-900 tracking-tight mb-2 font-geist">
                            87% Learning Load
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                              <div className="h-full bg-neutral-500 rounded-full" style={{ width: '87%' }} />
                            </div>
                            <span className="text-[10px] text-neutral-600 font-medium font-geist">Optimal</span>
                          </div>
                        </div>

                        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4">
                          <p className="text-[10px] text-neutral-400 uppercase tracking-wider mb-1 font-geist">
                            XP Balance
                          </p>
                          <div className="flex items-baseline gap-1">
                            <p className="text-xl font-semibold text-neutral-900 tracking-tight font-geist">4,850</p>
                            <span className="text-sm text-neutral-400 font-geist">XP</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="animate-fade-up w-full" style={{ animationDelay: '0.3s' }}>
            <div className="relative overflow-hidden border border-stone-200 rounded-3xl bg-stone-50 p-4 sm:p-6 shadow-2xl">
              <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-emerald-200/40 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-indigo-200/40 blur-3xl" />
              <div className="relative grid lg:grid-cols-12 lg:gap-6 items-center">
                <div className="lg:col-span-4 space-y-4 self-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold text-neutral-700">
                    <iconify-icon icon="solar:shield-check-bold-duotone" width={16} />
                    Lý do lựa chọn
                  </div>
                  <h2 className="lg:text-4xl text-3xl font-medium text-neutral-900 tracking-tight font-geist">
                    Vì sao chọn SunPrime
                  </h2>
                  <p className="text-[17px] leading-relaxed font-normal text-neutral-600 font-geist">
                    Chúng tôi tập trung vào giá trị thực tế, hiệu quả vận hành và kết quả đo lường được.
                  </p>
                  <div className="rounded-2xl border border-neutral-200 bg-white/70 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-neutral-800">
                      <iconify-icon icon="solar:medal-star-bold-duotone" width={16} />
                      Dịch vụ của SunPrime mang đến lợi ích gì cho doanh nghiệp
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-neutral-700 font-geist">
                      {[
                        "An tâm pháp lý – thuế",
                        "Kiểm soát chi phí & dòng tiền",
                        "Báo cáo và đo lường rõ ràng, dễ ra quyết định",
                        "Hệ thống vận hành có thể mở rộng",
                      ].map((benefit, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-neutral-100 border border-neutral-200 text-emerald-600">
                            <iconify-icon icon="solar:check-circle-bold-duotone" width={14} />
                          </span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="hidden lg:flex items-center gap-3 text-sm text-neutral-600 font-geist">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white border border-neutral-200">
                      <iconify-icon icon="solar:chart-bold-duotone" width={18} />
                    </span>
                    Cam kết đồng hành dài hạn, minh bạch ngay từ đầu.
                  </div>
                </div>

                <div className="lg:col-span-8 mt-6 lg:mt-0">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 p-1 sm:p-2">
                    {[
                      {
                        title: "Hiểu sâu thực tế doanh nghiệp",
                        desc: "Đi sâu vào mô hình vận hành, bài toán và dữ liệu để đưa ra hướng phù hợp.",
                        icon: "solar:clock-circle-bold-duotone",
                        accent: "from-emerald-500/15 via-transparent to-transparent",
                      },
                      {
                        title: "Không tư vấn lý thuyết, tập trung vào kết quả",
                        desc: "Ưu tiên hiệu quả đo lường được, cải thiện quy trình và doanh thu thực tế.",
                        icon: "solar:star-bold-duotone",
                        accent: "from-indigo-500/15 via-transparent to-transparent",
                      },
                      {
                        title: "Đồng hành lâu dài, không làm dịch vụ “cho xong”",
                        desc: "Theo sát vận hành, tối ưu liên tục và hỗ trợ đến khi đạt mục tiêu.",
                        icon: "solar:chat-round-dots-bold-duotone",
                        accent: "from-amber-500/15 via-transparent to-transparent",
                      },
                    ].map((item, index) => (
                      <div
                        key={item.title}
                        className={`relative overflow-hidden rounded-3xl border border-neutral-200/70 bg-white p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow duration-300 ${index === 1 ? "lg:translate-y-6" : index === 2 ? "lg:-translate-y-4" : ""
                          }`}
                      >
                        <div className={`pointer-events-none absolute inset-0 bg-linear-to-br ${item.accent}`} />
                        <div className="relative flex flex-col items-start gap-4">
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-100 border border-neutral-200 text-neutral-900">
                            <iconify-icon icon={item.icon} width={20} />
                          </span>
                          <div>
                            <h3 className="text-lg font-medium text-neutral-900 mb-2 font-geist">
                              {item.title}
                            </h3>
                            <p className="text-[15px] leading-relaxed text-neutral-600 font-geist">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-600 border border-neutral-200">
                          <iconify-icon icon="solar:check-circle-bold-duotone" width={14} />
                          Cam kết kết quả thực tế
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="animate-fade-up lg:pb-0 lg:pt-0 w-full my-24 pt-20 pb-0 gap-y-20">
            <div className="grid lg:grid-cols-12 lg:gap-6 gap-x-12 gap-y-12">
              <div className="lg:col-span-5 space-y-6">
                <h2 className="lg:text-4xl text-3xl font-medium text-neutral-900 tracking-tight font-geist">
                  Chưa sẵn sàng trò chuyện? Nhận ngay những thông tin hữu ích miễn phí giúp tạo ra sự khác
                  biệt.
                </h2>
                <p className="text-[17px] leading-relaxed font-normal text-neutral-500 font-geist">
                  Hãy bỏ qua những lời khuyên chung chung dành cho doanh nghiệp nhỏ. Đây là những hiểu biết
                  chiến lược mà chúng tôi đã đúc kết được từ việc hỗ trợ hàng nghìn doanh nghiệp vượt qua
                  những phức tạp thực tế trong quá trình phát triển.
                </p>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-3xl border border-neutral-200 bg-white overflow-hidden divide-y divide-neutral-200">
                  {[
                    {
                      title: "Dự báo dòng tiền của bạn",
                      desc: "Tìm hiểu cách đạt được dòng tiền dương và giảm sự phụ thuộc vào vốn bên ngoài.",
                      icon: "solar:wallet-money-bold-duotone",
                    },
                    {
                      title: "Quản lý chi phí của bạn",
                      desc: "Hãy tìm cách cắt giảm chi phí mà không làm ảnh hưởng đến đà tăng trưởng.",
                      icon: "solar:money-bag-bold-duotone",
                    },
                    {
                      title: "Xem các chỉ số chính của bạn",
                      desc: "Hãy nắm rõ những chỉ số thực sự quan trọng khi bạn mở rộng quy mô.",
                      icon: "solar:chart-square-bold-duotone",
                    },
                  ].map((item, index) => (
                    <div key={index} className="p-6 sm:p-8">
                      <div className="flex items-start gap-4">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900">
                          <iconify-icon icon={item.icon} width={22} />
                        </span>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-neutral-900 font-geist">{item.title}</h3>
                          <p className="text-sm leading-relaxed text-neutral-500 mt-2 font-geist">{item.desc}</p>
                          <button className="mt-3 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-indigo-600 hover:text-indigo-700 uppercase">
                            Đọc thêm
                            <iconify-icon icon="solar:arrow-right-linear" width={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="animate-fade-up w-full pb-0 gap-x-20 gap-y-20 lg:pb-0 lg:pt-0">
            <div className="grid lg:grid-cols-12 lg:gap-6 gap-x-12 gap-y-12">
              <div className="lg:col-span-5 space-y-6">
                <h2 className="lg:text-4xl text-3xl font-medium text-neutral-900 tracking-tight font-geist">
                  Câu hỏi thường gặp
                </h2>
                <p className="text-[17px] leading-relaxed font-normal text-neutral-500 font-geist">
                  Những thắc mắc phổ biến về dịch vụ kế toán và tư vấn vận hành. Nhấn vào từng câu hỏi để
                  xem câu trả lời chi tiết.
                </p>
              </div>
              <div className="lg:col-span-7">
                <div className="flex flex-col gap-3 bg-stone-50 border-stone-200 border rounded-[32px] p-2">
                  {faqItems.map((item, index) => (
                    <details
                      key={index}
                      className="group bg-white border-neutral-200/60 border rounded-3xl p-5 sm:p-6"
                    >
                      <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                        <span className="text-base font-semibold text-neutral-900 tracking-tight font-geist">
                          {item.question}
                        </span>
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-transform duration-300 group-open:rotate-45">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 5v14" />
                            <path d="M5 12h14" />
                          </svg>
                        </span>
                      </summary>
                      <p className="text-[15px] leading-relaxed text-neutral-600 mt-4 font-geist">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* --- SECTION: TESTIMONIALS --- */}
          <section
            id="feedback"
            className="animate-scaleIn animation-delay-400 sm:p-8 bg-neutral-50 w-full max-w-7xl z-10 border-neutral-200/70 border rounded-3xl mt-24 mr-auto mb-24 ml-auto pt-6 pr-6 pb-6 pl-6 relative shadow-2xl gap-x-20 gap-y-20"
          >
            <div className="flex flex-col sm:px-0 animate-fadeInUp pr-0 pl-0 gap-x-6 gap-y-2">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                <iconify-icon icon="solar:verified-check-bold" width={12} />
                Khách hàng đánh giá
              </span>
              <h2 className="text-4xl leading-[1] sm:text-5xl lg:text-6xl xl:text-5xl text-neutral-900 tracking-tighter text-left font-geist">
                Phản hồi thực tế từ doanh nghiệp.
              </h2>
              <p className="text-sm sm:text-sm text-neutral-500 tracking-tight mt-1 font-geist">
                Những chia sẻ về trải nghiệm dịch vụ kế toán, pháp lý và vận hành cùng SunPrime Consulting.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 sm:mt-8 mt-6 items-center">
              <div className="lg:col-span-12 relative">
                <div className="relative overflow-hidden h-[420px] rounded-3xl mt-6">
                  <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-neutral-50 to-transparent z-10" />
                  <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-neutral-50 to-transparent z-10" />

                  <div
                    ref={testimonialRailRef}
                    className="flex gap-6 overflow-x-auto scroll-smooth pr-6 pl-6 absolute top-0 right-0 bottom-0 left-0 items-center"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    id="testimonial-rail"
                  >
                    {feedbacks.map((item, index) => (
                      <article
                        key={item.name}
                        className={`min-w-[360px] sm:min-w-[480px] max-w-[640px] bg-white border border-neutral-200/70 rounded-[24px] p-7 sm:p-8 text-neutral-900 hover-lift backdrop-blur-sm snap-center shadow-2xl ${index % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2 text-amber-500">
                            {renderStars(item.rating)}
                            <span className="text-xs font-semibold text-neutral-500">
                              {item.rating}/5
                            </span>
                          </div>
                          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                            Verified
                          </span>
                        </div>
                        <p className="mt-5 text-lg sm:text-xl md:text-2xl text-neutral-900 tracking-tighter font-geist">
                          &ldquo;{item.text}&rdquo;
                        </p>
                        <div className="mt-8 flex items-center gap-3">
                          <Image
                            src={item.avatar}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-xl object-cover"
                          />
                          <div>
                            <div className="text-sm tracking-tight font-geist">{item.name}</div>
                            <div className="text-xs text-neutral-500 tracking-tight font-geist">
                              {item.role}
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
                    <button
                      aria-label="Previous"
                      onClick={() => scrollTestimonials(-1)}
                      className={`hover:bg-neutral-200 transition-colors inline-flex text-neutral-900 bg-neutral-100 w-10 h-10 border-neutral-200 border rounded-full items-center justify-center ${isTestimonialPrevDisabled ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <path d="m12 19-7-7 7-7" />
                        <path d="M19 12H5" />
                      </svg>
                    </button>
                    <button
                      aria-label="Next"
                      onClick={() => scrollTestimonials(1)}
                      className={`w-10 h-10 rounded-full text-neutral-50 bg-neutral-900 hover:bg-neutral-800 transition-colors inline-flex items-center justify-center ${isTestimonialNextDisabled ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[24px] h-[20px]">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <SiteFooter />

        </main>
      </div>

      <ContactFloatingButtons />

    </div>
  );
}
