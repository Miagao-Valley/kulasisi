'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

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
    <div className="flex flex-col gap-3 justify-center items-center text-center">
      <h2 className="text-3xl font-bold mb-4">Oops! Something went wrong...</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
