"use client";

import Link from "next/link";
import ConsultationForm from "@/components/consultation-form";
import { useI18n } from "@/components/i18n-provider";

const copy = {
  vi: {
    title: "Bạn cần tư vấn ngay?",
    description:
      "Đội ngũ SunPrime sẵn sàng hỗ trợ doanh nghiệp về pháp lý, kế toán và vận hành với lộ trình rõ ràng, minh bạch ngay từ đầu.",
    button: "Nhận tư vấn miễn phí",
  },
  en: {
    title: "Need advice right now?",
    description:
      "The SunPrime team is ready to support your business in legal, accounting and operations with a clear, transparent roadmap from the start.",
    button: "Get a free consultation",
  },
} as const;

/** Khối CTA "Bạn cần tư vấn ngay?" (nút tới /contact + form tư vấn), dùng ở trang chủ và các trang dịch vụ. */
export default function ConsultationCtaSection() {
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <section className="relative overflow-hidden bg-brand">
      <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.24)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.24)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          <div className="w-full py-20 lg:w-1/2 lg:py-28">
            <span className="mb-6 inline-flex items-center rounded-full bg-state-success px-3 py-1 text-xs font-semibold tracking-wide text-text-inverse">
              SunPrime Consulting
            </span>
            <h2 className="mb-6 text-4xl font-semibold tracking-tight text-text-inverse lg:text-5xl">{t.title}</h2>
            <p className="mb-10 text-lg font-normal text-text-inverse">{t.description}</p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-transparent bg-button-text-dark px-8 py-3.5 text-base font-semibold text-text-inverse transition-all duration-200 hover:bg-text-primary hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-border-strong focus:ring-offset-2"
            >
              {t.button}
            </Link>
          </div>

          <div className="w-full pb-20 lg:w-1/2 lg:py-20">
            <ConsultationForm />
          </div>
        </div>
      </div>
    </section>
  );
}
