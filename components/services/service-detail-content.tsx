"use client";

import Link from "next/link";
import { getServiceBySlug, getServiceCategories } from "@/data/services";
import { useI18n } from "@/components/i18n-provider";
import { messages } from "@/lib/i18n/messages";

export default function ServiceDetailContent({ slug }: { slug: string }) {
  const { lang } = useI18n();
  const t = messages[lang].services;
  const service = getServiceBySlug(slug, lang);

  if (!service) return null;

  const category = getServiceCategories(lang).find((item) => item.id === service.categoryId);
  const relatedServices =
    category?.services.filter((item) => item.slug !== service.slug).slice(0, 3) ?? [];

  const fitSegments =
    lang === "vi"
      ? [
          `Doanh nghiệp đang cần triển khai ${service.title.toLowerCase()} theo đúng quy định.`,
          "Đội ngũ muốn có quy trình rõ ràng, deadline minh bạch và người phụ trách cụ thể.",
          "Chủ doanh nghiệp cần báo cáo dễ hiểu để ra quyết định nhanh và hạn chế rủi ro.",
        ]
      : [
          `Businesses that need to deploy ${service.title.toLowerCase()} in line with regulations.`,
          "Teams that want a clear process, transparent deadlines and a specific owner.",
          "Owners who need easy-to-read reports to decide fast and limit risk.",
        ];

  const faqItems =
    lang === "vi"
      ? [
          {
            question: `Dịch vụ "${service.title}" thường triển khai trong bao lâu?`,
            answer:
              "Sau buổi khảo sát đầu tiên, SunPrime sẽ gửi timeline chi tiết theo từng mốc công việc. Các đầu việc ưu tiên được triển khai trước để doanh nghiệp nhìn thấy kết quả sớm.",
          },
          {
            question: "Có thể dùng riêng dịch vụ này mà không cần gói tổng thể không?",
            answer:
              "Có. Bạn có thể sử dụng độc lập từng dịch vụ hoặc kết hợp nhiều dịch vụ liên quan. Chúng tôi sẽ đề xuất phương án phù hợp với quy mô và giai đoạn của doanh nghiệp.",
          },
          {
            question: "SunPrime có hỗ trợ làm việc với cơ quan nhà nước khi cần không?",
            answer:
              "Có. Tùy phạm vi hợp tác, chúng tôi hỗ trợ chuẩn bị hồ sơ, giải trình và đồng hành cùng doanh nghiệp trong các buổi làm việc cần thiết.",
          },
          {
            question: "Tôi sẽ nhận được báo cáo theo hình thức nào?",
            answer:
              "Báo cáo được bàn giao định kỳ qua file và/hoặc dashboard theo nhu cầu, kèm phần giải thích ngắn gọn để đội ngũ nội bộ dễ theo dõi và hành động.",
          },
        ]
      : [
          {
            question: `How long does the "${service.title}" service usually take to deploy?`,
            answer:
              "After the first survey, SunPrime sends a detailed timeline by work milestone. Priority tasks are deployed first so the business sees results early.",
          },
          {
            question: "Can I use this service on its own without the full package?",
            answer:
              "Yes. You can use each service independently or combine related ones. We will propose an option that fits your business's scale and stage.",
          },
          {
            question: "Does SunPrime support working with government authorities when needed?",
            answer:
              "Yes. Depending on the scope, we help prepare dossiers, provide explanations and accompany your business in the necessary working sessions.",
          },
          {
            question: "In what form will I receive reports?",
            answer:
              "Reports are delivered periodically via files and/or a dashboard as needed, with a short explanation so your internal team can easily follow and act.",
          },
        ];

  const testimonial =
    lang === "vi"
      ? {
          quote:
            "“Đội ngũ SunPrime vào việc rất nhanh, báo cáo rõ ràng và luôn chủ động nhắc mốc quan trọng. Chúng tôi giảm hẳn áp lực vận hành và yên tâm tập trung tăng trưởng.”",
          name: "Khách hàng SunPrime",
          role: "Founder chuỗi F&B tại TP.HCM",
        }
      : {
          quote:
            "“The SunPrime team got to work fast, reported clearly and always proactively flagged key milestones. We cut operational pressure significantly and could focus on growth.”",
          name: "A SunPrime client",
          role: "Founder of an F&B chain in HCMC",
        };

  return (
    <main className="bg-surface-base">
      <section className="relative overflow-hidden bg-linear-to-br from-brand via-brand-strong to-brand-ink py-24 text-text-inverse">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,#f0d8c2_0,transparent_55%),radial-gradient(circle_at_bottom_left,#e4c9ae_0,transparent_45%)]" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.22)_1px,transparent_1px)] bg-size-[36px_36px] opacity-[0.16]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/80">
            <Link href="/services" className="transition hover:text-white">
              {t.breadcrumb}
            </Link>
            <span>•</span>
            <span>{service.categoryTitle}</span>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="inline-flex rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                {service.categoryTitle}
              </span>
              <h1 className="mt-4 max-w-5xl text-4xl font-semibold tracking-tight lg:text-5xl">{service.title}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/80">{service.heroDescription}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="tel:+84914699877"
                  className="inline-flex items-center gap-2 rounded-lg bg-surface-base px-6 py-3 text-sm font-semibold text-brand transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-soft"
                >
                  {t.consultFree}
                  <iconify-icon icon="solar:phone-linear" width={16} />
                </a>
                <a
                  href="mailto:giangtran.sunprime@gmail.com"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20"
                >
                  {t.getProposal}
                  <iconify-icon icon="solar:letter-linear" width={16} />
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/25 bg-white/10 p-5 backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">{t.serviceMetrics}</p>
              <div className="mt-4 grid gap-3">
                {service.stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/20 bg-white/10 px-4 py-4 transition hover:bg-white/20">
                    <p className="text-2xl font-semibold text-white">{stat.value}</p>
                    <p className="mt-1 text-sm text-white/80">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.quickPoints.map((point) => (
              <div
                key={point}
                className="flex items-start gap-2 rounded-xl border border-border bg-surface-section px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-ring hover:bg-surface-card"
              >
                <iconify-icon icon="solar:check-circle-bold" width={16} className="mt-0.5 text-brand" />
                <span className="text-sm text-text-secondary">{point}</span>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-border bg-surface-card p-6 lg:p-8">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-text-muted">{t.fitEyebrow}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary">{t.fitTitle}</h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {fitSegments.map((segment, index) => (
                <div
                  key={segment}
                  className="rounded-2xl border border-border bg-surface-section p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-ring hover:bg-surface-card"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-xs font-semibold text-text-inverse">
                    {index + 1}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{segment}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
            <div className="rounded-3xl border border-border bg-surface-card p-6 lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-text-muted">{t.scopeEyebrow}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary">{t.scopeTitle}</h2>
              <ul className="mt-6 space-y-3">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-border bg-surface-section px-4 py-3 transition-all duration-300 hover:border-brand-ring"
                  >
                    <span className="mt-2 inline-flex h-2 w-2 rounded-full bg-brand" />
                    <p className="text-sm text-text-secondary">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-brand-ring bg-brand-soft/55 p-6">
              <p className="text-sm font-semibold text-text-primary">{t.valueTitle}</p>
              <ul className="mt-4 space-y-3">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5">
                    <iconify-icon icon="solar:check-circle-bold-duotone" width={18} className="mt-0.5 text-brand" />
                    <span className="text-sm leading-relaxed text-text-secondary">{benefit}</span>
                  </li>
                ))}
              </ul>

              {service.documents && (
                <div className="mt-6 rounded-2xl border border-dashed border-brand-ring bg-surface-card p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-text-muted">{t.documentsTitle}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {service.documents.map((doc) => (
                      <span key={doc} className="inline-flex rounded-full border border-border bg-surface-section px-3 py-1 text-xs text-text-secondary">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-linear-to-br from-section-grad-start via-section-grad-mid to-section-grad-end py-14">
        <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border bg-surface-card p-6 lg:p-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-text-muted">{t.processLabel}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary">{t.processTitle}</h2>
              </div>
              <p className="hidden text-sm text-text-muted lg:block">{t.processNote}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {service.process.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-border bg-surface-section p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-ring hover:bg-surface-card"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-ring text-sm font-semibold text-brand">
                    {index + 1}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-text-primary">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-surface-card p-6 lg:p-8">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-text-muted">{t.faqEyebrow}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary">{t.faqTitle}</h2>
            </div>
            <div className="space-y-3">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-2xl border border-border bg-surface-section p-4 transition hover:border-brand-ring">
                  <p className="text-sm font-semibold text-text-primary">{item.question}</p>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-brand bg-brand px-6 py-8 text-text-inverse shadow-[0_20px_45px_rgba(156,90,52,0.26)] lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">{t.bookingEyebrow}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">{service.title}</h2>
                <p className="mt-4 text-sm text-white/80">{t.bookingDesc}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="tel:+84914699877"
                    className="inline-flex items-center gap-2 rounded-lg bg-surface-base px-5 py-3 text-sm font-semibold text-brand transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-soft"
                  >
                    {t.consultFree}
                    <iconify-icon icon="solar:phone-linear" width={16} />
                  </Link>
                  <a
                    href="mailto:giangtran.sunprime@gmail.com"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20"
                  >
                    {t.getProposal}
                    <iconify-icon icon="solar:letter-linear" width={16} />
                  </a>
                </div>
              </div>
              <div className="rounded-2xl border border-white/25 bg-white/10 p-6 backdrop-blur">
                <p className="text-sm text-white/80">{testimonial.quote}</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/75" />
                  <div>
                    <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                    <p className="text-xs text-white/80">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {relatedServices.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-text-muted">{t.relatedTitle}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-text-primary">{t.fitTitle}</h3>
                </div>
                <Link href="/services" className="text-sm font-medium text-text-secondary transition hover:text-brand">
                  {t.viewCaseStudy} →
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {relatedServices.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/services/${item.slug}`}
                    className="rounded-2xl border border-border bg-surface-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-ring hover:bg-surface-section"
                  >
                    <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                    <p className="mt-2 text-sm text-text-secondary">{item.shortDescription}</p>
                    <span className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-[0.3em] text-brand">
                      {t.viewDetail}
                      <iconify-icon icon="solar:arrow-right-up-linear" width={14} className="ml-2" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
