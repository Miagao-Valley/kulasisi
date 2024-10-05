'use server';

import 'server-only';

import { cookies } from 'next/headers';
import decrypt from './decrypt';

const tokenName = 'auth-token';
const tokenRefreshName = 'auth-refresh-token';

export default async function setToken(
  authToken?: string,
  type: string = 'access'
) {
  if (!authToken) {
    return null;
  }

  const cookieName = type === 'refresh' ? tokenRefreshName : tokenName;

  const payload = await decrypt(authToken);

  if (!payload) {
    return null;
  }

  let expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const exp = payload?.exp;
  if (exp) {
    expiresAt = new Date(exp * 1000);
  }

  return cookies().set(cookieName, authToken, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
    expires: expiresAt,
  });
}
