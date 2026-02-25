"use client";

import SiteFooter from '@/components/footer';
import SiteNav from '@/components/nav';
import { feedbackItems } from '@/data/feedbacks';
import { type ReactNode, useEffect, useRef, useState } from 'react';

export default function ContactLayout({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileHeaderHidden, setIsMobileHeaderHidden] = useState(false);
  const [isMobileHeaderElevated, setIsMobileHeaderElevated] = useState(false);

  const [feedbackIndex, setFeedbackIndex] = useState(0);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(true);

  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const feedbackIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const lastScrollTopRef = useRef(0);
  const megaMenuTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        setFeedbackIndex((prev) => (prev + 1) % feedbackItems.length);
        setIsFeedbackVisible(true);
      }, 200);
    }, 5000);

    return () => {
      if (feedbackIntervalRef.current) clearInterval(feedbackIntervalRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
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

  const activeFeedback = feedbackItems[feedbackIndex];

  return (
    <div id="home" className="min-h-screen bg-neutral-100 text-neutral-900 selection:bg-neutral-200">
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
        renderStars={(count: number) =>
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
          })
        }
        progressRef={progressRef}
      />

      <div className="fixed grid-lines w-full h-full top-0 right-0 bottom-0 left-0" />

      <div className="relative z-10 flex flex-col min-h-screen max-w-[1600px] mx-auto">
        <main onMouseEnter={closeMegaMenu} className="flex-1 lg:ml-64 px-6 lg:px-16 pt-24 lg:pt-10 pb-16">
          {children}
          <div className="mt-10 lg:mt-12">
            <SiteFooter />
          </div>
        </main>
      </div>

    </div>
  );
}
