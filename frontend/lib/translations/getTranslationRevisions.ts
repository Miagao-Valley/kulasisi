import fetcher from '@/utils/fetcher';
import { TranslationRevision, PaginationDetails } from '@/types';

export default async function getTranslationRevisions(
  textEntryId: number,
  id: number
): Promise<PaginationDetails & { results: TranslationRevision[] }> {
  return await fetcher(
    `/text-entries/${textEntryId}/translations/${id}/history/`,
    {
      cache: 'no-store',
    }
  );
}
