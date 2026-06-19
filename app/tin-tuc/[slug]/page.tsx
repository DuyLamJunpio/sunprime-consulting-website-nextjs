import { fetchAllNewsPosts } from '@/data/news-api';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { absoluteUrl, siteConfig } from '@/lib/site';
import NewsDetailContent from '@/components/news/news-detail-content';

type NewsDetailProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: NewsDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const posts = await fetchAllNewsPosts();
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return { title: 'Tin tức', description: 'Chi tiết tin tức SunPrime.' };
  }

  const canonical = `/tin-tuc/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonical,
      type: 'article',
      publishedTime: post.publishedAt,
      images: post.image ? [{ url: post.image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailProps) {
  const { slug } = await params;
  const posts = await fetchAllNewsPosts();
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = posts.filter((item) => item.slug !== post.slug).slice(0, 4);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.excerpt,
    image: post.image ? [post.image] : [absoluteUrl(siteConfig.ogImage)],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { '@type': 'Organization', name: post.author || siteConfig.name },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: absoluteUrl(siteConfig.logo) },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(`/tin-tuc/${post.slug}`) },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <NewsDetailContent post={post} relatedPosts={relatedPosts} />
    </>
  );
}
