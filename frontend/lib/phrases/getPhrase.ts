import fetcher from '@/utils/fetcher';
import { Phrase } from '@/types';

export default async function getPhrase(id: number): Promise<Phrase> {
  return await fetcher(`/phrases/${id}/`, {
    cache: 'no-store',
  });
}
