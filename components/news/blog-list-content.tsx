"use client";

import type { NewsPost } from "@/data/news-api";
import { useI18n } from "@/components/i18n-provider";
import Image from "next/image";
import Link from "next/link";

type Props = {
  pinnedPosts: NewsPost[];
  latestPosts: NewsPost[];
  query: string;
  page: number;
  hasMore: boolean;
  isEmpty: boolean;
};

export default function BlogListContent({ pinnedPosts, latestPosts, query, page, hasMore, isEmpty }: Props) {
  const { lang } = useI18n();
  const vi = lang === "vi";

  const t = {
    eyebrow: vi ? "Chuyên mục SunPrime" : "SunPrime column",
    title: vi ? "Tạp chí SunPrime" : "SunPrime Magazine",
    desc: vi
      ? "Bản tin chiến lược về tài chính - kế toán - pháp lý cho doanh nghiệp đang tăng trưởng."
      : "Strategic briefings on finance, accounting and legal for growing businesses.",
    featured: vi ? "Bài viết nổi bật" : "Featured articles",
    pinnedCount: (n: number) => (vi ? `${n} bài ghim` : `${n} pinned`),
    pin: vi ? "Ghim" : "Pinned",
    noPinned: vi ? "Hiện chưa có bài viết ghim." : "No pinned articles yet.",
    listTitle: vi ? "Danh sách bài viết" : "Article list",
    articleCount: (n: number) => (vi ? `${n} bài viết` : `${n} article(s)`),
    searchPlaceholder: vi ? "Tìm kiếm bài viết..." : "Search articles...",
    search: vi ? "Tìm" : "Search",
    clearSearch: vi ? "Xóa tìm kiếm" : "Clear search",
    resultFor: vi ? "Kết quả cho từ khóa" : "Results for",
    noResults: vi
      ? "Không tìm thấy bài viết phù hợp với từ khóa hiện tại."
      : "No articles match the current keyword.",
    emptyAll: vi ? "Hiện chưa có bài viết để hiển thị." : "No articles to display yet.",
    prev: vi ? "Trang trước" : "Previous",
    next: vi ? "Trang sau" : "Next",
    pageLabel: vi ? `Trang ${page}` : `Page ${page}`,
    readTimeSuffix: vi ? "phút đọc" : "min read",
    justNow: vi ? "Vừa xong" : "Just now",
    minsAgo: (n: number) => (vi ? `${n} phút trước` : `${n} min ago`),
    hoursAgo: (n: number) => (vi ? `${n} giờ trước` : `${n} h ago`),
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

  const formatRelativeToday = (input: string) => {
    const published = new Date(input);
    const now = new Date();
    if (Number.isNaN(published.getTime())) return null;
    const fmtDay = (d: Date) =>
      new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Ho_Chi_Minh",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(d);
    if (fmtDay(published) !== fmtDay(now)) return null;
    const diffMin = Math.max(0, Math.floor((now.getTime() - published.getTime()) / 60000));
    if (diffMin < 1) return t.justNow;
    if (diffMin < 60) return t.minsAgo(diffMin);
    return t.hoursAgo(Math.floor(diffMin / 60));
  };

  const hasPrev = page > 1;
  const buildHref = (target: number) => {
    const search = new URLSearchParams();
    if (query) search.set("q", query);
    if (target > 1) search.set("page", String(target));
    const qs = search.toString();
    return qs ? `/blog?${qs}` : "/blog";
  };

  if (isEmpty) {
    return (
      <div className="rounded-[32px] border border-neutral-200 bg-white/85 px-6 py-10 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">{t.title}</h1>
        <p className="mt-3 text-sm text-neutral-500">{t.emptyAll}</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <header className="rounded-[36px] border border-neutral-200 bg-white/90 px-6 py-8 shadow-soft-lg lg:px-10">
        <div className="border-y border-neutral-200 py-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-neutral-400">{t.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 lg:text-5xl">{t.title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-neutral-500">{t.desc}</p>
        </div>
      </header>

      <section className="rounded-[32px] border border-neutral-200 bg-white/85 p-4 md:p-6">
        <div className="mb-4 flex items-center justify-between px-2">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">{t.featured}</h2>
          <span className="text-xs text-neutral-500">{t.pinnedCount(pinnedPosts.length)}</span>
        </div>
        {pinnedPosts.length > 0 ? (
          <div className="space-y-4">
            {pinnedPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-neutral-200 bg-neutral-50/70 p-4 transition hover:border-neutral-300"
              >
                <div className={`grid gap-4 ${post.image ? "md:grid-cols-[220px_1fr] md:items-center" : ""}`}>
                  {post.image && (
                    <div className="relative h-36 overflow-hidden rounded-xl md:h-32">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 220px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                      <span className="inline-flex items-center rounded-full border border-neutral-300 bg-white px-2 py-0.5 font-semibold text-neutral-600">
                        {t.pin} #{index + 1}
                      </span>
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>•</span>
                      <span>{readTime(post.readTime)}</span>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold leading-snug text-neutral-900">{post.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-neutral-500">{post.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="px-2 pb-2 text-sm text-neutral-500">{t.noPinned}</p>
        )}
      </section>

      <section className="rounded-[32px] border border-neutral-200 bg-white/85 p-4 md:p-6">
        <div className="mb-5 border-b border-neutral-200 px-2 pb-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">{t.listTitle}</h2>
            <span className="text-xs text-neutral-500">{t.articleCount(latestPosts.length)}</span>
          </div>
          <div className="mt-4 flex flex-col gap-3 md:flex-row">
            <form action="/blog" method="get" className="flex flex-1 items-center gap-2 rounded-full border border-neutral-300 bg-white px-3 py-2">
              <iconify-icon icon="solar:magnifer-linear" width={18} className="text-neutral-400" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder={t.searchPlaceholder}
                className="w-full bg-transparent text-sm text-neutral-700 outline-none placeholder:text-neutral-400"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center rounded-full bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white"
              >
                {t.search}
              </button>
            </form>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-600 hover:border-neutral-900 hover:text-neutral-900"
            >
              {t.clearSearch}
            </Link>
          </div>
        </div>

        {query && (
          <p className="mb-4 px-2 text-sm text-neutral-500">
            {t.resultFor}: &ldquo;{query}&rdquo;
          </p>
        )}

        <div className="grid gap-4">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-neutral-200 bg-neutral-50/60 p-4 transition hover:border-neutral-300 hover:bg-neutral-50"
            >
              <div className={`grid gap-4 ${post.image ? "md:grid-cols-[180px_1fr] md:items-center" : ""}`}>
                {post.image && (
                  <div className="relative h-32 overflow-hidden rounded-xl md:h-28">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 180px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                    <span>{formatDate(post.publishedAt)}</span>
                    {formatRelativeToday(post.publishedAt) && (
                      <>
                        <span>•</span>
                        <span className="font-medium text-neutral-600">{formatRelativeToday(post.publishedAt)}</span>
                      </>
                    )}
                    <span>•</span>
                    <span>{readTime(post.readTime)}</span>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-neutral-900 group-hover:text-neutral-700">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500">{post.excerpt}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {latestPosts.length === 0 && <p className="px-2 pt-2 text-sm text-neutral-500">{t.noResults}</p>}

        <div className="mt-6 flex items-center justify-between border-t border-neutral-200 px-2 pt-4">
          <Link
            href={hasPrev ? buildHref(page - 1) : "#"}
            className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium ${
              hasPrev
                ? "border-neutral-300 text-neutral-700 hover:border-neutral-900"
                : "pointer-events-none border-neutral-200 text-neutral-400"
            }`}
          >
            {t.prev}
          </Link>
          <span className="text-sm text-neutral-500">{t.pageLabel}</span>
          <Link
            href={hasMore ? buildHref(page + 1) : "#"}
            className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium ${
              hasMore
                ? "border-neutral-300 text-neutral-700 hover:border-neutral-900"
                : "pointer-events-none border-neutral-200 text-neutral-400"
            }`}
          >
            {t.next}
          </Link>
        </div>
      </section>
    </div>
  );
}
