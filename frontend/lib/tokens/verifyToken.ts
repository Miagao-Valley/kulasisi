import 'server-only';

import decrypt from './decrypt';
import getToken from './getToken';
import updateToken from './updateToken';

export default async function verifyToken(type: string = 'access') {
  const authToken = getToken(type);
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
