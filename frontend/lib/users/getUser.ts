import fetcher from '@/utils/fetcher';
import { User } from '@/types';

export default async function getUser(username: string): Promise<User> {
  return await fetcher(`/users/${username}/`);
}
