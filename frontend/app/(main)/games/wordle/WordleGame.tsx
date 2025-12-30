'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { useWordleContext } from './WordleContext';
import { Board } from './Board';
import { Keyboard } from './Keyboard';
import { GameEndModal } from './GameEndModal';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';

export function WordleGame() {
  const { isAuthenticated, isLoading } = useAuth();
  const { loading, error } = useWordleContext();
  const toastShown = useRef(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !toastShown.current) {
      setTimeout(() => {
        toast.error('Sign in to save your progress.');
      }, 500);
      toastShown.current = true;
    }
  }, [isAuthenticated, isLoading]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="text-center">{error.message}</div>
      ) : (
        <div className="flex flex-col gap-4 justify-center items-center">
          <GameEndModal />
          <div>
            <Board />
          </div>
          <div>
            <Keyboard />
          </div>
        </div>
      )}
    </>
  );
}
