import { fetchTopNews } from '@/data/news-api';
import Image from 'next/image';
import Link from 'next/link';

const FALLBACK_NEWS_IMAGE = '/images/no-image-news.svg';

const formatDate = (input: string) =>
  new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(input));

export default async function HomeNewsSection() {
  const articles = await fetchTopNews();

  if (articles.length === 0) return null;

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-3xl">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-text-primary">Bản tin SunPrime</h2>
            <p className="text-base text-text-secondary">
              Cập nhật các bài viết mới về kế toán, pháp lý và vận hành doanh nghiệp từ đội ngũ SunPrime.
            </p>
          </div>
          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-2 rounded-lg border border-brand px-4 py-2 text-sm font-semibold text-brand transition-all duration-200 hover:bg-brand-soft"
          >
            Xem tất cả
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {articles.slice(0, 8).map((article) => (
            <Link
              key={article.slug}
              href={`/tin-tuc/${article.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-border bg-surface-base p-4 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-brand-ring hover:shadow-[0_20px_38px_rgba(156,90,52,0.18)]"
            >
              <div className="relative mb-5 aspect-16/10 overflow-hidden rounded-xl bg-surface-section">
                <Image
                  src={article.image || FALLBACK_NEWS_IMAGE}
                  alt={article.image ? article.title : `Không có ảnh - ${article.title}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
                {formatDate(article.publishedAt)}
              </p>
              <h3 className="text-lg font-bold leading-snug text-text-primary transition-colors duration-300 group-hover:text-brand">
                {article.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-muted">{article.excerpt}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-brand transition-all duration-300 group-hover:translate-x-1">
                Đọc tiếp
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
