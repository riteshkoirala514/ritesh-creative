import { NextRequest, NextResponse } from 'next/server';
import { updatePost, deletePost, getPostById } from '@/lib/content';

type Props = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Props) {
  const { id } = await params;
  const post = await getPostById(Number(id));
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const data = await request.json();
    await updatePost(Number(id), data);
    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Props) {
  const { id } = await params;
  await deletePost(Number(id));
  return NextResponse.json({ success: true });
}
