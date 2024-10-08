import fetcher from '@/utils/fetcher';
import { TextEntry } from '@/types';

export default async function getTextEntry(id: number): Promise<TextEntry> {
  return await fetcher(`/text-entries/${id}/`, {
    cache: 'no-store',
  });
}
