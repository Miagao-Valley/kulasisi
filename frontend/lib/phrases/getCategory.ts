import { fetchAPI } from '@/lib/utils/fetchAPI';
import { Category } from '@/types/phrases';

export default async function getCategory(name: string): Promise<Category> {
  const { data: fetchedData } = await fetchAPI(`/phrases/categories/${name}/`, {
    cache: 'no-store',
  });

  return fetchedData;
}
