import { BASE_URL } from '@/constants';

export default async function fetchAuth() {
  const res = await fetch(`${BASE_URL}/api/me/`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return null;
  }

  return await res.json();
}
