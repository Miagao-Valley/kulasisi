import { fetchAPI } from '@/lib/utils/fetchAPI';
import { Translation } from '@/types/phrases';

export async function getTranslation(id: number): Promise<Translation> {
  const { data: fetchedData } = await fetchAPI(`/phrases/translations/${id}/`, {
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
