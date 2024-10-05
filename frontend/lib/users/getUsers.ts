import fetcher from '@/utils/fetcher';
import { User } from '@/types';

export default async function getUsers(): Promise<User[]> {
  return await fetcher(`/users/`);
}
