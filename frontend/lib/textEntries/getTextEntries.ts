import fetcher from '@/utils/fetcher';
import { TextEntry } from '@/types';

export default async function getTextEntries(
  queryParams: Record<string, any> = {}
): Promise<TextEntry[]> {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/text-entries/${queryString ? `?${queryString}` : ''}`;

  return await fetcher(url, {
    cache: 'no-store',
  });
}
