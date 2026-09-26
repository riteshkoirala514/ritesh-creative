import { NextRequest, NextResponse } from 'next/server';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'ritesh-creative-secret-key';
const COOKIE_NAME = 'admin_token';
const TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

async function verifyToken(token: string): Promise<boolean> {
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [timestamp, hash] = parts;

  // Verify hash using Web Crypto API (Edge-compatible)
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', encoder.encode(ADMIN_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(timestamp));
  const expectedHash = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');

  if (hash !== expectedHash) return false;
  const age = (Date.now() - parseInt(timestamp)) / 1000;
  return age < TOKEN_MAX_AGE;
}

function getTokenFromRequest(request: NextRequest): string | null {
  return request.cookies.get(COOKIE_NAME)?.value || null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip login page and auth API
  if (pathname === '/admin/login' || pathname.startsWith('/api/auth/')) {
    return NextResponse.next();
  }

  // Protect admin pages
  if (pathname.startsWith('/admin')) {
    const token = getTokenFromRequest(request);
    if (!token || !(await verifyToken(token))) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Protect write API routes (POST, PUT, DELETE) — except subscribe
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/subscribe') && !pathname.startsWith('/api/auth/')) {
    if (request.method !== 'GET') {
      const token = getTokenFromRequest(request);
      if (!token || !(await verifyToken(token))) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
