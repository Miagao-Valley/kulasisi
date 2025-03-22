import { AuthType } from '@/types/users';

export default async function fetchAuth(): Promise<AuthType | null> {
  const url = new URL('/api/me/', process.env.NEXT_PUBLIC_BASE_URL);

  const response = await fetch(url, {
    cache: 'no-store',
  });

  if (!response.ok) {
    return null;
  }

  return await response.json();
}
