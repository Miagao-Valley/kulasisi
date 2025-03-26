'use server';

import 'server-only';

import { cookies } from 'next/headers';
import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';

const tokenName = 'auth-token';
const tokenRefreshName = 'auth-refresh-token';

export async function deleteTokens(
  type: string = ''
): Promise<ResponseCookies | null> {
  const cookieStore = await cookies();
  if (type === 'access') {
    return cookieStore.delete(tokenName);
  }
  if (type === 'refresh') {
    return cookieStore.delete(tokenRefreshName);
  }
  cookieStore.delete(tokenName);
  cookieStore.delete(tokenRefreshName);
  return null;
}
