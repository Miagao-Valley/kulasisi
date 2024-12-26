import { Payload } from '@/types/users';
import getPayload from '../tokens/getPayload';

export default async function getAuth() {
  const authData: Payload | null = await getPayload();

  const auth = {
    isAuthenticated: !!authData,
    id: authData?.user_id,
    username: authData?.username,
  };

  return auth;
}
