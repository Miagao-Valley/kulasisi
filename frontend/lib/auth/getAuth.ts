'use server';

import { AuthType } from '@/types/users';
import { getPayload } from '../tokens/getPayload';

export async function getAuth(): Promise<AuthType> {
  const authData = await getPayload();

  const auth = {
    isAuthenticated: !!authData,
    id: authData?.user_id as number,
    username: authData?.username as string,
  };

  return auth;
}
