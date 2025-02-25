'use client';

import React, { useEffect } from 'react';
import { useSidebar } from '@/components/ui/sidebar';
import { WordleProvider } from './WordleContext';
import WordleGame from './WordleGame';
import LangSelectWrapper from './LangSelectWrapper';
import WordLengthSlider from './WordLengthSlider';
import { H1 } from '@/components/ui/heading-with-anchor';

interface Props {
  searchParams: { [key: string]: string | undefined };
}

export default function WordlePage({ searchParams }: Props) {
  const lang = searchParams.lang || 'eng';
  const wordLength = parseInt(searchParams.len || '5');

  const { setOpen } = useSidebar();

  useEffect(() => {
    setTimeout(() => setOpen(false), 100);
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <H1 className="mb-0">Wordle</H1>
        <div className="flex items-center gap-1">
          <WordLengthSlider currentLength={wordLength} />
          <LangSelectWrapper currentSelectedLang={lang} />
        </div>
      </div>
      <WordleProvider lang={lang} wordLength={wordLength}>
        <WordleGame />
      </WordleProvider>
    </>
  );
}
