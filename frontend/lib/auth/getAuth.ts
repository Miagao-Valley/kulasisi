'use server';

import { AuthType, Payload } from '@/types/users';
import getPayload from '../tokens/getPayload';

export default async function getAuth(): Promise<AuthType> {
  const authData: Payload | null = await getPayload();

  const auth = {
    isAuthenticated: !!authData,
    id: authData?.user_id as number,
    username: authData?.username as string,
  };

  return auth;
}
