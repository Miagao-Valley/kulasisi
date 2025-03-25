import React from 'react';
import { Metadata } from 'next';
import { getWord } from '@/lib/words/getWord';
import { WordCard } from '../../WordCard';
import { DefinitionsSection } from '../../definitions/DefinitionsSection';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs-with-url';

interface Props {
  params: {
    lang: string;
    word: string;
  };
  searchParams: { [key: string]: string | undefined };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, word: word_param } = params;

  const word = await getWord(lang, word_param);

  return {
    title: `${word.word} | ${word.lang.toUpperCase()} Dictionary`,
    description: `${word.word} (${word.lang.toUpperCase()}) - ${
      Object.keys(word.best_definitions)[0] || 'No definition'
    }`,
  };
}

export default async function PostPage({ params, searchParams }: Props) {
  const word = await getWord(params.lang, params.word);

  return (
    <>
      <WordCard className="m-0 mb-3 p-0" word={word} />

      <Tabs defaultValue={'definitions'}>
        <TabsList>
          <TabsTrigger value="definitions">Definitions</TabsTrigger>
        </TabsList>

        <TabsContent value="definitions">
          <DefinitionsSection word={word} searchParams={searchParams} />
        </TabsContent>
      </Tabs>
    </>
  );
}
