import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import os from 'os';
import path from 'path';

// Store outside the project directory to avoid triggering HMR
const subscribersFile = path.join(os.tmpdir(), 'ritesh-creative-subscribers.json');

function getSubscribers(): string[] {
  if (!fs.existsSync(subscribersFile)) {
    return [];
  }
  const data = fs.readFileSync(subscribersFile, 'utf-8');
  return JSON.parse(data);
}

function saveSubscribers(subscribers: string[]) {
  fs.writeFileSync(subscribersFile, JSON.stringify(subscribers, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const subscribers = getSubscribers();

    if (subscribers.includes(email)) {
      return NextResponse.json(
        { message: 'Already subscribed' },
        { status: 200 }
      );
    }

    subscribers.push(email);
    saveSubscribers(subscribers);

    return NextResponse.json(
      { message: 'Successfully subscribed' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
