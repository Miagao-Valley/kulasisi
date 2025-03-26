'use server';

import 'server-only';

import { cookies } from 'next/headers';
import { decrypt } from './decrypt';
import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';

const tokenName = 'auth-token';
const tokenRefreshName = 'auth-refresh-token';

export async function setToken(
  authToken?: string,
  type: string = 'access'
): Promise<ResponseCookies | null> {
  if (!authToken) {
    return null;
  }

  const payload = await decrypt(authToken);
  if (!payload) {
    return null;
  }

  const cookieStore = await cookies();
  const cookieName = type === 'refresh' ? tokenRefreshName : tokenName;

  let expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const exp = payload?.exp;
  if (exp) {
    expiresAt = new Date(exp * 1000);
  }

  return cookieStore.set(cookieName, authToken, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
    expires: expiresAt,
  });
}
