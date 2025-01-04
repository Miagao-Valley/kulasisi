import fetcher from '@/utils/fetcher';
import { Category } from '@/types/phrases';

export default async function getCategories(
  queryParams: Record<string, any> = {},
): Promise<Category[]> {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/phrases/categories/${queryString ? `?${queryString}` : ''}`;

  const res = await fetcher(url, {
    cache: 'no-store',
  });
  return res;
}
