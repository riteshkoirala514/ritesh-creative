import { NextRequest, NextResponse } from 'next/server';
import { getProfile, updateProfile } from '@/lib/content';

export async function GET() {
  return NextResponse.json(await getProfile());
}

export async function PUT(request: NextRequest) {
  const data = await request.json();
  await updateProfile(data);
  return NextResponse.json({ success: true });
}
