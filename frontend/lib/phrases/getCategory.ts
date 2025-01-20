import fetcher from '@/utils/fetcher';
import { Category } from '@/types/phrases';

export default async function getCategory(name: string): Promise<Category> {
  const res = await fetcher(`/phrases/categories/${name}/`, {
    cache: 'no-store',
  });
  return res;
}
