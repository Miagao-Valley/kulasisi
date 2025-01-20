import fetcher from '@/utils/fetcher';
import { Definition } from '@/types/dictionary';

export default async function getDefinition(id: number): Promise<Definition> {
  const res = await fetcher(`/dictionary/definitions/${id}/`, {
    cache: 'no-store',
  });
  if ('created_at' in res && 'updated_at' in res) {
    res.created_at = new Date(res.created_at);
    res.updated_at = new Date(res.updated_at);
  }
return res;
}
