import fetcher from '@/utils/fetcher';
import { PartOfSpeech } from '@/types/dictionary';

export default async function getPartOfSpeech(
  abbr: string
): Promise<PartOfSpeech> {
  const res = await fetcher(`/dictionary/parts-of-speech/${abbr}/`, {
    cache: 'no-store',
  });
  return res;
}
