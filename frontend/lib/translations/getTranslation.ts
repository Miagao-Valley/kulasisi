import fetcher from '@/utils/fetcher';
import { Translation } from '@/types';

export default async function getTranslation(
  textEntryId: number,
  id: number,
): Promise<Translation> {
  return await fetcher(`/text-entries/${textEntryId}/translations/${id}/`, {
    cache: 'no-store',
  });
}
