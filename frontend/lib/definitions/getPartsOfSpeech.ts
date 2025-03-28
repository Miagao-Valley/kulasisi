import { fetchAPI } from '@/lib/utils/fetchAPI';
import { PartOfSpeech } from '@/types/dictionary';

export async function getPartsOfSpeech(
  params: Record<string, any> = {}
): Promise<PartOfSpeech[]> {
  const { data: fetchedData } = await fetchAPI(`/dictionary/parts-of-speech/`, {
    params: params,
    cache: 'no-store',
  });

  return fetchedData;
}
