'use server';

import { redirect } from 'next/navigation';
import deleteTokens from '../tokens/deleteToken';

export default async function logout() {
  await deleteTokens();

  return redirect('/auth/login/');
}
