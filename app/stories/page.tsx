"use client";

import ContactFloatingButtons from '@/components/contact';
import SiteFooter from '@/components/footer';
import SiteNav from '@/components/nav';
import { Partner, partners } from '@/data/partners';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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

export default function PartnerShowcase() {
  const [filter, setFilter] = useState('All');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const searchParams = useSearchParams();
  const partnerId = searchParams.get('partner');
  const initialPartner = useMemo(() => {
    if (!partnerId) return null;
    return partners.find((p) => p.id === partnerId) ?? null;
  }, [partnerId]);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(() => initialPartner);
  const [isModalOpen, setIsModalOpen] = useState(() => Boolean(initialPartner));

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
  const modalCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const industries = ['All', ...new Set(partners.map((p) => p.industry))];

  const filteredPartners = useMemo(() => {
    return filter === 'All' ? partners : partners.filter((p) => p.industry === filter);
  }, [filter]);

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

  useEffect(() => {
    return () => {
      if (modalCloseTimeoutRef.current) {
        clearTimeout(modalCloseTimeoutRef.current);
      }
    };
  }, []);

  const openModal = useCallback((partner: Partner) => {
    if (modalCloseTimeoutRef.current) {
      clearTimeout(modalCloseTimeoutRef.current);
    }
    setSelectedPartner(partner);
    setIsModalOpen(false);
    requestAnimationFrame(() => {
      setIsModalOpen(true);
    });
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    if (modalCloseTimeoutRef.current) {
      clearTimeout(modalCloseTimeoutRef.current);
    }
    modalCloseTimeoutRef.current = setTimeout(() => {
      setSelectedPartner(null);
    }, 300);
  }, []);

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

  const activeFeedback = feedbacks[feedbackIndex];

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
        renderStars={renderStars}
        progressRef={progressRef}
      />

      <div className="fixed grid-lines w-full h-full top-0 right-0 bottom-0 left-0" />

      <div className="relative z-10 flex flex-col min-h-screen max-w-[1600px] mx-auto">
        <main onMouseEnter={closeMegaMenu} className="flex-1 lg:ml-64 px-6 lg:px-8 pt-24 lg:pt-10 pb-16">
          <header className="w-full pt-8 pb-12 animate-fade-up">
            <div className="max-w-2xl">
              <h5 className="font-medium tracking-wide text-xs uppercase mb-3 text-neutral-500">Our Ecosystem</h5>
              <h1 className="group text-4xl md:text-5xl font-medium tracking-tight mb-6 text-neutral-900 cursor-default">
                Transforming F&B with <br />
                <span className="text-neutral-400 transition-colors duration-300 group-hover:text-neutral-900">
                  world-class partners.
                </span>
              </h1>
              <p className="text-lg text-neutral-500 leading-relaxed">
                Discover the brands optimizing their operations, customer engagement, and growth through our digital infrastructure.
              </p>
            </div>
          </header>

          <div className="sticky top-16 lg:top-0 z-30 backdrop-blur-md border-b bg-neutral-100/80 border-neutral-200 rounded-2xl">
            <div className="w-full px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
                {industries.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => setFilter(ind)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all border whitespace-nowrap ${filter === ind
                      ? 'bg-neutral-900 text-neutral-50 border-neutral-900 shadow-sm'
                      : 'bg-neutral-50 text-neutral-500 border-neutral-200 hover:border-neutral-400'
                      }`}
                  >
                    {ind}
                  </button>
                ))}
              </div>

              <div className="flex items-center p-1 rounded-lg bg-neutral-200 self-start md:self-auto">
                <button
                  onClick={() => setView('grid')}
                  className={`h-9 w-9 inline-flex items-center justify-center rounded-lg transition-all ${view === 'grid' ? 'bg-neutral-50 shadow-sm text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'}`}
                >
                  <iconify-icon icon="solar:widget-3-linear" width={20} />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`h-9 w-9 inline-flex items-center justify-center rounded-lg transition-all ${view === 'list' ? 'bg-neutral-50 shadow-sm text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'}`}
                >
                  <iconify-icon icon="solar:list-linear" width={20} />
                </button>
              </div>
            </div>
          </div>

          <section className="w-full py-12">
            <div
              className={`transition-all duration-500 ${view === 'grid'
                ? 'grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'flex flex-col gap-4'
                }`}
            >
              {filteredPartners.map((p) => (
                <div
                  key={p.id}
                  onClick={() => openModal(p)}
                  className={`group cursor-pointer bg-neutral-50 border border-neutral-200 transition-all hover:shadow-xl hover:shadow-neutral-200/50 animate-fade-in-up ${view === 'grid'
                    ? 'rounded-2xl overflow-hidden flex flex-col h-full'
                    : 'rounded-2xl p-4 sm:p-5 flex items-center gap-4 sm:gap-6'
                    }`}
                >
                  {view === 'grid' ? (
                    <>
                      <div className="h-48 w-full overflow-hidden shrink-0 relative">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-2 left-2 inline-flex">
                          <span className="bg-neutral-50/90 backdrop-blur-sm text-neutral-800 text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full border border-neutral-200">
                            {p.industry}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 grow flex flex-col">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-8 w-8 rounded bg-neutral-100 flex items-center justify-center text-[10px] font-bold text-neutral-500 border border-neutral-200 uppercase tracking-tighter">
                            {p.logo}
                          </div>
                          <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-indigo-600 transition-colors tracking-tight">
                            {p.name}
                          </h3>
                        </div>
                        <p className="text-sm text-neutral-500 line-clamp-2 mb-4 grow">{p.description}</p>

                        <div className="flex items-center text-xs font-bold text-neutral-900 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          VIEW CASE STUDY <iconify-icon icon="solar:arrow-right-linear" width={14} className="ml-1" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-xl overflow-hidden shrink-0 relative">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="(max-width: 768px) 40vw, 96px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-indigo-600 transition-colors tracking-tight">
                            {p.name}
                          </h3>
                          <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium text-neutral-500 border-neutral-200 bg-neutral-100/70">
                            {p.industry}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-500 line-clamp-2">
                          {p.description}
                        </p>
                      </div>

                      <div className="shrink-0 self-center">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-neutral-100 text-neutral-500 transition-colors group-hover:bg-neutral-900 group-hover:text-neutral-50">
                          <iconify-icon icon="solar:arrow-right-linear" width={18} />
                        </span>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>

          <div className="mt-10">
            <SiteFooter />
          </div>
        </main>
      </div>

      {selectedPartner && (
        <div
          id="modal-overlay"
          className={`fixed inset-0 z-50 ${isModalOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`absolute inset-0 backdrop-blur-sm transition-opacity duration-300 bg-slate-900/40 ${isModalOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={closeModal}
          />

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <div
              id="modal-panel"
              className={`pointer-events-auto w-screen max-w-2xl transform transition-transform duration-300 ${isModalOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
              <div className="flex h-full flex-col overflow-y-scroll shadow-2xl bg-white">
                <div className="relative h-64 sm:h-80 w-full shrink-0">
                  <Image
                    src={selectedPartner.image}
                    alt={selectedPartner.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 768px"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t to-transparent from-black/60" />
                  <button
                    type="button"
                    className="absolute top-6 right-6 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors backdrop-blur-md bg-white/20 text-white hover:bg-white/40"
                    onClick={closeModal}
                  >
                    <span className="sr-only">Close panel</span>
                    <iconify-icon icon="solar:close-circle-linear" width={24} stroke-width="1.5" />
                  </button>
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-md mb-3 border-white/30 bg-white/10">
                      {selectedPartner.industry}
                    </div>
                    <h2 id="modal-title" className="text-3xl font-medium tracking-tight">
                      {selectedPartner.name}
                    </h2>
                  </div>
                </div>

                <div className="flex-1 px-6 py-8 sm:px-10">
                  <div className="mb-10">
                    <h3 className="text-sm font-medium uppercase tracking-wider mb-3 flex items-center gap-2 text-slate-900">
                      <iconify-icon icon="solar:info-circle-linear" className="text-slate-400" /> About
                    </h3>
                    <p className="text-base leading-relaxed text-slate-600">{selectedPartner.description}</p>
                  </div>

                  <div className="border-t pt-10 mb-10 border-slate-100">
                    <h3 className="text-lg font-medium tracking-tight mb-6 text-slate-900">Transformation Journey</h3>

                    <div className="space-y-8">
                      <div className="flex gap-4">
                        <div className="shrink-0 mt-1">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full ring-1 bg-red-50 text-red-600 ring-red-100">
                            <iconify-icon icon="solar:danger-triangle-linear" width={18} />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-slate-900">The Challenge</h4>
                          <p className="mt-1 text-sm text-slate-500 leading-relaxed">{selectedPartner.before}</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="shrink-0 mt-1">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full ring-1 bg-indigo-50 text-indigo-600 ring-indigo-100">
                            <iconify-icon icon="solar:magic-stick-3-linear" width={18} />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-slate-900">Our Solution</h4>
                          <p className="mt-1 text-sm text-slate-500 leading-relaxed">{selectedPartner.solution}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border p-6 bg-slate-50 border-slate-100">
                    <h3 className="text-xs font-medium uppercase tracking-widest mb-6 text-center text-slate-400">
                      Impact Metrics
                    </h3>
                    <div className="grid grid-cols-3 gap-4 text-center divide-x divide-slate-200">
                      {selectedPartner.metrics.map((m, i) => (
                        <div key={i} className="px-2">
                          <p className="text-xl sm:text-2xl font-semibold tracking-tight text-indigo-600">
                            {m.val}
                          </p>
                          <p className="mt-1 text-xs text-slate-500 font-medium">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-10">
                    <button className="w-full rounded-lg py-3 px-4 text-sm font-medium shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-slate-800">
                      View Case Study
                      <iconify-icon icon="solar:arrow-right-linear" width={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ContactFloatingButtons />
    </div>
  );
}