import { fetchAPI } from '@/utils/fetchAPI';
import { Category } from '@/types/phrases';

export default async function getCategories(
  params: Record<string, any> = {}
): Promise<Category[]> {
  const { data: fetchedData } = await fetchAPI(`/phrases/categories/`, {
    params: params,
    cache: 'no-store',
  });

  return fetchedData;
}
