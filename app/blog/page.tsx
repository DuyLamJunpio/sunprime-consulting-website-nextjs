import { fetchNewsPage } from '@/data/news-api';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog SunPrime',
  description:
    'Chuyên mục Blog SunPrime chia sẻ kiến thức tài chính, kế toán, pháp lý và vận hành cho doanh nghiệp.',
};

const formatDate = (input: string) =>
  new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(input));

const formatRelativeToday = (input: string) => {
  const published = new Date(input);
  const now = new Date();
  if (Number.isNaN(published.getTime())) return null;

  const formatDay = (date: Date) =>
    new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);

  const publishedDay = formatDay(published);
  const today = formatDay(now);
  if (publishedDay !== today) return null;

  const diffMinutes = Math.max(0, Math.floor((now.getTime() - published.getTime()) / (1000 * 60)));
  if (diffMinutes < 1) return 'Vừa xong';
  if (diffMinutes < 60) return `${diffMinutes} phút trước`;
  const diffHours = Math.floor(diffMinutes / 60);
  return `${diffHours} giờ trước`;
};

const normalizeText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();

type BlogPageProps = {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const query = (params.q ?? '').trim();
  const page = Math.max(1, Number.parseInt(params.page ?? '1', 10) || 1);
  const limit = 10;
  const skip = (page - 1) * limit;

  const { posts: apiPosts, hasMore } = await fetchNewsPage(skip, limit);
  const visiblePosts = apiPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const pinnedPosts = visiblePosts
    .filter((post) => post.isPinned)
    .sort((a, b) => (a.pinnedOrder ?? 999) - (b.pinnedOrder ?? 999));

  const remainingPosts = visiblePosts.filter((post) => !post.isPinned);
  const normalizedQuery = normalizeText(query);

  const latestPosts = query
    ? remainingPosts.filter((post) => {
      const searchable = normalizeText(
        `${post.title} ${post.excerpt} ${post.category} ${post.author} ${post.tags.join(' ')}`
      );
      return searchable.includes(normalizedQuery);
    })
    : remainingPosts;

  const hasPrev = page > 1;
  const hasNext = hasMore;
  const buildHref = (targetPage: number) => {
    const search = new URLSearchParams();
    if (query) search.set('q', query);
    if (targetPage > 1) search.set('page', String(targetPage));
    const queryString = search.toString();
    return queryString ? `/blog?${queryString}` : '/blog';
  };

  if (visiblePosts.length === 0) {
    return (
      <div className="rounded-[32px] border border-neutral-200 bg-white/85 px-6 py-10 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">Blog SunPrime</h1>
        <p className="mt-3 text-sm text-neutral-500">Hiện chưa có bài viết để hiển thị.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <header className="rounded-[36px] border border-neutral-200 bg-white/90 px-6 py-8 shadow-xl shadow-neutral-200/50 lg:px-10">
        <div className="border-y border-neutral-200 py-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-neutral-400">Chuyên mục SunPrime</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 lg:text-5xl">Tạp chí SunPrime</h1>
          <p className="mt-3 text-sm leading-relaxed text-neutral-500">
            Bản tin chiến lược về tài chính - kế toán - pháp lý cho doanh nghiệp đang tăng trưởng.
          </p>
        </div>
      </header>

      <section className="rounded-[32px] border border-neutral-200 bg-white/85 p-4 md:p-6">
        <div className="mb-4 flex items-center justify-between px-2">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">Bài viết nổi bật</h2>
          <span className="text-xs text-neutral-500">{pinnedPosts.length} bài ghim</span>
        </div>
        {pinnedPosts.length > 0 ? (
          <div className="space-y-4">
            {pinnedPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-neutral-200 bg-neutral-50/70 p-4 transition hover:border-neutral-300"
              >
                <div className={`grid gap-4 ${post.image ? 'md:grid-cols-[220px_1fr] md:items-center' : ''}`}>
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
                        Ghim #{index + 1}
                      </span>
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold leading-snug text-neutral-900">{post.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-neutral-500">{post.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="px-2 pb-2 text-sm text-neutral-500">Hiện chưa có bài viết ghim.</p>
        )}
      </section>

      <section className="rounded-[32px] border border-neutral-200 bg-white/85 p-4 md:p-6">
        <div className="mb-5 border-b border-neutral-200 px-2 pb-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">Danh sách bài viết</h2>
            <span className="text-xs text-neutral-500">{latestPosts.length} bài viết</span>
          </div>
          <div className="mt-4 flex flex-col gap-3 md:flex-row">
            <form action="/blog" method="get" className="flex flex-1 items-center gap-2 rounded-full border border-neutral-300 bg-white px-3 py-2">
              <iconify-icon icon="solar:magnifer-linear" width={18} className="text-neutral-400" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Tìm kiếm bài viết..."
                className="w-full bg-transparent text-sm text-neutral-700 outline-none placeholder:text-neutral-400"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center rounded-full bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white"
              >
                Tìm
              </button>
            </form>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-600 hover:border-neutral-900 hover:text-neutral-900"
            >
              Xóa tìm kiếm
            </Link>
          </div>
        </div>

        {query && (
          <p className="mb-4 px-2 text-sm text-neutral-500">Kết quả cho từ khóa: "{query}"</p>
        )}

        <div className="grid gap-4">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-neutral-200 bg-neutral-50/60 p-4 transition hover:border-neutral-300 hover:bg-neutral-50"
            >
              <div className={`grid gap-4 ${post.image ? 'md:grid-cols-[180px_1fr] md:items-center' : ''}`}>
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
                    <span>{post.readTime}</span>
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

        {latestPosts.length === 0 && (
          <p className="px-2 pt-2 text-sm text-neutral-500">Không tìm thấy bài viết phù hợp với từ khóa hiện tại.</p>
        )}

        <div className="mt-6 flex items-center justify-between border-t border-neutral-200 px-2 pt-4">
          <Link
            href={hasPrev ? buildHref(page - 1) : '#'}
            className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium ${
              hasPrev
                ? 'border-neutral-300 text-neutral-700 hover:border-neutral-900'
                : 'pointer-events-none border-neutral-200 text-neutral-400'
            }`}
          >
            Trang trước
          </Link>
          <span className="text-sm text-neutral-500">Trang {page}</span>
          <Link
            href={hasNext ? buildHref(page + 1) : '#'}
            className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium ${
              hasNext
                ? 'border-neutral-300 text-neutral-700 hover:border-neutral-900'
                : 'pointer-events-none border-neutral-200 text-neutral-400'
            }`}
          >
            Trang sau
          </Link>
        </div>
      </section>
    </div>
  );
}
