import fetcher from '@/utils/fetcher';
import { PaginationDetails, User } from '@/types';

export default async function getUsers(
  queryParams: Record<string, any> = {},
): Promise<PaginationDetails & { results: User[] }> {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/users/${queryString ? `?${queryString}` : ''}`;

  return await fetcher(url);
}
