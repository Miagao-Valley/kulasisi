'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import fetcher, { FetchError } from '@/utils/fetcher';
import setToken from '../tokens/setToken';

export default async function register(data: FormData) {
  try {
    await fetcher(`/register/`, {
      method: 'POST',
      body: data,
    });

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

  revalidatePath('/users/');
  revalidatePath('/');
  redirect('/');
}
