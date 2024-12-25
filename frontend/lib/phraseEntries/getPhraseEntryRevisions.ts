import fetcher from '@/utils/fetcher';
import { PhraseEntryRevision, PaginationDetails } from '@/types';

export default async function getPhraseEntryRevisions(
  id: number,
): Promise<PaginationDetails & { results: PhraseEntryRevision[] }> {
  return await fetcher(`/phrase-entries/${id}/history/`, {
    cache: 'no-store',
  });
}
