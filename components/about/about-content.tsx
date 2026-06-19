"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n-provider";
import { messages } from "@/lib/i18n/messages";

const valueIcons = ["target", "shield", "layers", "eye", "handshake"] as const;

const renderValueIcon = (icon: string) => {
  switch (icon) {
    case "target":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="1.5" />
        </svg>
      );
    case "shield":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "layers":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="m12 3 9 5-9 5-9-5 9-5z" />
          <path d="m3 12 9 5 9-5" />
          <path d="m3 16 9 5 9-5" />
        </svg>
      );
    case "eye":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M7 11h10" />
          <path d="M12 7v8" />
          <path d="M5 3h14a2 2 0 0 1 2 2v14l-4-2-5 2-5-2-4 2V5a2 2 0 0 1 2-2z" />
        </svg>
      );
  }
};

export default function AboutContent() {
  const { lang } = useI18n();
  const t = messages[lang].about;

  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-br from-brand via-brand-strong to-brand-ink py-24 text-text-inverse">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,#f0d8c2_0,transparent_55%),radial-gradient(circle_at_bottom_left,#e4c9ae_0,transparent_45%)]" />
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:36px_36px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="mb-4 inline-flex rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            {t.eyebrow}
          </span>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight lg:text-5xl">{t.mottoTitle}</h1>
          <div className="mt-6 flex flex-wrap gap-3">
            {t.mottos.map((motto) => (
              <span
                key={motto}
                className="inline-flex items-center rounded-full border border-white/40 bg-white/15 px-4 py-2 text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/25"
              >
                {motto}
              </span>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/80">{t.heroDesc}</p>
          <div className="mt-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-lg bg-surface-base px-6 py-3 text-sm font-semibold text-brand transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-soft"
            >
              {t.ctaServices}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface-base py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-semibold tracking-tight text-text-primary lg:text-4xl">{t.aboutTitle}</h2>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">{t.aboutBody}</p>
          </div>
        </div>
      </section>

      <section className="bg-surface-base py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-text-primary lg:text-4xl">{t.visionMissionTitle}</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-surface-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
              <h3 className="text-xl font-semibold text-brand">{t.visionTitle}</h3>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">{t.visionBody}</p>
            </article>
            <article className="rounded-2xl border border-border bg-surface-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
              <h3 className="text-xl font-semibold text-brand">{t.missionTitle}</h3>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">{t.missionBody}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-linear-to-br from-section-grad-start via-section-grad-mid to-section-grad-end py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-text-primary lg:text-4xl">{t.coreValuesTitle}</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-secondary">{t.coreValuesDesc}</p>
          <div className="relative mt-10">
            <div className="absolute left-0 right-0 top-10 hidden h-[2px] bg-linear-to-r from-transparent via-brand-ring to-transparent lg:block" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {t.coreValues.map((value, index) => (
                <article
                  key={value.title}
                  className="group relative rounded-2xl border border-border bg-surface-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-ring hover:shadow-soft-lg"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-text-inverse">
                    {renderValueIcon(valueIcons[index] ?? "handshake")}
                  </div>
                  <h3 className="text-base font-semibold leading-snug text-text-primary">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{value.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-text-inverse transition-all duration-200 hover:bg-brand-strong"
            >
              {t.ctaContact}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
