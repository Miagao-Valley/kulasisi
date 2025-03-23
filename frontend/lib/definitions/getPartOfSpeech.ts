import { fetchAPI } from '@/lib/utils/fetchAPI';
import { PartOfSpeech } from '@/types/dictionary';

export async function getPartOfSpeech(abbr: string): Promise<PartOfSpeech> {
  const { data: fetchedData } = await fetchAPI(
    `/dictionary/parts-of-speech/${abbr}/`,
    {
      cache: 'no-store',
    }
  );

  return fetchedData;
}
