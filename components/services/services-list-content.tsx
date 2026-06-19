"use client";

import Link from "next/link";
import { getServiceCategories } from "@/data/services";
import { useI18n } from "@/components/i18n-provider";
import { messages } from "@/lib/i18n/messages";

export default function ServicesListContent() {
  const { lang } = useI18n();
  const t = messages[lang].services;
  const serviceCategories = getServiceCategories(lang);

  const totalServices = serviceCategories.reduce((sum, category) => sum + category.services.length, 0);
  const totalProcesses = serviceCategories.reduce(
    (sum, category) => sum + category.services.reduce((inner, service) => inner + service.process.length, 0),
    0
  );
  const totalDeliverables = serviceCategories.reduce(
    (sum, category) => sum + category.services.reduce((inner, service) => inner + service.deliverables.length, 0),
    0
  );

  const overviewStats = [
    { label: t.statGroups, value: `${serviceCategories.length}` },
    { label: t.statPackages, value: `${totalServices}+` },
    { label: t.statDeliverables, value: `${totalDeliverables}+` },
    { label: t.statSteps, value: `${totalProcesses}+` },
  ];

  return (
    <main className="bg-surface-base">
      <section className="relative overflow-hidden bg-linear-to-br from-brand via-brand-strong to-brand-ink py-24 text-text-inverse">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,#f0d8c2_0,transparent_55%),radial-gradient(circle_at_bottom_left,#e4c9ae_0,transparent_45%)]" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.22)_1px,transparent_1px)] bg-size-[36px_36px] opacity-[0.16]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="mb-4 inline-flex rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            SunPrime Services
          </span>
          <h1 className="max-w-5xl text-4xl font-semibold leading-tight tracking-tight lg:text-5xl">{t.heroTitle}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/80">{t.heroDesc}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="tel:+84914699877"
              className="inline-flex items-center gap-2 rounded-lg bg-surface-base px-6 py-3 text-sm font-semibold text-brand transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-soft"
            >
              {t.consultNow}
              <iconify-icon icon="solar:phone-linear" width={16} />
            </Link>
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20"
            >
              {t.viewCaseStudy}
              <iconify-icon icon="solar:arrow-right-up-linear" width={16} />
            </Link>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {overviewStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/25 bg-white/10 px-4 py-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
              >
                <p className="text-2xl font-semibold">{stat.value}</p>
                <p className="mt-1 text-sm text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-base py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-text-muted">{t.catalogEyebrow}</p>
            <h2 className="text-3xl font-semibold tracking-tight text-text-primary lg:text-4xl">{t.catalogTitle}</h2>
            <p className="max-w-3xl text-base leading-relaxed text-text-secondary">{t.catalogDesc}</p>
          </div>

          <div className="mt-10 space-y-10">
            {serviceCategories.map((category, categoryIndex) => (
              <article
                key={category.id}
                id={category.id}
                className="group rounded-3xl border border-border bg-surface-card p-5 shadow-sm transition-all duration-300 hover:border-brand-ring hover:shadow-[0_18px_40px_rgba(156,90,52,0.12)] lg:p-8"
              >
                <div className="mb-6 flex flex-col gap-5 border-b border-border pb-6 md:flex-row md:items-start md:justify-between">
                  <div>
                    <span className="inline-flex items-center rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
                      {t.group} {categoryIndex + 1}
                    </span>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-text-primary">{category.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{category.summary}</p>
                    <p className="mt-1 text-sm leading-relaxed text-text-muted">{category.description}</p>
                  </div>
                  <span
                    className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${category.accent} text-text-primary ring-1 ring-white/60 transition-all duration-300 group-hover:scale-110`}
                  >
                    <iconify-icon icon={category.icon} width={26} />
                  </span>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  {category.services.map((service) => (
                    <div
                      key={service.slug}
                      className="rounded-2xl border border-border bg-surface-section p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-ring hover:bg-surface-card hover:shadow-[0_16px_28px_rgba(156,90,52,0.12)]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-lg font-semibold leading-snug text-text-primary">{service.title}</h4>
                          <p className="mt-2 text-sm leading-relaxed text-text-secondary">{service.shortDescription}</p>
                        </div>
                        <Link
                          href={`/services/${service.slug}`}
                          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand bg-brand-soft text-brand transition-all duration-200 hover:bg-brand hover:text-text-inverse"
                          aria-label={`${t.viewDetail} ${service.title}`}
                        >
                          <iconify-icon icon="solar:arrow-right-linear" width={18} />
                        </Link>
                      </div>

                      <p className="mt-4 rounded-xl border border-border bg-surface-card px-3 py-2 text-sm leading-relaxed text-text-muted">
                        {service.heroDescription}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {service.stats.map((stat) => (
                          <span
                            key={`${service.slug}-${stat.label}`}
                            className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-text-secondary"
                          >
                            {stat.label}: <strong className="ml-1 font-semibold text-text-primary">{stat.value}</strong>
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl bg-brand-soft/60 p-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-brand">{t.keyBenefits}</p>
                          <ul className="mt-2 space-y-1.5 text-sm text-text-secondary">
                            {service.benefits.slice(0, 2).map((benefit) => (
                              <li key={benefit} className="flex items-start gap-2">
                                <iconify-icon icon="solar:verified-check-linear" width={16} className="mt-0.5 text-brand" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-xl bg-surface-card p-3 ring-1 ring-border">
                          <p className="text-xs font-semibold uppercase tracking-wide text-text-primary">{t.deliverables}</p>
                          <ul className="mt-2 space-y-1.5 text-sm text-text-secondary">
                            {service.deliverables.slice(0, 2).map((deliverable) => (
                              <li key={deliverable} className="flex items-start gap-2">
                                <iconify-icon icon="solar:file-check-linear" width={16} className="mt-0.5 text-brand" />
                                <span>{deliverable}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-4 rounded-xl border border-dashed border-brand-ring bg-white p-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-brand">{t.processLabel}</p>
                        <ol className="mt-2 flex flex-wrap gap-2">
                          {service.process.map((step, index) => (
                            <li
                              key={`${service.slug}-${step.title}`}
                              className="inline-flex items-center rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand"
                              title={step.description}
                            >
                              {index + 1}. {step.title}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-linear-to-br from-section-grad-start via-section-grad-mid to-section-grad-end py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="rounded-3xl border border-border bg-surface-card p-7 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-text-muted">{t.collabEyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary">{t.collabTitle}</h2>
              <div className="mt-8 space-y-4">
                {t.collabSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="flex gap-3 rounded-2xl border border-border bg-surface-section p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-ring"
                  >
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-semibold text-text-inverse">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{step.title}</p>
                      <p className="mt-1 text-sm text-text-secondary">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-brand bg-brand px-6 py-7 text-text-inverse shadow-[0_20px_40px_rgba(156,90,52,0.28)]">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">{t.readyEyebrow}</p>
              <h3 className="mt-3 text-2xl font-semibold">{t.readyTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80">{t.readyDesc}</p>
              <div className="mt-6 space-y-3">
                <a
                  href="mailto:giangtran.sunprime@gmail.com"
                  className="flex items-center justify-between rounded-2xl border border-white/35 bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/20"
                >
                  giangtran.sunprime@gmail.com
                  <iconify-icon icon="solar:arrow-right-up-linear" width={16} />
                </a>
                <a
                  href="https://zalo.me/0914699877"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-white/35 bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/20"
                >
                  Zalo: 0914 699 877
                  <iconify-icon icon="solar:chat-round-bold" width={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
