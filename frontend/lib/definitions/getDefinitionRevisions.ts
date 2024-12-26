import fetcher from '@/utils/fetcher';
import { DefinitionRevision, PaginationDetails } from '@/types';

export default async function getDefinitionRevisions(
  id: number,
): Promise<PaginationDetails & { results: DefinitionRevision[] }> {
  return await fetcher(`/definitions/${id}/history/`, {
    cache: 'no-store',
  });
}
