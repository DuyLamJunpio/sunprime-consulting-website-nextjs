import { newsArticles } from "@/data/news";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const article = newsArticles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="bg-white py-16">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Quay lại trang chủ
        </Link>

        <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">{article.date}</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-slate-900">{article.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">{article.subtitle}</p>

        <div className="relative mt-8 aspect-16/10 overflow-hidden rounded-2xl bg-slate-100">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 768px, 100vw"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-10 space-y-6 text-lg leading-relaxed text-slate-700">
          {article.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
