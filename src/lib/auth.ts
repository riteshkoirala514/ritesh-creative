import { cookies } from 'next/headers';
import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ritesh2026';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'ritesh-creative-secret-key';
const COOKIE_NAME = 'admin_token';
const TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function generateToken(): string {
  const timestamp = Date.now().toString();
  const hash = crypto.createHmac('sha256', ADMIN_SECRET).update(timestamp).digest('hex');
  return `${timestamp}.${hash}`;
}

export function validatePassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export async function setAuthCookie(): Promise<void> {
  const token = generateToken();
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: TOKEN_MAX_AGE,
    path: '/',
  });
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
