'use server';

import { fetchAPI } from '@/lib/utils/fetchAPI';
import { revalidatePath } from 'next/cache';
import { FlaggedToken, ProofreaderStats } from '@/types/proofreader';
import { Result } from '@/lib/utils/try-catch';

export async function proofread(
  text: string,
  lang: string
): Promise<
  Result<{ flagged_tokens: FlaggedToken[]; stats: ProofreaderStats }, any>
> {
  const result = await fetchAPI(`/proofreader/`, {
    method: 'POST',
    body: JSON.stringify({ text: text, lang: lang }),
  });

  revalidatePath(`/proofreader/`);

  return result;
}
