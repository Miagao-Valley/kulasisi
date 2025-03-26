'use server';

import 'server-only';

import { decrypt } from './decrypt';
import { getToken } from './getToken';
import { updateToken } from './updateToken';
import { Payload } from '@/types/users';

export async function getPayload(
  type: string = 'access'
): Promise<Payload | null> {
  const authToken = await getToken(type);
  const payload = await decrypt(authToken);

  if (!payload?.exp) {
    return null;
  }

  const expiresAt = new Date(payload.exp * 1000);
  if (Date.now() >= expiresAt.getTime()) {
    const newToken = await updateToken();
    if (!newToken) {
      return null;
    }
    const newPayload = await decrypt(newToken);
    return newPayload;
  }

  return payload;
}
