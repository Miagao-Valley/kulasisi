import fetcher from '@/utils/fetcher';
import { Word } from '@/types';

export default async function getWord(id: number): Promise<Word> {
  return await fetcher(`/dictionary/${id}/`, {
    cache: 'no-store',
  });
}
