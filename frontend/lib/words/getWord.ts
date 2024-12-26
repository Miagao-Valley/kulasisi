import fetcher from '@/utils/fetcher';
import { Word } from '@/types';

export default async function getWord(id: number): Promise<Word> {
  return await fetcher(`/words/${id}/`, {
    cache: 'no-store',
  });
}
