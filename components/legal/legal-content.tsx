"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n-provider";
import { LEGAL_UPDATED_AT, legalDocs, type LegalDocKey } from "@/data/legal";

export default function LegalContent({ docKey }: { docKey: LegalDocKey }) {
  const { lang } = useI18n();
  const doc = legalDocs[lang][docKey];
  const updatedLabel = lang === "vi" ? "Cập nhật lần cuối" : "Last updated";
  const backLabel = lang === "vi" ? "Về trang chủ" : "Back to home";
  const contactLabel = lang === "vi" ? "Liên hệ chúng tôi" : "Contact us";
  const updatedDate = new Intl.DateTimeFormat(lang === "vi" ? "vi-VN" : "en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(LEGAL_UPDATED_AT));

  return (
    <main className="bg-surface-base">
      <section className="relative overflow-hidden bg-linear-to-br from-brand via-brand-strong to-brand-ink py-20 text-text-inverse">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight lg:text-5xl">{doc.title}</h1>
          <p className="mt-4 text-sm text-white/80">
            {updatedLabel}: {updatedDate}
          </p>
        </div>
      </section>

      <section className="py-16">
        <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-lg leading-relaxed text-text-secondary">{doc.intro}</p>

          <div className="mt-10 space-y-10">
            {doc.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold tracking-tight text-text-primary">{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-3 text-base leading-relaxed text-text-secondary">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-text-secondary">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center rounded-lg border border-brand px-5 py-3 text-sm font-semibold text-brand transition-colors duration-200 hover:bg-brand-soft"
            >
              {backLabel}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-text-inverse transition-colors duration-200 hover:bg-brand-strong"
            >
              {contactLabel}
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
