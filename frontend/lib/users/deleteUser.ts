'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import fetcher, { FetchError } from '@/utils/fetcher';
import getToken from '../tokens/getToken';

export default async function deleteUser(username: string, data: FormData) {
  try {
    const promise = fetcher(
      `/users/${username}/delete/`,
      {
        method: 'DELETE',
        body: data,
      },
      getToken(),
    );
    await promise;
  } catch (error) {
    const fetchError = error as FetchError;
    return { error: fetchError.resBody };
  }

  revalidatePath(`/users`);
  redirect(`/auth/login`);
}
