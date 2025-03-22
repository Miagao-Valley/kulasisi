'use client';

import { useState, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useWordleContext } from './WordleContext';
import { GuessStatus } from './WordleContext';

interface BoardProps {
  className?: string;
}

export default function Board({ className }: BoardProps) {
  const { guesses } = useWordleContext();

  return (
    <div className={cn(className, 'flex flex-col gap-1')}>
      {guesses.map((guess, index) => (
        <Row key={index} guess={guess} idx={index} />
      ))}
    </div>
  );
}

export function Row({ guess, idx }: { guess: string; idx: number }) {
  const { wordLength } = useWordleContext();
  const paddedGuess = guess.padEnd(wordLength, ' ');

  return (
    <div className={cn('flex gap-1 w-full h-full')}>
      {paddedGuess.split('').map((letter, index) => {
        return <Tile key={index} letter={letter} idx={index} rowIdx={idx} />;
      })}
    </div>
  );
}

export const tileVariants = cva('', {
  variants: {
    status: {
      correct: 'bg-success border-none',
      present: 'bg-warning border-none',
      absent: 'bg-muted border-none',
      empty: '',
    },
  },
  defaultVariants: {
    status: 'empty',
  },
});

export function Tile({
  letter,
  idx,
  rowIdx,
}: {
  letter: string;
  idx: number;
  rowIdx: number;
}) {
  const { currentGuessIdx, isLastGuessValid, solution } = useWordleContext();

  const [pop, setPop] = useState(false);
  const [shake, setShake] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (letter?.trim().length === 1) {
      setPop(true);
      setTimeout(() => setPop(false), 200);
    }
  }, [letter]);

  useEffect(() => {
    if (
      !isLastGuessValid &&
      rowIdx == currentGuessIdx &&
      letter?.trim().length === 1
    ) {
      setShake(true);
      setTimeout(() => setShake(false), 200);
    }
  }, [isLastGuessValid]);

  useEffect(() => {
    if (rowIdx === currentGuessIdx - 1) {
      setTimeout(() => setFlipped(true), (idx + 1) * 200);
      setTimeout(() => setRevealed(true), (idx + 1) * 200 + 250);
    } else if (rowIdx < currentGuessIdx - 1) {
      setFlipped(false);
      setRevealed(true);
    }
  }, [currentGuessIdx]);

  return (
    <div
      className={cn(
        'w-full h-full min-h-12 max-w-16 aspect-square border-2 text-3xl font-bold flex justify-center items-center select-none',
        pop && 'animate-[pop-subtle_0.2s_ease-in-out]',
        shake && 'animate-[shakeX_0.2s_ease-in-out]',
        flipped && 'animate-[flipX_0.5s_ease-in-out]',
        revealed &&
          tileVariants({
            status:
              rowIdx === currentGuessIdx
                ? 'empty'
                : getTileStatus(letter, idx, solution),
          })
      )}
    >
      {letter || ' '}
    </div>
  );
}

function getTileStatus(
  letter: string,
  index: number,
  solution: string
): GuessStatus {
  if (!letter.trim()) return 'empty';
  if (solution[index] === letter) return 'correct';
  if (solution.includes(letter)) return 'present';
  return 'absent';
}
