'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { useSidebar } from '@/components/ui/sidebar';
import { WordleProvider } from './WordleContext';
import { WordleGame } from './WordleGame';
import { GameStats } from './GameStats';
import { LangSelectWrapper } from './LangSelectWrapper';
import { WordLengthSlider } from './WordLengthSlider';
import { H1 } from '@/components/ui/heading-with-anchor';
import Link from 'next/link';

interface Props {
  searchParams: { [key: string]: string | undefined };
}

export default function WordlePage({ searchParams }: Props) {
  const lang = searchParams.lang || 'eng';
  const wordLength = parseInt(searchParams.len || '5');

  const auth = useAuth();
  const { setOpen } = useSidebar();

  useEffect(() => {
    setTimeout(() => setOpen(false), 100);
  }, []);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5">
        <H1 className="mb-0">Wordle</H1>
        <div className="flex justify-between items-center gap-1 sm:w-fit w-full">
          <div className="flex gap-1">
            <WordLengthSlider currentLength={wordLength} />
            <LangSelectWrapper currentSelectedLang={lang} />
          </div>
          <div className="flex gap-1">
            <GameStats />
          </div>
        </div>
      </div>
      {auth.isAuthenticated ? (
        <WordleProvider lang={lang} wordLength={wordLength}>
          <WordleGame />
        </WordleProvider>
      ) : (
        <>
          <div className="text-center">
            Please{' '}
            <Link
              href={`/login?next=/games/wordle/`}
              className="underline underline-offset-4"
            >
              sign in
            </Link>{' '}
            to play Wordle.
          </div>
        </>
      )}
    </>
  );
}
