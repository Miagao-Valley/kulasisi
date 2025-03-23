'use server';

import { deleteTokens } from '../tokens/deleteToken';

export async function logout() {
  await deleteTokens();
}
