import fetcher from '@/utils/fetcher';
import { User } from '@/types/users';

export default async function getUser(username: string): Promise<User> {
  const res = await fetcher(`/users/${username}/`, {
    cache: 'no-store',
  });
  if ('date_joined' in res && 'last_login' in res && 'date_of_birth' in res) {
    res.date_joined = new Date(res.date_joined);
    res.last_login = new Date(res.last_login);
    res.date_of_birth = new Date(res.date_of_birth);
  }
  return res
}
