'use server';

import 'server-only';

import { jwtVerify } from 'jose';
import { Payload } from '@/types/users';

const key = new TextEncoder().encode(process.env.SECRET_KEY || '');
const algorithm = 'HS256';

export default async function decrypt(
  authToken?: string
): Promise<Payload | null> {
  if (!authToken) {
    return null;
  }

  try {
    const { payload }: { payload: Payload } = await jwtVerify(authToken, key, {
      algorithms: [algorithm],
    });

    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
}
