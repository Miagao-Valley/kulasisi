import { Entry, Vote } from '@/types/core';
import fetcher from '@/utils/fetcher';
import entryToUrl from '../../utils/entryToUrl';

export default async function getVotes(entry: Entry): Promise<Vote[]> {
  const url = `${entryToUrl(entry)}votes/`;
  return await fetcher(url, {
    cache: 'no-store',
  });
}
