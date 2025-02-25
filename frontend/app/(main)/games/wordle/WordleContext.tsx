'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { toast } from 'sonner';
import getWordlist from '@/lib/words/getWordlist';

const DEFAULT_WORD_LENGTH = 5;
const DEFAULT_MAX_GUESSES = 6;

const loadState = () => {
  if (typeof window !== 'undefined') {
    const savedState = localStorage.getItem('wordleGameState');
    return savedState ? JSON.parse(savedState) : null;
  }
  return null;
};

export type GuessStatus = 'correct' | 'present' | 'absent' | 'empty';

interface WordleContextType {
  lang: string;
  wordLength: number;
  maxGuesses: number;
  wordlist: string[];
  solution: string;
  guesses: string[];
  currentGuessIdx: number;
  isLastGuessValid: boolean;
  addLetter: (letter: string) => void;
  removeLetter: () => void;
  submitGuess: () => void;
  saveGame: () => void;
  resetGame: () => void;
  gameStatus: 'playing' | 'won' | 'lost';
  loading: boolean;
  setLoading: (loading: boolean) => void;
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
  const [wordlist, setWordlist] = useState<string[]>([]);
  const [solution, setSolution] = useState(loadState()?.solution || '');
  const [guesses, setGuesses] = useState<string[]>(
    loadState()?.guesses || Array(maxGuesses).fill('')
  );
  const [currentGuessIdx, setCurrentGuessIdx] = useState<number>(
    loadState()?.currentGuessIdx || 0
  );
  const [isLastGuessValid, setIsLastGuessValid] = useState(false);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>(
    loadState()?.gameStatus || 'playing'
  );
  const [loading, setLoading] = useState(false);

  const fetchWordlist = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedWordlist = await getWordlist({
        lang__code: lang,
        len: wordLength,
        transform: 'upper',
      });
      setWordlist(fetchedWordlist);
    } catch (error) {
      console.error('Error fetching word list:', error);
    } finally {
      setLoading(false);
    }
  }, [lang, wordLength]);

  const saveGame = useCallback(() => {
    if (typeof window === 'undefined') return;
    const gameState = {
      solution,
      guesses,
      currentGuessIdx,
      gameStatus,
    };
    localStorage.setItem('wordleGameState', JSON.stringify(gameState));
  }, [solution, guesses, currentGuessIdx, gameStatus]);

  const resetGame = useCallback(() => {
    setLoading(true);
    setSolution('');
    setGuesses(Array(maxGuesses).fill(''));
    setCurrentGuessIdx(0);
    setGameStatus('playing');
    fetchWordlist();
    setLoading(false);
  }, [maxGuesses, lang, wordLength]);

  const addLetter = useCallback(
    (letter: string) => {
      if (loading || gameStatus !== 'playing') return;
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
    if (loading || gameStatus !== 'playing') return;
    if (guesses[currentGuessIdx]?.length === 0) return;
    setGuesses((prev) => {
      const newGuesses = [...prev];
      newGuesses[currentGuessIdx] =
        newGuesses[currentGuessIdx]?.slice(0, -1) || '';
      return newGuesses;
    });
  }, [guesses, currentGuessIdx, gameStatus, loading]);

  const submitGuess = useCallback(() => {
    if (loading || gameStatus !== 'playing') return;

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

    if (!wordlist.includes(currentGuess)) {
      toast.error('This word is not in the word list!');
      setIsLastGuessValid(false);
      return;
    }

    setIsLastGuessValid(true);

    if (currentGuess === solution) {
      setGameStatus('won');
    } else if (currentGuessIdx === maxGuesses - 1) {
      setGameStatus('lost');
    }

    setGuesses((prev) => {
      const newGuesses = [...prev];
      newGuesses[currentGuessIdx] = currentGuess;
      return newGuesses;
    });

    setCurrentGuessIdx((prev) => prev + 1);
  }, [
    wordlist,
    currentGuessIdx,
    guesses,
    maxGuesses,
    solution,
    wordLength,
    gameStatus,
    loading,
  ]);

  // Save game state on guess submit
  useEffect(() => {
    saveGame();
  }, [currentGuessIdx, solution]);

  // Restart game on word length change
  useEffect(() => {
    const previousLength = parseInt(
      localStorage.getItem('wordleWordLength') || '-1'
    );

    if (wordLength !== previousLength) {
      resetGame();
      localStorage.setItem('wordleWordLength', wordLength.toString());
    }
  }, [wordLength]);

  // Restart game on language change
  useEffect(() => {
    const previousLang = localStorage.getItem('wordleLang');

    if (lang !== previousLang) {
      resetGame();
      localStorage.setItem('wordleLang', lang);
    }
  }, [lang]);

  // Get word list
  useEffect(() => {
    fetchWordlist();
  }, []);

  // Generate a new solution on word list change
  useEffect(() => {
    if (wordlist.length > 0 && solution?.length !== wordLength) {
      const newSolution =
        wordlist[Math.floor(Math.random() * wordlist.length)].toUpperCase();
      setSolution(newSolution);
    }
  }, [wordlist]);

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
        wordlist,
        solution,
        guesses,
        currentGuessIdx,
        isLastGuessValid,
        addLetter,
        removeLetter,
        submitGuess,
        saveGame,
        resetGame,
        gameStatus,
        loading,
        setLoading,
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
