"use client";

import type { NewsPost } from "@/data/news-api";
import { useI18n } from "@/components/i18n-provider";
import Image from "next/image";
import Link from "next/link";

const FALLBACK_NEWS_IMAGE = "/images/no-image-news.svg";

type Props = {
  post: NewsPost;
  relatedPosts: NewsPost[];
};

export default function NewsDetailContent({ post, relatedPosts }: Props) {
  const { lang } = useI18n();
  const vi = lang === "vi";

  const t = {
    breadcrumbNews: vi ? "Tin tức" : "News",
    breadcrumbDetail: vi ? "Chi tiết bài viết" : "Article",
    updating: vi ? "Nội dung đang được cập nhật." : "Content is being updated.",
    info: vi ? "Thông tin" : "Information",
    needAdvice: vi ? "Cần tư vấn?" : "Need advice?",
    talkExpert: vi ? "Trao đổi với chuyên gia SunPrime" : "Talk to a SunPrime expert",
    talkDesc: vi
      ? "Gửi câu hỏi hoặc nhu cầu, đội ngũ sẽ liên hệ lại trong vòng 24 giờ."
      : "Send your question or needs and our team will get back within 24 hours.",
    contactNow: vi ? "Liên hệ ngay" : "Contact now",
    backToList: vi ? "Quay lại danh sách tin tức" : "Back to all news",
    readMoreEyebrow: vi ? "Đọc thêm" : "Read more",
    relatedTitle: vi ? "Tin liên quan" : "Related articles",
    viewAll: vi ? "Xem tất cả" : "View all",
    noImage: vi ? "Không có ảnh" : "No image",
    readTimeSuffix: vi ? "phút đọc" : "min read",
  };

  // category/author là nhãn cố định do code sinh (không phải từ API) → dịch theo ngôn ngữ.
  const localizedCategory = post.category === "Tin tức SunPrime" && !vi ? "SunPrime News" : post.category;
  const localizedAuthor = post.author === "Ban biên tập SunPrime" && !vi ? "SunPrime Editorial" : post.author;

  const formatDate = (input: string) =>
    new Intl.DateTimeFormat(vi ? "vi-VN" : "en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(input));

  const readTime = (raw: string) => {
    const minutes = parseInt(raw, 10);
    return Number.isFinite(minutes) ? `${minutes} ${t.readTimeSuffix}` : raw;
  };

  const localizedRelatedCategory = (category: string) =>
    category === "Tin tức SunPrime" && !vi ? "SunPrime News" : category;

  return (
    <main className="bg-surface-base">
      <section className="relative overflow-hidden bg-linear-to-br from-brand via-brand-strong to-brand-ink text-text-inverse">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,#f0d8c2_0,transparent_55%),radial-gradient(circle_at_bottom_left,#e4c9ae_0,transparent_45%)]" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.22)_1px,transparent_1px)] bg-size-[36px_36px] opacity-[0.16]" />

        <div className="relative mx-auto max-w-5xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/50">
            <Link href="/tin-tuc" className="transition hover:text-white">{t.breadcrumbNews}</Link>
            <iconify-icon icon="solar:arrow-right-linear" width={12} />
            <span className="text-white/70">{t.breadcrumbDetail}</span>
          </nav>

          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand backdrop-blur-sm">
            {localizedCategory}
          </span>

          <h1 className="mt-2 max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 lg:text-lg">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/50">
            <span className="inline-flex items-center gap-1.5">
              <iconify-icon icon="solar:user-linear" width={15} />
              {localizedAuthor}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <iconify-icon icon="solar:calendar-linear" width={15} />
              {formatDate(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <iconify-icon icon="solar:clock-circle-linear" width={15} />
              {readTime(post.readTime)}
            </span>
          </div>
        </div>
      </section>

      <div className="relative mx-auto -mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative h-64 overflow-hidden rounded-3xl border border-border bg-surface-section shadow-xl sm:h-80 md:h-[420px]">
          <Image
            src={post.image || FALLBACK_NEWS_IMAGE}
            alt={post.image ? post.title : `${t.noImage} - ${post.title}`}
            fill
            sizes="(max-width: 1024px) 100vw, 960px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
            <article className="rounded-3xl border border-border bg-surface-card p-6 shadow-sm md:p-10">
              <div
                className="prose-news space-y-5 text-base leading-[1.85] text-text-secondary"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              {!post.content && <p className="text-base leading-[1.85] text-text-muted">{t.updating}</p>}

              <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex rounded-full border border-border bg-surface-section px-3 py-1 text-xs font-medium text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-border bg-surface-card p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-text-muted">{t.info}</p>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-center gap-3 text-sm text-text-secondary">
                    <iconify-icon icon="solar:user-linear" width={16} className="text-brand" />
                    {localizedAuthor}
                  </li>
                  <li className="flex items-center gap-3 text-sm text-text-secondary">
                    <iconify-icon icon="solar:calendar-linear" width={16} className="text-brand" />
                    {formatDate(post.publishedAt)}
                  </li>
                  <li className="flex items-center gap-3 text-sm text-text-secondary">
                    <iconify-icon icon="solar:clock-circle-linear" width={16} className="text-brand" />
                    {readTime(post.readTime)}
                  </li>
                  <li className="flex items-center gap-3 text-sm text-text-secondary">
                    <iconify-icon icon="solar:tag-linear" width={16} className="text-brand" />
                    {localizedCategory}
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-brand bg-brand px-5 py-6 text-text-inverse shadow-brand-glow">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">{t.needAdvice}</p>
                <h3 className="mt-2 text-lg font-semibold">{t.talkExpert}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{t.talkDesc}</p>
                <a
                  href="mailto:giangtran.sunprime@gmail.com"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-surface-base px-4 py-2.5 text-sm font-semibold text-brand transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-soft"
                >
                  {t.contactNow}
                  <iconify-icon icon="solar:arrow-right-linear" width={14} />
                </a>
              </div>

              <Link
                href="/tin-tuc"
                className="flex items-center gap-2 rounded-3xl border border-border bg-surface-card px-5 py-4 text-sm font-semibold text-text-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-ring"
              >
                <iconify-icon icon="solar:arrow-left-linear" width={16} />
                {t.backToList}
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="bg-linear-to-br from-section-grad-start via-section-grad-mid to-section-grad-end py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-text-muted">{t.readMoreEyebrow}</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary">{t.relatedTitle}</h2>
              </div>
              <Link
                href="/tin-tuc"
                className="hidden items-center gap-1 text-sm font-medium text-text-muted transition hover:text-brand sm:inline-flex"
              >
                {t.viewAll}
                <iconify-icon icon="solar:arrow-right-linear" width={14} />
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {relatedPosts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/tin-tuc/${item.slug}`}
                  className="group rounded-3xl border border-border bg-surface-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-ring hover:shadow-[0_16px_28px_rgba(156,90,52,0.1)]"
                >
                  <div className="relative h-40 overflow-hidden rounded-2xl bg-surface-section">
                    <Image
                      src={item.image || FALLBACK_NEWS_IMAGE}
                      alt={item.image ? item.title : `${t.noImage} - ${item.title}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-text-muted">
                    {localizedRelatedCategory(item.category)}
                  </p>
                  <h3 className="mt-2 line-clamp-2 text-base font-semibold leading-snug text-text-primary group-hover:text-brand">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">{item.excerpt}</p>
                  <p className="mt-3 text-xs text-text-muted">
                    {formatDate(item.publishedAt)} • {readTime(item.readTime)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
