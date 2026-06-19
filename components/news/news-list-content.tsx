"use client";

import HeroPinnedSlide from "@/components/hero-pinned-slide";
import type { NewsPost } from "@/data/news-api";
import { useI18n } from "@/components/i18n-provider";
import Image from "next/image";
import Link from "next/link";

const FALLBACK_NEWS_IMAGE = "/images/no-image-news.svg";

type Props = {
  posts: NewsPost[];
  pinnedPosts: NewsPost[];
  page: number;
  hasMore: boolean;
};

export default function NewsListContent({ posts, pinnedPosts, page, hasMore }: Props) {
  const { lang } = useI18n();
  const vi = lang === "vi";

  const t = {
    heroTitle: vi
      ? "Cập nhật tin tức, góc nhìn vận hành và thông tin mới nhất."
      : "The latest news, operational insights and updates.",
    heroDesc: vi
      ? "Tổng hợp bản tin chiến lược về tài chính, kế toán, pháp lý và vận hành từ đội ngũ SunPrime."
      : "Strategic briefings on finance, accounting, legal and operations from the SunPrime team.",
    consultNow: vi ? "Nhận tư vấn ngay" : "Get advice now",
    viewServices: vi ? "Xem dịch vụ" : "View services",
    allNews: vi ? "Tất cả tin tức" : "All news",
    listTitle: vi ? "Danh sách bài viết" : "Article list",
    showing: vi
      ? `Hiển thị ${posts.length} tin tức trên trang ${page}.`
      : `Showing ${posts.length} article(s) on page ${page}.`,
    empty: vi
      ? "Chưa có tin tức ở trang này. Bạn có thể chuyển trang để xem thêm."
      : "No articles on this page. Try another page to see more.",
    prev: vi ? "Trang trước" : "Previous",
    next: vi ? "Trang sau" : "Next",
    pageLabel: vi ? `Trang ${page}` : `Page ${page}`,
    readTimeSuffix: vi ? "phút đọc" : "min read",
    noImage: vi ? "Không có ảnh" : "No image",
  };

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

  const hasPrev = page > 1;
  const buildHref = (target: number) => (target > 1 ? `/tin-tuc?page=${target}` : "/tin-tuc");

  return (
    <main className="bg-surface-base">
      <section className="relative overflow-hidden bg-linear-to-br from-brand via-brand-strong to-brand-ink text-text-inverse">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,#f0d8c2_0,transparent_55%),radial-gradient(circle_at_bottom_left,#e4c9ae_0,transparent_45%)]" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.22)_1px,transparent_1px)] bg-size-[36px_36px] opacity-[0.16]" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div>
              <span className="mb-4 inline-flex rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                SunPrime Newsroom
              </span>
              <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight lg:text-5xl">
                {t.heroTitle}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 lg:text-lg">{t.heroDesc}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="tel:+84914699877"
                  className="inline-flex items-center gap-2 rounded-lg bg-surface-base px-6 py-3 text-sm font-semibold text-brand transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-soft"
                >
                  {t.consultNow}
                  <iconify-icon icon="solar:phone-linear" width={16} />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20"
                >
                  {t.viewServices}
                  <iconify-icon icon="solar:arrow-right-up-linear" width={16} />
                </Link>
              </div>
            </div>

            <HeroPinnedSlide posts={pinnedPosts} />
          </div>
        </div>
      </section>

      <section className="bg-linear-to-br from-section-grad-start via-section-grad-mid to-section-grad-end py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-text-muted">{t.allNews}</p>
            <h2 className="text-3xl font-semibold tracking-tight text-text-primary lg:text-4xl">{t.listTitle}</h2>
            <p className="max-w-3xl text-base leading-relaxed text-text-secondary">{t.showing}</p>
          </div>

          {posts.length > 0 ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/tin-tuc/${post.slug}`}
                  className="group rounded-3xl border border-border bg-surface-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-ring hover:shadow-[0_16px_28px_rgba(156,90,52,0.12)]"
                >
                  <div className="relative h-44 overflow-hidden rounded-2xl bg-surface-section">
                    <Image
                      src={post.image || FALLBACK_NEWS_IMAGE}
                      alt={post.image ? post.title : `${t.noImage} - ${post.title}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="mt-4 line-clamp-2 text-lg font-semibold leading-snug text-text-primary group-hover:text-brand">
                    {post.title}
                  </h4>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">{post.excerpt}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-text-muted">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span>•</span>
                    <span>{readTime(post.readTime)}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-8 text-sm text-text-secondary">{t.empty}</p>
          )}

          <div className="mt-10 flex items-center justify-between">
            <Link
              href={hasPrev ? buildHref(page - 1) : "#"}
              className={`inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                hasPrev
                  ? "border border-border bg-surface-card text-text-primary hover:border-brand-ring"
                  : "pointer-events-none border border-border bg-surface-section text-text-muted"
              }`}
            >
              <iconify-icon icon="solar:arrow-left-linear" width={16} />
              {t.prev}
            </Link>
            <span className="rounded-full border border-border bg-surface-card px-4 py-2 text-sm font-medium text-text-secondary">
              {t.pageLabel}
            </span>
            <Link
              href={hasMore ? buildHref(page + 1) : "#"}
              className={`inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                hasMore
                  ? "bg-brand text-text-inverse hover:bg-brand-strong"
                  : "pointer-events-none border border-border bg-surface-section text-text-muted"
              }`}
            >
              {t.next}
              <iconify-icon icon="solar:arrow-right-linear" width={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
