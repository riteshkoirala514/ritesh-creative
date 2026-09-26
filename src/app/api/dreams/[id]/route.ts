import { NextRequest, NextResponse } from 'next/server';
import { toggleDream, deleteDream } from '@/lib/content';

type Props = { params: Promise<{ id: string }> };

export async function PUT(_req: NextRequest, { params }: Props) {
  const { id } = await params;
  await toggleDream(Number(id));
  return NextResponse.json({ success: true });
}

export async function DELETE(_req: NextRequest, { params }: Props) {
  const { id } = await params;
  await deleteDream(Number(id));
  return NextResponse.json({ success: true });
}
