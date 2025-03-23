'use server';

import 'server-only';

import { SignJWT } from 'jose';
import { Payload } from '@/types/users';

const key = new TextEncoder().encode(process.env.SECRET_KEY || '');
const algorithm = 'HS256';

export async function encrypt(
  payload: Payload,
  exp: string = '15m'
): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: algorithm })
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(key);
}
