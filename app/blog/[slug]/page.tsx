import { fetchAllNewsPosts } from '@/data/news-api';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type BlogDetailProps = {
  params: Promise<{ slug: string }>;
};

const formatDate = (input: string) =>
  new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(input));

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

  const paragraphs = post.content
    .split(/\n+/)
    .map((text) => text.trim())
    .filter(Boolean);

  return (
    <article className="space-y-8">
      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.35em] text-neutral-400">
        <Link href="/blog" className="hover:text-neutral-900">
          Blog
        </Link>
        <span>•</span>
        <span>Tin tức</span>
      </div>

      <header className="rounded-[36px] border border-neutral-200 bg-white/90 p-6 shadow-xl shadow-neutral-200/50 lg:p-10">
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
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">{post.category}</p>
          <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-neutral-900 md:text-5xl">{post.title}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-600 md:text-base">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap gap-3 text-xs text-neutral-500">
            <span>Ban biên tập SunPrime</span>
            <span>•</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.5fr_0.75fr]">
        <div className="rounded-[32px] border border-neutral-200 bg-white/85 p-6 lg:p-8">
          <div className="space-y-4">
            {paragraphs.map((paragraph, index) => (
              <p key={`${post.id}-${index}`} className="text-sm leading-relaxed text-neutral-700 md:text-base">
                {paragraph}
              </p>
            ))}
            {paragraphs.length === 0 && (
              <p className="text-sm leading-relaxed text-neutral-700 md:text-base">{post.content}</p>
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[28px] border border-neutral-200 bg-white/85 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">Điểm chính</p>
            <ul className="mt-4 space-y-3">
              {[post.excerpt, 'Bài viết thuộc chuyên mục tin tức doanh nghiệp.', 'Nội dung được cập nhật từ hệ thống API.'].map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-neutral-600">
                  <span className="mt-2 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[28px] border border-neutral-200 bg-white/85 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">Thẻ bài viết</p>
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
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">Cần tư vấn?</p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight">Trao đổi với chuyên gia SunPrime</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-300">
              Gửi câu hỏi hoặc nhu cầu, đội ngũ sẽ liên hệ lại trong vòng 24 giờ.
            </p>
            <a
              href="mailto:hello@sunprime.consulting"
              className="mt-4 inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-900"
            >
              Liên hệ ngay
              <iconify-icon icon="solar:arrow-right-linear" width={14} className="ml-2" />
            </a>
          </div>
        </aside>
      </section>

      <section className="rounded-[32px] border border-neutral-200 bg-white/85 p-6">
        <div className="mb-5 flex items-end justify-between border-b border-neutral-200 pb-4">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">Bài viết liên quan</h2>
          <Link href="/blog" className="text-sm font-medium text-neutral-500 hover:text-neutral-900">
            Xem tất cả bài viết
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
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">{item.category}</p>
              <h3 className="mt-2 text-lg font-semibold leading-snug text-neutral-900">{item.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-neutral-500">{item.excerpt}</p>
              <p className="mt-3 text-xs text-neutral-500">
                {formatDate(item.publishedAt)} • {item.readTime}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
