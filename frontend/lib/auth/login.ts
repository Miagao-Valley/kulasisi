'use server';

import { redirect } from 'next/navigation';
import fetcher from '@/utils/fetcher';
import setToken from '../tokens/setToken';

export default async function login(data: FormData) {
  const { access, refresh } = await fetcher(`/token/`, {
    method: 'POST',
    body: data,
  });

  setToken(access);
  setToken(refresh, 'refresh');

  redirect('/');
}
