import fetcher from '@/utils/fetcher';

export default async function getLangs(
  queryParams: Record<string, any> = {},
): Promise<string[]> {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/proofreader/languages/${queryString ? `?${queryString}` : ''}`;

  return await fetcher(url, {
    cache: 'no-store',
  });
}
