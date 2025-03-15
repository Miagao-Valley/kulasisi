import React from 'react';
import getWord from '@/lib/words/getWord';
import getVotes from '@/lib/vote/getVotes';
import WordCard from '../../WordCard';
import DefinitionsSection from '../../definitions/DefinitionsSection';
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

export default async function PostPage({ params, searchParams }: Props) {
  const word = await getWord(params.lang, params.word);
  const votes = await getVotes(word);

  return (
    <>
      <WordCard
        className="m-0 mb-3 p-0"
        word={word}
        votes={votes}
        clickable={false}
      />

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
