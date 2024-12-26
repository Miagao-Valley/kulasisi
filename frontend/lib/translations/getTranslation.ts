import fetcher from '@/utils/fetcher';
import { Translation } from '@/types';

export default async function getTranslation(id: number): Promise<Translation> {
  return await fetcher(`/phrases/translations/${id}/`, {
    cache: 'no-store',
  });
}
