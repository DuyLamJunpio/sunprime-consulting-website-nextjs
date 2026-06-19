import { fetchNewsPage } from '@/data/news-api';
import type { Metadata } from 'next';
import BlogListContent from '@/components/news/blog-list-content';

export const metadata: Metadata = {
  title: 'Blog SunPrime',
  description:
    'Chuyên mục Blog SunPrime chia sẻ kiến thức tài chính, kế toán, pháp lý và vận hành cho doanh nghiệp.',
  alternates: { canonical: '/blog' },
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
  const pageSize = 12;
  const skip = (page - 1) * pageSize;

  const { posts: apiPosts, hasMore } = await fetchNewsPage(skip);
  const visiblePosts = apiPosts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

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

  return (
    <BlogListContent
      pinnedPosts={pinnedPosts}
      latestPosts={latestPosts}
      query={query}
      page={page}
      hasMore={hasMore}
      isEmpty={visiblePosts.length === 0}
    />
  );
}
