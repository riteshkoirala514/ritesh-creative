import { NextRequest, NextResponse } from 'next/server';
import { addSubscriber } from '@/lib/content';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const added = await addSubscriber(email);

    return NextResponse.json(
      { message: added ? 'Successfully subscribed' : 'Already subscribed' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
