'use server';

import 'server-only';

import { fetchAPI } from '@/lib/utils/fetchAPI';
import { getToken } from './getToken';
import { getPayload } from './getPayload';

export async function updateToken(): Promise<string | null> {
  const payload = await getPayload();
  const refreshToken = await getToken('refresh');
  const payloadRefresh = await getPayload('refresh');

  if (payload || !payloadRefresh) {
    return null;
  }

  const { data } = await fetchAPI(`/token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  return data.access;
}
