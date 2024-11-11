'use server';

import fetcher, { FetchError } from '@/utils/fetcher';
import getToken from '../tokens/getToken';
import { redirect } from 'next/navigation';

export default async function changePassword(username: string, data: FormData) {
  try {
    const promise = fetcher(
      `/users/${username}/change-password/`,
      {
        method: 'POST',
        body: data,
      },
      getToken()
    );
    await promise;
  } catch (error) {
    const fetchError = error as FetchError;
    return { error: fetchError.resBody };
  }

  redirect('/settings/?tab=account');
  return null;
}
