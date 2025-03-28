'use server';

import { revalidatePath } from 'next/cache';
import { fetchAPI } from '@/lib/utils/fetchAPI';
import { setToken } from '../tokens/setToken';
import { LoginSchema } from '@/lib/schemas/auth';
import { Result } from '@/lib/utils/try-catch';

export async function login(
  credentials: LoginSchema
): Promise<Result<{ access: string; refresh: string }, any>> {
  const result = await fetchAPI(`/token/`, {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  if (result.error) {
    return result;
  }

  await setToken(result.data.access);
  await setToken(result.data.refresh, 'refresh');

  revalidatePath(`/`);

  return result;
}
