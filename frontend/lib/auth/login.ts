'use server';

import { revalidatePath } from 'next/cache';
import fetcher, { FetchError } from '@/utils/fetcher';
import setToken from '../tokens/setToken';

export default async function login(data: object) {
  try {
    const { access, refresh } = await fetcher(`/token/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    setToken(access);
    setToken(refresh, 'refresh');
  } catch (error) {
    const fetchError = error as FetchError;
    return { error: fetchError.resBody };
  }

  revalidatePath('/');
}
