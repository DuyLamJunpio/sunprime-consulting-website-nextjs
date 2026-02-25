type NewsApiItem = {
  news_id: string;
  title: string;
  content: string;
  is_published: boolean;
  published_at?: string | null;
  created_at?: string | null;
  is_pinned?: boolean | null;
  pinned_order?: number | null;
  image?: string | null;
  image_url?: string | null;
  thumbnail?: string | null;
  thumbnail_url?: string | null;
  cover_image?: string | null;
  coverImage?: string | null;
  featured_image?: string | null;
};

type NewsApiResponse = {
  errorCode: number;
  message: string;
  data: NewsApiItem[];
  hasMore?: boolean;
};

export type NewsPost = {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  tags: string[];
  image?: string;
  isPinned: boolean;
  pinnedOrder: number | null;
  publishedAt: string;
  readTime: string;
};

const NEWS_API_URL =
  process.env.SUNPRIME_NEWS_API_URL ?? 'http://localhost:2412/api/news';

const NEWS_API_TOKEN =
  process.env.SUNPRIME_NEWS_API_TOKEN ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0IiwiY29tcGFueUlkIjpudWxsLCJyb2xlSWQiOm51bGwsInVzZXJBY2Nlc3NUeXBlIjoiU1lTVEVNIiwiaWF0IjoxNzcwMzAyMDY0LCJleHAiOjE4NjAzMDIwNjR9.HdkCB7h5ytAdrnTZ7cIR9Ke2pkqiAxgF23Okw9O0ZK4';

const toSlug = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const estimateReadTime = (content: string) => {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 220));
  return `${minutes} phút đọc`;
};

const extractImage = (item: NewsApiItem) => {
  const candidates = [
    item.image,
    item.image_url,
    item.thumbnail,
    item.thumbnail_url,
    item.cover_image,
    item.coverImage,
    item.featured_image,
  ];

  const image = candidates.find((value) => typeof value === 'string' && value.trim().length > 0);
  return image?.trim();
};

const toNewsPost = (item: NewsApiItem): NewsPost => {
  const publishedAt = item.published_at ?? item.created_at ?? new Date().toISOString();
  const content = item.content?.trim() ?? '';
  const slugBase = toSlug(item.title || `tin-tuc-${item.news_id}`);

  return {
    id: item.news_id,
    slug: `${slugBase}-${item.news_id}`,
    title: item.title || 'Bài viết',
    content,
    excerpt: content.length > 180 ? `${content.slice(0, 177)}...` : content,
    category: 'Tin tức SunPrime',
    author: 'Ban biên tập SunPrime',
    tags: ['Tin tức'],
    image: extractImage(item),
    isPinned: Boolean(item.is_pinned),
    pinnedOrder: typeof item.pinned_order === 'number' ? item.pinned_order : null,
    publishedAt,
    readTime: estimateReadTime(content),
  };
};

export const fetchNewsPage = async (skip = 0, limit = 10) => {
  const url = `${NEWS_API_URL}?skip=${skip}&limit=${limit}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${NEWS_API_TOKEN}`,
      Accept: '*/*',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Không thể tải API news: ${response.status}`);
  }

  const payload = (await response.json()) as NewsApiResponse;
  const items = Array.isArray(payload.data) ? payload.data : [];

  return {
    posts: items
      .filter((item) => item.is_published)
      .map(toNewsPost),
    hasMore: Boolean(payload.hasMore),
  };
};

export const fetchAllNewsPosts = async () => {
  const allPosts: NewsPost[] = [];
  let skip = 0;
  const limit = 20;
  const maxPages = 10;

  for (let page = 0; page < maxPages; page += 1) {
    const { posts, hasMore } = await fetchNewsPage(skip, limit);
    allPosts.push(...posts);
    if (!hasMore) break;
    skip += limit;
  }

  return allPosts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
};
