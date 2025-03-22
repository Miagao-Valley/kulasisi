import { fetchAPI } from '@/lib/utils/fetchAPI';
import { Definition } from '@/types/dictionary';

export default async function getDefinition(id: number): Promise<Definition> {
  const { data: fetchedData } = await fetchAPI(
    `/dictionary/definitions/${id}/`,
    {
      authorized: true,
      cache: 'no-store',
    }
  );

  if (fetchedData?.created_at) {
    fetchedData.created_at = new Date(fetchedData.created_at);
  }
  if (fetchedData?.updated_at) {
    fetchedData.updated_at = new Date(fetchedData.updated_at);
  }

  return fetchedData;
}
