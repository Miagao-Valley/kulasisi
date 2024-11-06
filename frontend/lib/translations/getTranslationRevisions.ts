import fetcher from '@/utils/fetcher';
import { TranslationRevision, PaginationDetails } from '@/types';

export default async function getTranslationRevisions(
  id: number
): Promise<PaginationDetails & { results: TranslationRevision[] }> {
  return await fetcher(`/translations/${id}/history/`, {
    cache: 'no-store',
  });
}
