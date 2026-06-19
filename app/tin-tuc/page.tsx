import NewsListContent from '@/components/news/news-list-content';
import { fetchNewsPage } from '@/data/news-api';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tin tức SunPrime',
  description: 'Cập nhật các tin nổi bật, kiến thức và thông tin mới nhất từ SunPrime.',
  alternates: { canonical: '/tin-tuc' },
};

type NewsPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number.parseInt(params.page ?? '1', 10) || 1);
  const pageSize = 12;
  const skip = (page - 1) * pageSize;

  const [{ posts: currentPagePosts, hasMore }, { posts: pinnedSourcePosts }] = await Promise.all([
    fetchNewsPage(skip),
    fetchNewsPage(0),
  ]);

  const pinnedPosts = pinnedSourcePosts
    .filter((post) => post.isPinned)
    .sort((a, b) => (a.pinnedOrder ?? 999) - (b.pinnedOrder ?? 999))
    .slice(0, 4);

  return (
    <NewsListContent posts={currentPagePosts} pinnedPosts={pinnedPosts} page={page} hasMore={hasMore} />
  );
}
