import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useWordleContext } from './WordleContext';
import { GuessStatus } from './WordleContext';
import { Button } from '@/components/ui/button';
import { CornerDownLeftIcon, DeleteIcon } from 'lucide-react';

const keys = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
];

interface KeyboardProps {
  className?: string;
}
export default function Keyboard({ className }: KeyboardProps) {
  const { addLetter, removeLetter, submitGuess } = useWordleContext();

  const handleKeyClick = (key: string) => () => {
    if (key === 'Enter') {
      submitGuess();
    } else if (key === 'Backspace') {
      removeLetter();
    } else if (/^[A-Z]$/.test(key)) {
      addLetter(key);
    }
  };

  return (
    <div
      className={cn(
        className,
        'flex flex-col gap-1 justify-center items-center'
      )}
    >
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 justify-center items-center">
          {row.map((key) => (
            <Key key={key} keyValue={key} onClick={handleKeyClick(key)} />
          ))}
        </div>
      ))}
    </div>
  );
}

export const keyVariants = cva('', {
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

export function Key({
  keyValue,
  onClick,
}: {
  keyValue: string;
  onClick: () => void;
}) {
  const { guesses, currentGuessIdx, solution } = useWordleContext();

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        'min-w-4 max-w-8 aspect-square rounded-sm text-lg font-bold border-2 select-none',
        'hover:scale-110 hover:duration-200 hover:ease-in-out',
        keyVariants({
          status: getGuessStatus(
            keyValue,
            guesses.slice(0, currentGuessIdx),
            solution
          ),
        })
      )}
      onClick={onClick}
    >
      {keyValue === 'Enter' ? (
        <CornerDownLeftIcon />
      ) : keyValue === 'Backspace' ? (
        <DeleteIcon />
      ) : (
        keyValue
      )}
    </Button>
  );
}

function getGuessStatus(
  letter: string,
  guessed: string[],
  solution: string
): GuessStatus {
  if (!/^[A-Z]$/.test(letter)) return 'empty';
  if (guessed.length === 0) return 'empty';

  let guessStatus: GuessStatus = 'empty';

  for (const guess of guessed) {
    if (guess.includes(letter)) {
      guessStatus = 'absent';

      if (solution.includes(letter)) {
        guessStatus = 'present';

        for (let i = 0; i < guess.length; i++) {
          if (guess[i] === letter && solution[i] === letter) {
            return 'correct';
          }
        }
      }
    }
  }

  return guessStatus;
}
