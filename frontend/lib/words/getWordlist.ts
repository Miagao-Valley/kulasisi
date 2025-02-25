import fetcher from '@/utils/fetcher';

export default async function getWordlist(
  queryParams: Record<string, any> = {}
): Promise<string[]> {
  const finalParams = { ...queryParams, wordlist: 'true' };

  const queryString = new URLSearchParams(finalParams).toString();
  const url = `/dictionary/${queryString ? `?${queryString}` : ''}`;

  const res = await fetcher(url, {
    cache: 'no-store',
  });

  return res;
}
