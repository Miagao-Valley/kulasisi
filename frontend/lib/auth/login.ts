'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import fetcher, { FetchError } from '@/utils/fetcher';
import setToken from '../tokens/setToken';

export default async function login(data: FormData) {
  try {
    const { access, refresh } = await fetcher(`/token/`, {
      method: 'POST',
      body: data,
    });

    setToken(access);
    setToken(refresh, 'refresh');
  } catch (error) {
    const fetchError = error as FetchError;
    return { error: fetchError.resBody };
  }

  revalidatePath('/');
  redirect('/');
}
