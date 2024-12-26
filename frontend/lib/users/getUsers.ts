import fetcher from '@/utils/fetcher';
import { PaginationDetails } from '@/types/core';
import { User } from '@/types/users';

export default async function getUsers(
  queryParams: Record<string, any> = {},
): Promise<PaginationDetails & { results: User[] }> {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/users/${queryString ? `?${queryString}` : ''}`;

  const res = await fetcher(url, {
    cache: 'no-store',
  });
  for (const user of res.results) {
    if (
      'date_joined' in user &&
      'last_login' in user &&
      'date_of_birth' in user
    ) {
      user.date_joined = new Date(user.date_joined);
      user.last_login = new Date(user.last_login);
      user.date_of_birth = new Date(user.date_of_birth);
    }
  }
  return res;
}
