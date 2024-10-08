'use server';

import 'server-only';

import fetcher from '@/utils/fetcher';
import getToken from './getToken';
import getPayload from './getPayload';

export default async function updateToken() {
  let payload = await getPayload();
  let refreshToken = getToken('refresh');
  let payloadRefresh = await getPayload('refresh');

  if (payload || !payloadRefresh) {
    return null;
  }

  const { access } = await fetcher(`/token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  return access;
}
