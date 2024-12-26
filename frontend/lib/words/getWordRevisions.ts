import fetcher from '@/utils/fetcher';
import { WordRevision, PaginationDetails } from '@/types';

export default async function getWordRevisions(
  id: number,
): Promise<PaginationDetails & { results: WordRevision[] }> {
  return await fetcher(`/words/${id}/history/`, {
    cache: 'no-store',
  });
}
