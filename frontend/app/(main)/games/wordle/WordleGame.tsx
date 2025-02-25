import React from 'react';
import { useWordleContext } from './WordleContext';
import Board from './Board';
import Keyboard from './Keyboard';
import GameEndModal from './GameEndModal';
import { Spinner } from '@/components/ui/spinner';

export default function WordleGame() {
  const { wordlist, solution, lang, wordLength, maxGuesses, loading } =
    useWordleContext();

  return (
    <>
      {loading ? (
        <Spinner />
      ) : wordlist.length < maxGuesses || solution.length !== wordLength ? (
        <div className="text-center">
          Not enough {wordLength}-letter words are available for '{lang}'.
        </div>
      ) : (
        <div className="flex flex-col gap-2 justify-center items-center">
          <GameEndModal />
          <Board className="mb-5" />
          <Keyboard />
        </div>
      )}
    </>
  );
}
