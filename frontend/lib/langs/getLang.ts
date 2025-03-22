import { fetchAPI } from '@/utils/fetchAPI';
import { Lang } from '@/types/languages';

export default async function getLang(code: string): Promise<Lang> {
  const { data: fetchedData } = await fetchAPI(`/languages/${code}/`, {
    cache: 'no-store',
  });

  return fetchedData;
}
