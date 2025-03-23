import { fetchAPI } from '@/lib/utils/fetchAPI';

export async function getWordlist(
  params: Record<string, any> = {}
): Promise<string[]> {
  const { data: fetchedData } = await fetchAPI(`/dictionary/`, {
    params: { ...params, wordlist: true },
    cache: 'no-store',
  });

  return fetchedData;
}
