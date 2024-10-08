import { BASE_URL } from '@/constants';

export default async function getAuthData() {
  const res = await fetch(`${BASE_URL}/auth-data/`);

  if (!res.ok) {
    return null;
  }

  return await res.json();
}
