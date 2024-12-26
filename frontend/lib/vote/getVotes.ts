import { Vote } from '@/types';
import fetcher from '@/utils/fetcher';

export default async function getVotes(
  id: number,
  type: 'phrases' | 'translations' | 'words' | 'definitions',
): Promise<Vote[]> {
  return await fetcher(`/${type}/${id}/votes/`, {
    cache: 'no-store',
  });
}
