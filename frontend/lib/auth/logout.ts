'use server';

import deleteTokens from '../tokens/deleteToken';

export default async function logout() {
  await deleteTokens();
}
