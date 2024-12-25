import fetcher from '@/utils/fetcher';
import { DictEntry } from '@/types';

export default async function getDictEntry(id: number): Promise<DictEntry> {
  return await fetcher(`/dict-entries/${id}/`, {
    cache: 'no-store',
  });
}
