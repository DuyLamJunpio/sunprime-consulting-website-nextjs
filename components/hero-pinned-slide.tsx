'use client';

import type { NewsPost } from '@/data/news-api';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

const FALLBACK_NEWS_IMAGE = '/images/no-image-news.svg';

const formatDate = (input: string) =>
  new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(input));

export default function HeroPinnedSlide({ posts }: { posts: NewsPost[] }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = posts.length;
  const next = useCallback(() => setIdx((i) => (i + 1) % total), [total]);

  useEffect(() => {
    if (total <= 1 || paused) return;
    const id = window.setInterval(next, 4500);
    return () => window.clearInterval(id);
  }, [total, paused, next]);

  if (total === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded-3xl border border-white/15 bg-white/[0.07] p-8 text-sm text-white/40">
        Chưa có tin nổi bật.
      </div>
    );
  }

  const current = idx % total;
  const post = posts[current];

  return (
    <div
      className="group/slide relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/15 bg-white/[0.07] backdrop-blur-md transition-all duration-500 hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.08)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Link href={`/tin-tuc/${post.slug}`} className="flex flex-1 flex-col">
        <div className="relative h-52 shrink-0 overflow-hidden sm:h-56">
          <Image
            src={post.image || FALLBACK_NEWS_IMAGE}
            alt={post.image ? post.title : `Không có ảnh - ${post.title}`}
            fill
            sizes="(max-width: 1024px) 100vw, 500px"
            className="object-cover transition-transform duration-700 group-hover/slide:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

          <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-brand/50 bg-brand/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand backdrop-blur-sm">
            <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
            Nổi bật
          </div>

          <div className="absolute bottom-4 right-4 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white/70 backdrop-blur-sm">
            {current + 1} / {total}
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-white/90 transition-colors duration-200 group-hover/slide:text-brand-ring">
              {post.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/60">
              {post.excerpt}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="flex items-center gap-2 text-[11px] text-white/50">
              <span>{formatDate(post.publishedAt)}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand transition-all duration-300 group-hover/slide:gap-2">
              Đọc thêm
              <iconify-icon icon="solar:arrow-right-linear" width={14} />
            </span>
          </div>
        </div>
      </Link>

      {total > 1 && (
        <div className="flex items-center justify-between border-t border-white/10 px-5 py-3">
          <div className="flex items-center gap-1.5">
            {posts.map((_, i) => (
              <button
                key={posts[i].id}
                type="button"
                aria-label={`Tin nổi bật ${i + 1}`}
                onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === current
                    ? 'w-7 bg-brand shadow-[0_0_8px_rgba(217,119,6,0.5)]'
                    : 'w-1.5 bg-white/25 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIdx((i) => (i - 1 + total) % total)}
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/20 text-white/50 transition hover:border-white/40 hover:text-white"
              aria-label="Trước"
            >
              <iconify-icon icon="solar:arrow-left-linear" width={14} />
            </button>
            <button
              type="button"
              onClick={next}
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/20 text-white/50 transition hover:border-white/40 hover:text-white"
              aria-label="Tiếp"
            >
              <iconify-icon icon="solar:arrow-right-linear" width={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
