'use server';

import 'server-only';

import { cookies } from 'next/headers';

const tokenName = 'auth-token';
const tokenRefreshName = 'auth-refresh-token';

export default async function deleteTokens(type: string = '') {
  if (type === 'access') {
    return cookies().delete(tokenName);
  }
  if (type === 'refresh') {
    return cookies().delete(tokenRefreshName);
  }
  cookies().delete(tokenName);
  cookies().delete(tokenRefreshName);
  return null;
}
