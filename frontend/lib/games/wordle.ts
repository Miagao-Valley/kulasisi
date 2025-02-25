'use server';

import fetcher, { FetchError } from '@/utils/fetcher';
import { WordleGame } from '@/types/games';
import getToken from '../tokens/getToken';

export async function getWordleGame(
  lang: string,
  wordLength: number
): Promise<{ result: WordleGame | null; error: any }> {
  try {
    const response = await fetcher(
      `/games/wordle/${lang}/${wordLength}/`,
      {
        cache: 'no-store',
      },
      getToken()
    );
    return { result: response, error: null };
  } catch (error) {
    const fetchError = error as FetchError;
    return { result: null, error: fetchError.resBody };
  }
}

export async function submitWordleGuess(
  lang: string,
  wordLength: number,
  guess: string
): Promise<{ result: WordleGame | null; error: any }> {
  try {
    const response = await fetcher(
      `/games/wordle/${lang}/${wordLength}/`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guess }),
      },
      getToken()
    );
    return { result: response, error: null };
  } catch (error) {
    const fetchError = error as FetchError;
    return { result: null, error: fetchError.resBody };
  }
}
