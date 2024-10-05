import 'server-only';

import fetcher from '@/utils/fetcher';
import getToken from './getToken';
import verifyToken from './verifyToken';

export default async function updateToken() {
  let payload = await verifyToken();
  let refreshToken = getToken('refresh');
  let payloadRefresh = await verifyToken('refresh');

  if (payload || !payloadRefresh) {
    return null;
  }

  return await fetcher(`/token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });
}
