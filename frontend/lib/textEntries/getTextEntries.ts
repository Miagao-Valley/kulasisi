import fetcher from '@/utils/fetcher';
import { TextEntry } from '@/types';

export default async function getTextEntries(): Promise<TextEntry[]> {
  return await fetcher(`/text-entries/`, {
    cache: 'no-store',
  });
}
