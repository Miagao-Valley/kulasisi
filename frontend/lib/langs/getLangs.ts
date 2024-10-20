import fetcher from '@/utils/fetcher';
import { Lang } from '@/types';

export default async function getLangs(
  queryParams: Record<string, any> = {}
): Promise<Lang[]> {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/languages/${queryString ? `?${queryString}` : ''}`;

  return await fetcher(url);
}
