import { Vote } from '@/types';
import fetcher from '@/utils/fetcher';

export default async function getVotes(
  id: number,
  type: 'phrase-entries' | 'dict-entries' | 'translations',
): Promise<Vote[]> {
  return await fetcher(`/${type}/${id}/votes/`, {
    cache: 'no-store',
  });
}
