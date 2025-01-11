import { Entry, Vote } from '@/types/core';
import fetcher from '@/utils/fetcher';
import entryToUrl from '../../utils/entryToUrl';

export default async function getVotes(entry: Entry): Promise<Vote[]>{
  const entryUrl = entryToUrl(entry, false);
  if (entryUrl === '')
  {
    console.error("Failed to get entry URL");
  }

  const url = `/${entryUrl}/votes/`;
  return await fetcher(url, {
    cache: 'no-store',
  });
}
