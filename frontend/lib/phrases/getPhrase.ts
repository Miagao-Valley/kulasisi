import fetcher from '@/utils/fetcher';
import { Phrase } from '@/types/phrases';

export default async function getPhrase(id: number): Promise<Phrase> {
  const res = await fetcher(`/phrases/${id}/`, {
    cache: 'no-store',
  });
  if ('created_at' in res && 'updated_at' in res) {
    res.created_at = new Date(res.created_at);
    res.updated_at = new Date(res.updated_at);
  }
  return res
}
