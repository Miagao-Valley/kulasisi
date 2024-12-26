import fetcher from '@/utils/fetcher';
import { Lang } from '@/types/languages';

export default async function getLang(code: string): Promise<Lang> {
  return await fetcher(`/languages/${code}/`, {
    cache: 'no-store',
  });
}
