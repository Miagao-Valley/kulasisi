'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { toast } from 'sonner';
import { WordleGameStatus } from '@/types/games';
import { getWordleGame, submitWordleGuess } from '@/lib/games/wordle';

const DEFAULT_WORD_LENGTH = 5;
const DEFAULT_MAX_GUESSES = 6;

export type GuessStatus = 'correct' | 'present' | 'absent' | 'empty';

interface WordleContextType {
  lang: string;
  wordLength: number;
  maxGuesses: number;
  solution: string;
  guesses: string[];
  currentGuessIdx: number;
  isLastGuessValid: boolean;
  addLetter: (letter: string) => void;
  removeLetter: () => void;
  submitGuess: () => void;
  gameStatus: WordleGameStatus;
  resetGame: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: any;
  setError: (error: any) => void;
}

const WordleContext = createContext<WordleContextType | undefined>(undefined);

export const WordleProvider = ({
  lang,
  wordLength = DEFAULT_WORD_LENGTH,
  children,
}: {
  lang: string;
  wordLength?: number;
  children: React.ReactNode;
}) => {
  const maxGuesses = DEFAULT_MAX_GUESSES;
  const [solution, setSolution] = useState('');
  const [guesses, setGuesses] = useState<string[]>(Array(maxGuesses).fill(''));
  const [currentGuessIdx, setCurrentGuessIdx] = useState<number>(0);
  const [isLastGuessValid, setIsLastGuessValid] = useState(false);
  const [gameStatus, setGameStatus] = useState<WordleGameStatus>(
    WordleGameStatus.Playing
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  // Cache to store invalid words
  const invalidWordsCache = useRef<Set<string>>(new Set());

  const fetchGameState = useCallback(async () => {
    setLoading(true);
    const { result: fetchedGameState, error: err } = await getWordleGame(
      lang,
      wordLength
    );
    if (err) {
      setError(err);
      setLoading(false);
      return;
    }
    if (!fetchedGameState) {
      setLoading(false);
      return;
    }

    setSolution(fetchedGameState.solution);

    const guesses = fetchedGameState.guesses;
    const emptyGuesses = Array(maxGuesses - guesses.length).fill('');
    setGuesses(guesses.concat(emptyGuesses));
    setCurrentGuessIdx(guesses.length);

    setGameStatus(fetchedGameState.game_status);
    setLoading(false);
  }, [lang, wordLength, maxGuesses]);

  const resetGame = useCallback(() => {
    setLoading(true);

    setSolution('');
    setGuesses(Array(maxGuesses).fill(''));
    setCurrentGuessIdx(0);
    setGameStatus(WordleGameStatus.Playing);
    setError(null);

    fetchGameState();

    setLoading(false);

    invalidWordsCache.current.clear();
  }, [maxGuesses, lang, wordLength]);

  const addLetter = useCallback(
    (letter: string) => {
      if (loading || gameStatus !== WordleGameStatus.Playing) return;
      if (guesses[currentGuessIdx]?.length >= wordLength) return;
      if (letter.length !== 1) return;

      setGuesses((prev) => {
        const newGuesses = [...prev];
        newGuesses[currentGuessIdx] =
          (newGuesses[currentGuessIdx] || '') + letter;
        return newGuesses;
      });
    },
    [guesses, currentGuessIdx, wordLength, gameStatus, loading]
  );

  const removeLetter = useCallback(() => {
    if (loading || gameStatus !== WordleGameStatus.Playing) return;
    if (guesses[currentGuessIdx]?.length === 0) return;
    setGuesses((prev) => {
      const newGuesses = [...prev];
      newGuesses[currentGuessIdx] =
        newGuesses[currentGuessIdx]?.slice(0, -1) || '';
      return newGuesses;
    });
  }, [guesses, currentGuessIdx, gameStatus, loading]);

  const submitGuess = useCallback(async () => {
    if (loading || gameStatus !== WordleGameStatus.Playing) return;

    const currentGuess = guesses[currentGuessIdx];

    if (currentGuess?.length !== wordLength) {
      toast.error(
        guesses[currentGuessIdx]?.length === 0
          ? 'Enter a word first!'
          : 'This word is too short!'
      );
      setIsLastGuessValid(false);
      return;
    }

    if (guesses.slice(0, currentGuessIdx).includes(currentGuess)) {
      toast.error('You have already guessed this word!');
      setIsLastGuessValid(false);
      return;
    }

    if (invalidWordsCache.current.has(currentGuess)) {
      toast.error('This word is not in the dictionary!');
      setIsLastGuessValid(false);
      return;
    }

    setIsLastGuessValid(true);

    const { result, error } = await submitWordleGuess(
      lang,
      wordLength,
      currentGuess
    );

    if (error || result === null) {
      setIsLastGuessValid(false);
      toast.error(error.message);
      invalidWordsCache.current.add(currentGuess);
    } else {
      setIsLastGuessValid(true);

      const { game_status, guesses: updatedGuesses } = result.game;

      const emptyGuesses = Array(maxGuesses - updatedGuesses.length).fill('');
      setGuesses(updatedGuesses.concat(emptyGuesses));
      setCurrentGuessIdx(updatedGuesses.length);

      setGameStatus(game_status);
    }
  }, [
    guesses,
    currentGuessIdx,
    lang,
    wordLength,
    maxGuesses,
    gameStatus,
    loading,
  ]);

  // Get game state on mount
  useEffect(() => {
    if (solution.length === 0) {
      fetchGameState();
    }
  }, []);

  // Reset game on word length change
  useEffect(() => {
    const previousLength = parseInt(
      localStorage.getItem('wordleWordLength') || '-1'
    );

    if (wordLength !== previousLength) {
      resetGame();
      localStorage.setItem('wordleWordLength', wordLength.toString());
    }
  }, [wordLength]);

  // Reset game on language change
  useEffect(() => {
    const previousLang = localStorage.getItem('wordleLang');

    if (lang !== previousLang) {
      resetGame();
      localStorage.setItem('wordleLang', lang);
    }
  }, [lang]);

  // Handle key presses
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) {
        return;
      }
      setIsLastGuessValid(true);
      const key = event.key.toUpperCase();
      if (/^[A-Z]$/.test(key)) {
        addLetter(key);
      } else if (key === 'BACKSPACE') {
        removeLetter();
      } else if (key === 'ENTER') {
        submitGuess();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [addLetter, removeLetter, submitGuess]);

  return (
    <WordleContext.Provider
      value={{
        lang,
        wordLength,
        maxGuesses,
        solution,
        guesses,
        currentGuessIdx,
        isLastGuessValid,
        addLetter,
        removeLetter,
        submitGuess,
        gameStatus,
        resetGame,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </WordleContext.Provider>
  );
};

export const useWordleContext = () => {
  const context = useContext(WordleContext);
  if (!context) {
    throw new Error('useWordleContext must be used within a WordleProvider');
  }
  return context;
};
