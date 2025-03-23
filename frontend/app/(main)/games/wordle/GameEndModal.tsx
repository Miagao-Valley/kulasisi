'use client';

import { useEffect, useState } from 'react';
import { useWordleContext } from './WordleContext';
import { WordleGameStatus } from '@/types/games';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function GameEndModal() {
  const { wordLength, solution, gameStatus, resetGame } = useWordleContext();
  const [isOpen, setIsOpen] = useState(gameStatus !== WordleGameStatus.Playing);

  const handlePlayAgain = () => {
    resetGame();
    setIsOpen(false);
  };

  // Show dialog if game status is not playing
  useEffect(() => {
    if (gameStatus !== WordleGameStatus.Playing) {
      const timer = setTimeout(
        () => {
          setIsOpen(true);
        },
        wordLength * 200 + 500
      );

      return () => clearTimeout(timer);
    }
  }, [gameStatus]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {gameStatus === WordleGameStatus.Win
              ? 'Congratulations!'
              : 'Game Over'}
          </DialogTitle>
          <DialogDescription>
            <div>
              {gameStatus === WordleGameStatus.Win
                ? 'You guessed the word correctly!'
                : `The correct word was: "${solution}"`}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handlePlayAgain}>Play Again</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
