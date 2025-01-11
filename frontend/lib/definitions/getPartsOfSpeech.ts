import fetcher from '@/utils/fetcher';
import { PartOfSpeech } from '@/types/dictionary';

export default async function getPartsOfSpeech(
  queryParams: Record<string, any> = {},
): Promise<PartOfSpeech[]> {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/dictionary/parts-of-speech/${queryString ? `?${queryString}` : ''}`;

  const res = await fetcher(url, {
    cache: 'no-store',
  });
  return res;
}
