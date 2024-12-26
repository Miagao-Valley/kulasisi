import fetcher from '@/utils/fetcher';
import { PhraseRevision, PaginationDetails } from '@/types';

export default async function getPhraseRevisions(
  id: number,
): Promise<PaginationDetails & { results: PhraseRevision[] }> {
  return await fetcher(`/phrases/${id}/history/`, {
    cache: 'no-store',
  });
}
