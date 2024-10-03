'use client';

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
    <div className="flex flex-col gap-3 justify-center justify-items-center text-center">
      <h2>Oops! Something went wrong...</h2>
      <div>
        <button className="btn" onClick={() => reset()}>
          Try again
        </button>
      </div>
    </div>
  );
}
