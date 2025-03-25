'use client';

import { useEffect } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { AppLogo } from '@/components/brand/app-logo';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Error',
  description: 'Something went wrong.',
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-full flex flex-col gap-2 justify-center items-center text-center">
      <Link href="/" className="flex flex-col items-center">
        <AppLogo className="w-10 mb-4 motion-preset-seesaw-lg" />
        <span className="sr-only">kulasisi</span>
      </Link>

      <h2 className="text-4xl font-bold mb-0">Oops!</h2>

      <p>Something went wrong...</p>

      <Button className="my-4" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
