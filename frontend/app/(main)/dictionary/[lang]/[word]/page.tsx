import React from 'react';
import getWord from '@/lib/words/getWord';
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
