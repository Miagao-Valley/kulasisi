'use server';

import 'server-only';

import { SignJWT } from 'jose';
import { Payload } from '@/types/users';
import { secretKey } from '@/constants';

const key = new TextEncoder().encode(secretKey);
const algorithm = 'HS256';

export default async function encrypt(
  payload: Payload,
  exp: string = '15m',
): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: algorithm })
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(key);
}
