import { NextRequest, NextResponse } from 'next/server';
import { createPost, getAllPostsAdmin } from '@/lib/content';

export async function GET() {
  const posts = await getAllPostsAdmin();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    await createPost(data);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
