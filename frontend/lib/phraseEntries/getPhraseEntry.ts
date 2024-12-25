import fetcher from '@/utils/fetcher';
import { PhraseEntry } from '@/types';

export default async function getPhraseEntry(id: number): Promise<PhraseEntry> {
  return await fetcher(`/phrase-entries/${id}/`, {
    cache: 'no-store',
  });
}
