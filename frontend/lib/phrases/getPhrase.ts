import { fetchAPI } from '@/lib/utils/fetchAPI';
import { Phrase } from '@/types/phrases';

export async function getPhrase(id: number): Promise<Phrase> {
  const { data: fetchedData } = await fetchAPI(`/phrases/${id}/`, {
    authorized: true,
    cache: 'no-store',
  });

  if (fetchedData?.created_at) {
    fetchedData.created_at = new Date(fetchedData.created_at);
  }
  if (fetchedData?.updated_at) {
    fetchedData.updated_at = new Date(fetchedData.updated_at);
  }

  return fetchedData;
}
