"use client";

import type { NewsPost } from "@/data/news-api";
import { useI18n } from "@/components/i18n-provider";
import Image from "next/image";
import Link from "next/link";

type Props = {
  post: NewsPost;
  relatedPosts: NewsPost[];
};

export default function BlogDetailContent({ post, relatedPosts }: Props) {
  const { lang } = useI18n();
  const vi = lang === "vi";

  const t = {
    breadcrumbNews: vi ? "Tin tức" : "News",
    keyPoints: vi ? "Điểm chính" : "Key points",
    pointCategory: vi
      ? "Bài viết thuộc chuyên mục tin tức doanh nghiệp."
      : "This article belongs to the business news column.",
    pointApi: vi ? "Nội dung được cập nhật từ hệ thống." : "Content updated from the system.",
    tags: vi ? "Thẻ bài viết" : "Tags",
    needAdvice: vi ? "Cần tư vấn?" : "Need advice?",
    talkExpert: vi ? "Trao đổi với chuyên gia SunPrime" : "Talk to a SunPrime expert",
    talkDesc: vi
      ? "Gửi câu hỏi hoặc nhu cầu, đội ngũ sẽ liên hệ lại trong vòng 24 giờ."
      : "Send your question or needs and our team will get back within 24 hours.",
    contactNow: vi ? "Liên hệ ngay" : "Contact now",
    relatedTitle: vi ? "Bài viết liên quan" : "Related articles",
    viewAll: vi ? "Xem tất cả bài viết" : "View all articles",
    updating: vi ? "Nội dung đang được cập nhật." : "Content is being updated.",
    readTimeSuffix: vi ? "phút đọc" : "min read",
  };

  const localizedCategory = (category: string) =>
    category === "Tin tức SunPrime" && !vi ? "SunPrime News" : category;
  const localizedAuthor =
    post.author === "Ban biên tập SunPrime" && !vi ? "SunPrime Editorial" : post.author;

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

  return (
    <article className="space-y-8">
      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.35em] text-neutral-400">
        <Link href="/blog" className="hover:text-neutral-900">
          Blog
        </Link>
        <span>•</span>
        <span>{t.breadcrumbNews}</span>
      </div>

      <header className="rounded-[36px] border border-neutral-200 bg-white/90 p-6 shadow-soft-lg lg:p-10">
        <div className="rounded-3xl bg-neutral-100 p-6 md:p-10">
          {post.image && (
            <div className="relative mb-6 h-56 overflow-hidden rounded-2xl md:h-80">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover"
              />
            </div>
          )}
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">{localizedCategory(post.category)}</p>
          <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-neutral-900 md:text-5xl">{post.title}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-600 md:text-base">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap gap-3 text-xs text-neutral-500">
            <span>{localizedAuthor}</span>
            <span>•</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span>•</span>
            <span>{readTime(post.readTime)}</span>
          </div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.5fr_0.75fr]">
        <div className="rounded-[32px] border border-neutral-200 bg-white/85 p-6 lg:p-8">
          <div
            className="prose-news space-y-4 text-sm leading-relaxed text-neutral-700 md:text-base"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          {!post.content && (
            <p className="text-sm leading-relaxed text-neutral-500 md:text-base">{t.updating}</p>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-[28px] border border-neutral-200 bg-white/85 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">{t.keyPoints}</p>
            <ul className="mt-4 space-y-3">
              {[post.excerpt, t.pointCategory, t.pointApi].map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-neutral-600">
                  <span className="mt-2 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[28px] border border-neutral-200 bg-white/85 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">{t.tags}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex rounded-full border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-neutral-200 bg-neutral-900 p-5 text-neutral-50">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">{t.needAdvice}</p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight">{t.talkExpert}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-300">{t.talkDesc}</p>
            <a
              href="mailto:giangtran.sunprime@gmail.com"
              className="mt-4 inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-900"
            >
              {t.contactNow}
              <iconify-icon icon="solar:arrow-right-linear" width={14} className="ml-2" />
            </a>
          </div>
        </aside>
      </section>

      <section className="rounded-[32px] border border-neutral-200 bg-white/85 p-6">
        <div className="mb-5 flex items-end justify-between border-b border-neutral-200 pb-4">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">{t.relatedTitle}</h2>
          <Link href="/blog" className="text-sm font-medium text-neutral-500 hover:text-neutral-900">
            {t.viewAll}
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {relatedPosts.map((item) => (
            <Link
              key={item.slug}
              href={`/blog/${item.slug}`}
              className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-4 transition hover:border-neutral-300"
            >
              {item.image && (
                <div className="relative mb-3 h-32 overflow-hidden rounded-xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 30vw"
                    className="object-cover"
                  />
                </div>
              )}
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">{localizedCategory(item.category)}</p>
              <h3 className="mt-2 text-lg font-semibold leading-snug text-neutral-900">{item.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-neutral-500">{item.excerpt}</p>
              <p className="mt-3 text-xs text-neutral-500">
                {formatDate(item.publishedAt)} • {readTime(item.readTime)}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
