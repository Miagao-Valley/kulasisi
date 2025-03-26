import { Metadata } from 'next';
import { WordleProvider } from './WordleContext';
import { WordleGame } from './WordleGame';
import { GameStats } from './GameStats';
import { LangSelectWrapper } from './LangSelectWrapper';
import { WordLengthSlider } from './WordLengthSlider';
import { H1 } from '@/components/ui/heading-with-anchor';

export const metadata: Metadata = {
  title: 'Wordle',
  description: 'Can you guess the hidden word?',
};

interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function WordlePage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const { lang = 'eng' } = resolvedSearchParams;
  const wordLength = parseInt(resolvedSearchParams.len || '5');

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
      <WordleProvider lang={lang} wordLength={wordLength}>
        <WordleGame />
      </WordleProvider>
    </>
  );
}
