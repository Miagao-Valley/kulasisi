'use server';

import fetcher, { FetchError } from '@/utils/fetcher';
import { revalidatePath } from 'next/cache';
import { FlaggedToken, ProofreaderStats } from '@/types/proofreader';

export default async function proofread(
  text: string,
  lang: string,
): Promise<
  | { flagged_tokens: FlaggedToken[]; stats: ProofreaderStats }
  | { error: string }
> {
  let res = null;
  try {
    res = await fetcher(`/proofreader/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: text, lang: lang }),
    });
  } catch (error) {
    revalidatePath('/proofreader/');
    const fetchError = error as FetchError;
    return { error: fetchError.resBody };
  }

  revalidatePath('/proofreader/');

  return res;
}
