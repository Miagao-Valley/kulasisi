import fetcher from '@/utils/fetcher';
import { Definition } from '@/types';

export default async function getDefinition(id: number): Promise<Definition> {
  return await fetcher(`/dictionary/definitions/${id}/`, {
    cache: 'no-store',
  });
}
