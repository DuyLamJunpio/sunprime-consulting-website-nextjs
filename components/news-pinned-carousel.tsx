'use client';

import type { NewsPost } from '@/data/news-api';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

type NewsPinnedCarouselProps = {
  posts: NewsPost[];
};

const FALLBACK_NEWS_IMAGE = '/images/no-image-news.svg';

const formatDate = (input: string) =>
  new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(input));

export default function NewsPinnedCarousel({ posts }: NewsPinnedCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => setActiveIndex((prev) => (prev + 1) % posts.length), [posts.length]);
  const prev = useCallback(() => setActiveIndex((prev) => (prev - 1 + posts.length) % posts.length), [posts.length]);

  useEffect(() => {
    if (posts.length <= 1 || isPaused) return;
    const intervalId = window.setInterval(next, 5000);
    return () => window.clearInterval(intervalId);
  }, [posts.length, isPaused, next]);

  if (posts.length === 0) {
    return (
      <div className="rounded-3xl border border-border bg-surface-section px-6 py-10 text-center">
        <p className="text-sm text-text-muted">Hiện chưa có tin nổi bật.</p>
      </div>
    );
  }

  const idx = activeIndex % posts.length;
  const post = posts[idx];

  return (
    <div
      className="space-y-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Link
        href={`/tin-tuc/${post.slug}`}
        className="group relative block overflow-hidden rounded-3xl border border-brand/20 bg-brand-ink transition-all duration-500 hover:shadow-brand-glow"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand/10 blur-3xl transition-all duration-700 group-hover:bg-brand/20 group-hover:blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-60 w-60 rounded-full bg-brand-ring/10 blur-3xl transition-all duration-700 group-hover:bg-brand-ring/20" />

        <div className="relative grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full lg:min-h-[380px]">
            <Image
              src={post.image || FALLBACK_NEWS_IMAGE}
              alt={post.image ? post.title : `Không có ảnh - ${post.title}`}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-brand-ink/80 max-lg:hidden" />
            <div className="absolute inset-0 bg-linear-to-t from-brand-ink/70 to-transparent lg:hidden" />
          </div>

          <div className="relative flex flex-col justify-center p-7 md:p-10">
            <div className="mb-5 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand backdrop-blur-sm">
                <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
                Nổi bật
              </span>
              <span className="text-xs text-white/50">
                {idx + 1} / {posts.length}
              </span>
            </div>

            <h3 className="text-2xl font-semibold leading-snug tracking-tight text-white transition-colors duration-300 group-hover:text-brand-ring md:text-3xl lg:text-4xl">
              {post.title}
            </h3>

            <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-white/65 md:text-base">
              {post.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/45">
              <span className="inline-flex items-center gap-1.5">
                <iconify-icon icon="solar:calendar-linear" width={14} />
                {formatDate(post.publishedAt)}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <iconify-icon icon="solar:clock-circle-linear" width={14} />
                {post.readTime}
              </span>
            </div>

            <div className="mt-8">
              <span className="inline-flex items-center gap-2 rounded-lg border border-brand/30 bg-brand/10 px-4 py-2.5 text-sm font-semibold text-brand transition-all duration-300 group-hover:border-brand/60 group-hover:bg-brand/20 group-hover:shadow-brand-glow">
                Đọc bài viết
                <iconify-icon icon="solar:arrow-right-linear" width={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {posts.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Chuyển đến tin ghim ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === idx
                  ? 'w-10 bg-brand shadow-[0_0_10px_rgba(217,119,6,0.5)]'
                  : 'w-2 bg-border-strong hover:bg-brand/50'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-card text-text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-ring hover:text-brand hover:shadow-[0_0_16px_rgba(217,119,6,0.15)]"
            aria-label="Tin ghim trước"
          >
            <iconify-icon icon="solar:arrow-left-linear" width={18} />
          </button>
          <button
            type="button"
            onClick={next}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-card text-text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-ring hover:text-brand hover:shadow-[0_0_16px_rgba(217,119,6,0.15)]"
            aria-label="Tin ghim tiếp theo"
          >
            <iconify-icon icon="solar:arrow-right-linear" width={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
