import { fetchAllNewsPosts } from '@/data/news-api';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogDetailContent from '@/components/news/blog-detail-content';

type BlogDetailProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const posts = await fetchAllNewsPosts();
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: 'Bài viết',
      description: 'Chi tiết bài viết SunPrime.',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const posts = await fetchAllNewsPosts();
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = posts
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  return <BlogDetailContent post={post} relatedPosts={relatedPosts} />;
}
