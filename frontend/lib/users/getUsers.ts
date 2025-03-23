import { fetchAPI } from '@/lib/utils/fetchAPI';
import { Paginated } from '@/types/core';
import { User } from '@/types/users';

export async function getUsers(
  params: Record<string, any> = {}
): Promise<Paginated<User[]>> {
  const { data: fetchedData } = await fetchAPI(`/users/`, {
    params: params,
    cache: 'no-store',
  });

  for (const entry of fetchedData.results) {
    if (entry?.date_joined) {
      entry.date_joined = new Date(entry.date_joined);
    }
    if (entry?.last_login) {
      entry.last_login = new Date(entry.last_login);
    }
    if (entry?.date_of_birth) {
      entry.date_of_birth = new Date(entry.date_of_birth);
    }
  }

  return fetchedData;
}
