import fetcher from '@/utils/fetcher';
import { Translation } from '@/types/phrases';

export default async function getTranslation(id: number): Promise<Translation> {
  const res = await fetcher(`/phrases/translations/${id}/`, {
    cache: 'no-store',
  });
  if ('created_at' in res && 'updated_at' in res) {
    res.created_at = new Date(res.created_at);
    res.updated_at = new Date(res.updated_at);
  }
  return res;
}
