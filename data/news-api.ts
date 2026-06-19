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

// Base URL của backend. Mặc định trỏ thẳng về API production (api.sunprime.vn).
// Override khi cần (vd dev local: SUNPRIME_API_BASE_URL=http://localhost:2412).
const API_BASE_URL = (process.env.SUNPRIME_API_BASE_URL ?? 'https://api.sunprime.vn').replace(
  /\/$/,
  ''
);

const NEWS_API_URL =
  process.env.SUNPRIME_NEWS_API_URL ?? `${API_BASE_URL}/api/news/landing`;

// Token TUỲ CHỌN — endpoint news production là public, không cần token.
// Chỉ set SUNPRIME_NEWS_API_TOKEN khi backend yêu cầu (vd backend nội bộ khi dev).
const NEWS_API_TOKEN = process.env.SUNPRIME_NEWS_API_TOKEN;

const buildNewsHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = { Accept: '*/*' };
  if (NEWS_API_TOKEN) {
    headers.Authorization = `Bearer ${NEWS_API_TOKEN}`;
  }
  return headers;
};

const toSlug = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

// Content từ API là HTML — bóc tag để lấy text thuần cho excerpt và đếm chữ.
const stripHtml = (html: string) =>
  html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

const estimateReadTime = (plainText: string) => {
  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
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
  const content = item.content?.trim() ?? ''; // HTML thô, dùng render trang chi tiết
  const plainText = stripHtml(content); // text thuần cho excerpt / read time
  const slugBase = toSlug(item.title || `tin-tuc-${item.news_id}`);
  const pinnedOrderRaw = Number(item.pinned_order);

  return {
    id: item.news_id,
    slug: `${slugBase}-${item.news_id}`,
    title: item.title || 'Bài viết',
    content,
    excerpt: plainText.length > 180 ? `${plainText.slice(0, 177)}...` : plainText,
    category: 'Tin tức SunPrime',
    author: 'Ban biên tập SunPrime',
    tags: ['Tin tức'],
    image: extractImage(item),
    isPinned: Boolean(item.is_pinned),
    pinnedOrder: Number.isFinite(pinnedOrderRaw) ? pinnedOrderRaw : null,
    publishedAt,
    readTime: estimateReadTime(plainText),
  };
};

export const fetchNewsPage = async (skip = 0) => {
  const url = `${NEWS_API_URL}?skip=${skip}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: buildNewsHeaders(),
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

const TOP_NEWS_URL =
  process.env.SUNPRIME_TOP_NEWS_API_URL ?? `${API_BASE_URL}/api/news/landing/top-news`;

export const fetchTopNews = async (): Promise<NewsPost[]> => {
  try {
    const response = await fetch(TOP_NEWS_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${NEWS_API_TOKEN}`,
        Accept: '*/*',
      },
      cache: 'no-store',
    });

    if (!response.ok) return [];

    const payload = (await response.json()) as NewsApiResponse;
    const items = Array.isArray(payload.data) ? payload.data : [];

    return items.filter((item) => item.is_published).map(toNewsPost);
  } catch {
    return [];
  }
};

const PAGE_SIZE = 12;

export const fetchAllNewsPosts = async () => {
  const allPosts: NewsPost[] = [];
  let skip = 0;
  const maxPages = 10;

  for (let page = 0; page < maxPages; page += 1) {
    const { posts, hasMore } = await fetchNewsPage(skip);
    allPosts.push(...posts);
    if (!hasMore) break;
    skip += PAGE_SIZE;
  }

  return allPosts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
};
