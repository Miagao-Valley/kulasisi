import fetcher from '@/utils/fetcher';
import { DictEntryRevision, PaginationDetails } from '@/types';

export default async function getDictEntryRevisions(
  id: number,
): Promise<PaginationDetails & { results: DictEntryRevision[] }> {
  return await fetcher(`/dict-entries/${id}/history/`, {
    cache: 'no-store',
  });
}
