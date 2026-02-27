"use client";

import { Partner, partners } from "@/data/partners";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";

type PartnerShowcaseSectionProps = {
  showHero?: boolean;
  containerClassName?: string;
};

function PartnerShowcaseSectionContent({ showHero = true, containerClassName = "" }: PartnerShowcaseSectionProps) {
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const searchParams = useSearchParams();
  const partnerId = searchParams.get("partner");
  const initialPartner = useMemo(() => {
    if (!partnerId) return null;
    return partners.find((p) => p.id === partnerId) ?? null;
  }, [partnerId]);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(() => initialPartner);
  const [isModalOpen, setIsModalOpen] = useState(() => Boolean(initialPartner));

  const modalCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const industries = ["All", ...new Set(partners.map((p) => p.industry))];

  const filteredPartners = useMemo(() => {
    return filter === "All" ? partners : partners.filter((p) => p.industry === filter);
  }, [filter]);

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

  return (
    <section className={`bg-surface-base ${containerClassName}`}>
      {showHero ? (
        <section className="relative overflow-hidden bg-linear-to-br from-brand via-brand-strong to-brand-ink py-24 text-text-inverse">
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,#a5b4fc_0,transparent_55%),radial-gradient(circle_at_bottom_left,#818cf8_0,transparent_45%)]" />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.22)_1px,transparent_1px)] bg-size-[36px_36px] opacity-[0.16]" />
          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl animate-fade-up">
              <h5 className="mb-3 inline-flex rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                Câu chuyện khách hàng
              </h5>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Đồng hành vận hành thực chiến cùng doanh nghiệp dịch vụ.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-white/90">
                Khám phá những thương hiệu đã tối ưu vận hành, quản trị số liệu và tăng trưởng bền vững với giải pháp
                từ SunPrime.
              </p>
            </div>
          </div>
        </section>
      ) : (
        <div className="mx-auto w-full max-w-7xl px-4 pb-4 pt-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-text-primary lg:text-4xl">
            Những khách hàng của chúng tôi
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-secondary">
            Các case đồng hành thực tế với đầy đủ dữ liệu, ngành nghề và kết quả chuyển đổi trong vận hành.
          </p>
        </div>
      )}

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="sticky top-16 z-30 rounded-2xl border border-border bg-surface-base/90 backdrop-blur-md">
          <div className="flex w-full flex-col justify-between gap-4 px-4 py-4 md:flex-row md:px-6">
            <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              {industries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setFilter(ind)}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    filter === ind
                      ? "border-brand bg-brand text-text-inverse shadow-sm"
                      : "border-border bg-surface-card text-text-secondary hover:border-brand-ring hover:text-brand"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>

            <div className="flex items-center self-start rounded-lg bg-brand-soft p-1 md:self-auto">
              <button
                onClick={() => setView("grid")}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-lg transition-all ${
                  view === "grid"
                    ? "bg-surface-card text-text-primary shadow-sm"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                <iconify-icon icon="solar:widget-3-linear" width={20} />
              </button>
              <button
                onClick={() => setView("list")}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-lg transition-all ${
                  view === "list"
                    ? "bg-surface-card text-text-primary shadow-sm"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                <iconify-icon icon="solar:list-linear" width={20} />
              </button>
            </div>
          </div>
        </div>

        <section className="w-full py-10">
          <div
            className={`transition-all duration-500 ${
              view === "grid" ? "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-4"
            }`}
          >
            {filteredPartners.map((p) => (
              <div
                key={p.id}
                onClick={() => openModal(p)}
                className={`group animate-fade-in-up cursor-pointer border border-border bg-surface-card transition-all hover:-translate-y-0.5 hover:border-brand-ring hover:shadow-xl hover:shadow-brand-soft/60 ${
                  view === "grid"
                    ? "flex h-full flex-col overflow-hidden rounded-2xl"
                    : "flex items-center gap-4 rounded-2xl p-4 sm:gap-6 sm:p-5"
                }`}
              >
                {view === "grid" ? (
                  <>
                    <div className="relative h-48 w-full shrink-0 overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute left-2 top-2 inline-flex">
                        <span className="rounded-full border border-border bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-text-secondary backdrop-blur-sm">
                          {p.industry}
                        </span>
                      </div>
                    </div>

                    <div className="grow p-6">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded border border-border bg-brand-soft text-[10px] font-bold uppercase tracking-tighter text-brand">
                          {p.logo}
                        </div>
                        <h3 className="text-lg font-semibold tracking-tight text-text-primary transition-colors group-hover:text-brand">
                          {p.name}
                        </h3>
                      </div>
                      <p className="mb-4 line-clamp-2 text-sm text-text-secondary">{p.description}</p>

                      <div className="flex translate-y-2 transform items-center text-xs font-bold text-brand opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        VIEW CASE STUDY <iconify-icon icon="solar:arrow-right-linear" width={14} className="ml-1" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-24">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(max-width: 768px) 40vw, 96px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-semibold tracking-tight text-text-primary transition-colors group-hover:text-brand">
                          {p.name}
                        </h3>
                        <span className="inline-flex items-center rounded-full border border-border bg-surface-section px-2.5 py-1 text-xs font-medium text-text-secondary">
                          {p.industry}
                        </span>
                      </div>
                      <p className="line-clamp-2 text-sm text-text-secondary">{p.description}</p>
                    </div>

                    <div className="shrink-0 self-center">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-text-inverse">
                        <iconify-icon icon="solar:arrow-right-linear" width={18} />
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      </section>

      {selectedPartner && (
        <div
          id="modal-overlay"
          className={`fixed inset-0 z-50 ${isModalOpen ? "pointer-events-auto" : "pointer-events-none"}`}
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`absolute inset-0 bg-brand-ink/45 backdrop-blur-sm transition-opacity duration-300 ${isModalOpen ? "opacity-100" : "opacity-0"}`}
            onClick={closeModal}
          />

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-4 sm:pl-8">
            <div
              id="modal-panel"
              className={`pointer-events-auto h-full w-screen max-w-[780px] transform transition-transform duration-300 ${isModalOpen ? "translate-x-0" : "translate-x-full"}`}
            >
              <div className="flex h-full flex-col overflow-y-auto border-l border-border bg-surface-elevated shadow-2xl">
                <div className="relative h-56 w-full shrink-0 sm:h-72">
                  <Image
                    src={selectedPartner.image}
                    alt={selectedPartner.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 768px"
                    className="h-full w-full object-cover"
                  />
                  <div className="bg-linear-to-t absolute inset-0 from-black/60 to-transparent" />
                  <button
                    type="button"
                    className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/40 sm:right-6 sm:top-6"
                    onClick={closeModal}
                  >
                    <span className="sr-only">Close panel</span>
                    <iconify-icon icon="solar:close-circle-linear" width={24} stroke-width="1.5" />
                  </button>
                  <div className="absolute bottom-4 left-4 right-4 text-white sm:bottom-6 sm:left-6 sm:right-6">
                    <div className="mb-3 inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-md">
                      {selectedPartner.industry}
                    </div>
                    <h2 id="modal-title" className="text-2xl font-medium tracking-tight sm:text-3xl">
                      {selectedPartner.name}
                    </h2>
                  </div>
                </div>

                <div className="flex-1 px-5 py-6 sm:px-8 sm:py-8">
                  <div className="mx-auto max-w-3xl space-y-8">
                    <section className="rounded-2xl border border-border bg-surface-section p-5">
                      <h3 className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-text-primary">
                        <iconify-icon icon="solar:info-circle-linear" className="text-brand" /> Tổng quan
                      </h3>
                      <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
                        {selectedPartner.description}
                      </p>
                    </section>

                    <section className="rounded-2xl border border-border p-5">
                      <h3 className="mb-5 text-lg font-medium tracking-tight text-text-primary">Hành trình chuyển đổi</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border border-border bg-surface-section p-4">
                          <div className="mb-3 flex items-center gap-3">
                            <div className="ring-border flex h-8 w-8 items-center justify-center rounded-full bg-surface-card text-state-danger ring-1">
                              <iconify-icon icon="solar:danger-triangle-linear" width={18} />
                            </div>
                            <h4 className="text-sm font-semibold text-text-primary">Hiện trạng</h4>
                          </div>
                          <p className="text-sm leading-relaxed text-text-secondary">{selectedPartner.before}</p>
                        </div>

                        <div className="rounded-xl border border-brand bg-brand-soft/60 p-4">
                          <div className="mb-3 flex items-center gap-3">
                            <div className="ring-brand-ring flex h-8 w-8 items-center justify-center rounded-full bg-surface-card text-brand ring-1">
                              <iconify-icon icon="solar:magic-stick-3-linear" width={18} />
                            </div>
                            <h4 className="text-sm font-semibold text-text-primary">Giải pháp SunPrime</h4>
                          </div>
                          <p className="text-sm leading-relaxed text-text-secondary">{selectedPartner.solution}</p>
                        </div>
                      </div>
                    </section>

                    <section className="rounded-2xl border border-border bg-surface-section p-5">
                      <h3 className="mb-4 text-center text-xs font-medium uppercase tracking-widest text-text-muted">
                        Chỉ số tác động
                      </h3>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {selectedPartner.metrics.map((m) => (
                          <div key={m.label} className="rounded-xl border border-border bg-surface-card px-4 py-4 text-center">
                            <p className="text-xl font-semibold tracking-tight text-brand sm:text-2xl">{m.val}</p>
                            <p className="mt-1 text-xs font-medium text-text-secondary">{m.label}</p>
                          </div>
                        ))}
                      </div>
                    </section>

                    <div className="pb-2">
                      <button className="bg-button-primary text-button-text hover:bg-button-primary-hover focus-visible:outline-brand flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2">
                        Xem chi tiết case study
                        <iconify-icon icon="solar:arrow-right-linear" width={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default function PartnerShowcaseSection(props: PartnerShowcaseSectionProps) {
  return (
    <Suspense
      fallback={
        <div className="bg-surface-base py-12 text-text-primary selection:bg-brand-soft">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-card px-4 py-2 text-sm text-text-secondary">
              <iconify-icon icon="solar:refresh-linear" width={16} />
              Đang tải khách hàng...
            </div>
          </div>
        </div>
      }
    >
      <PartnerShowcaseSectionContent {...props} />
    </Suspense>
  );
}
