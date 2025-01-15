import React from 'react';
import getWord from '@/lib/words/getWord';
import getVotes from '@/lib/vote/getVotes';
import getWordRevisions from '@/lib/words/getWordRevisions';
import WordCard from '../WordCard';
import DefinitionsSection from '../definitions/DefinitionsSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs-with-url';

interface Props {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | undefined };
}

export default async function PostPage({ params, searchParams }: Props) {
  const id = Number(params.id);
  const word = await getWord(id);
  const votes = await getVotes(word);
  const revisions = await getWordRevisions(id);

  return (
    <>
      <WordCard
        className="m-0 mb-3 p-0"
        word={word}
        votes={votes}
        revisions={revisions.results}
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
