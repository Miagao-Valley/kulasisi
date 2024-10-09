'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/components/AuthProvider';
import { BASE_URL } from '@/constants';
import Loading from '@/app/loading';

export default function LogoutPage() {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    const logout = async () => {
      await fetch(`${BASE_URL}/api/logout/`);

      auth.updateAuth();

      router.push('/auth/login/');
    };

    logout();
  }, [router]);

  return <Loading />;
}
