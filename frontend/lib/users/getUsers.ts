import fetcher from '@/utils/fetcher';
import { User } from '@/types';

export default async function getUsers(
  queryParams: Record<string, any> = {}
): Promise<User[]> {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/users/${queryString ? `?${queryString}` : ''}`;

  return await fetcher(url);
}
