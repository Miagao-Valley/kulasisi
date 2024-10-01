import fetcher from '@/utils/fetcher';
import { Lang } from '@/types';

export default async function getLangs(): Promise<Lang[]> {
  return await fetcher(`languages/`);
}
