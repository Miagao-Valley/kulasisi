'use server';

import 'server-only';

import { cookies } from 'next/headers';

const tokenName = 'auth-token';
const tokenRefreshName = 'auth-refresh-token';

export async function getToken(
  type: string = 'access'
): Promise<string | undefined> {
  const cookieStore = await cookies();
  const cookieName = type === 'refresh' ? tokenRefreshName : tokenName;
  return cookieStore.get(cookieName)?.value;
}
