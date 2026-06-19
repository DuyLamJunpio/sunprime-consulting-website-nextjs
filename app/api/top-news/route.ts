import { fetchTopNews } from '@/data/news-api';
import { NextResponse } from 'next/server';

export async function GET() {
  const posts = await fetchTopNews();
  return NextResponse.json(posts);
}
