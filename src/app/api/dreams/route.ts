import { NextRequest, NextResponse } from 'next/server';
import { getDreams, createDream } from '@/lib/content';

export async function GET() {
  return NextResponse.json(await getDreams());
}

export async function POST(request: NextRequest) {
  const { text, category, image } = await request.json();
  await createDream(text, category, image);
  return NextResponse.json({ success: true }, { status: 201 });
}
