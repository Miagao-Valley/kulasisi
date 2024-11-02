import fetcher from '@/utils/fetcher';
import { TextEntryRevision, PaginationDetails } from '@/types';

export default async function getTextEntryRevisions(
  id: number
): Promise<PaginationDetails & { results: TextEntryRevision[] }> {
  return await fetcher(`/text-entries/${id}/history/`, {
    cache: 'no-store',
  });
}
