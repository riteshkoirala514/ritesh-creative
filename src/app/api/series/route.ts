import { NextRequest, NextResponse } from 'next/server';
import { getAllSeries, createSeries } from '@/lib/content';

export async function GET() {
  return NextResponse.json(await getAllSeries());
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  await createSeries(data);
  return NextResponse.json({ success: true }, { status: 201 });
}
