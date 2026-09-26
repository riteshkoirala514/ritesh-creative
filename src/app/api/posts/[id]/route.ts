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

    // Map form field names to DB column names
    const dbData: Record<string, unknown> = {};
    if (data.title !== undefined) dbData.title = data.title;
    if (data.slug !== undefined) dbData.slug = data.slug;
    if (data.description !== undefined) dbData.description = data.description;
    if (data.content !== undefined) dbData.content = data.content;
    if (data.date !== undefined) dbData.date = data.date;
    if (data.category !== undefined) dbData.category = data.category;
    if (data.format !== undefined) dbData.format = data.format;
    if (data.image !== undefined) dbData.image = data.image;
    if (data.thumbnail !== undefined) dbData.thumbnail = data.thumbnail;
    if (data.images !== undefined) dbData.images = data.images ? JSON.stringify(data.images) : null;
    if (data.video !== undefined) dbData.video = data.video ? JSON.stringify(data.video) : null;
    if (data.featured !== undefined) dbData.featured = data.featured ? 1 : 0;
    if (data.draft !== undefined) dbData.draft = data.draft ? 1 : 0;
    if (data.series !== undefined) dbData.series_slug = data.series || null;
    if (data.tags !== undefined) dbData.tags = data.tags ? JSON.stringify(data.tags) : null;
    if (data.readTime !== undefined) dbData.read_time = data.readTime || null;
    if (data.role !== undefined) dbData.role = data.role || null;
    if (data.location !== undefined) dbData.location = data.location || null;
    if (data.connection !== undefined) dbData.connection = data.connection || null;
    if (data.peopleType !== undefined) dbData.people_type = data.peopleType || 'network';

    await updatePost(Number(id), dbData);
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
