'use server';

import 'server-only';

import { cookies } from 'next/headers';

const tokenName = 'auth-token';
const tokenRefreshName = 'auth-refresh-token';

export async function getToken(type: string = 'access') {
  const cookieName = type === 'refresh' ? tokenRefreshName : tokenName;

  return cookies().get(cookieName)?.value;
}
