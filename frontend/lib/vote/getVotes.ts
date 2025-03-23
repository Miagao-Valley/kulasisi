import { Entry, Vote } from '@/types/core';
import { fetchAPI } from '@/lib/utils/fetchAPI';
import { entryToPath } from '@/lib/utils/entryToPath';

export async function getVotes(entry: Entry): Promise<Vote[]> {
  const entryPath = entryToPath(entry, false);

  const { data: fetchedData } = await fetchAPI(`/${entryPath}/votes/`, {
    cache: 'no-store',
  });

  return fetchedData;
}
