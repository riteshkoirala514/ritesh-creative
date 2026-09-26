import { NextRequest, NextResponse } from 'next/server';
import { updateSeries, deleteSeries } from '@/lib/content';

type Props = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const data = await request.json();
  await updateSeries(Number(id), data);
  return NextResponse.json({ success: true });
}

export async function DELETE(_req: NextRequest, { params }: Props) {
  const { id } = await params;
  await deleteSeries(Number(id));
  return NextResponse.json({ success: true });
}
