import { fetchAPI } from '@/lib/utils/fetchAPI';
import { Word } from '@/types/dictionary';

export default async function getWord(
  lang: string,
  word: string
): Promise<Word> {
  const { data: fetchedData } = await fetchAPI(`/dictionary/${lang}/${word}/`, {
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
