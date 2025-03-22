'use server';

import { fetchAPI } from '@/utils/fetchAPI';
import { WordleGame, WordleGameStats } from '@/types/games';
import { Result } from '@/utils/try-catch';

export async function getWordleGame(
  lang: string,
  wordLength: number
): Promise<Result<WordleGame, any>> {
  return await fetchAPI(`/games/wordle/${lang}/${wordLength}/`, {
    authorized: true,
    cache: 'no-store',
  });
}

export async function submitWordleGuess(
  lang: string,
  wordLength: number,
  guess: string
): Promise<Result<{ game: WordleGame }, any>> {
  return await fetchAPI(`/games/wordle/${lang}/${wordLength}/`, {
    method: 'POST',
    body: JSON.stringify({ guess }),
    authorized: true,
  });
}

export async function getWordleGameStats(
  lang?: string,
  wordLength?: number
): Promise<Result<WordleGameStats, any>> {
  return await fetchAPI(`/games/wordle/stats/`, {
    params: { lang: lang, word_length: wordLength },
    authorized: true,
    cache: 'no-store',
  });
}
