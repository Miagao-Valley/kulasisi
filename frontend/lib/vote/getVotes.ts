import { Entry, Vote } from '@/types/core';
import { fetchAPI } from '@/utils/fetchAPI';
import entryToPath from '@/utils/entryToPath';

export default async function getVotes(entry: Entry): Promise<Vote[]> {
  const entryPath = entryToPath(entry, false);

  const { data: fetchedData } = await fetchAPI(`/${entryPath}/votes/`, {
    cache: 'no-store',
  });

  return fetchedData;
}
