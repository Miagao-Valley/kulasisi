import React from 'react';
import getPhrase from '@/lib/phrases/getPhrase';
import getVotes from '@/lib/vote/getVotes';
import getPhraseRevisions from '@/lib/phrases/getPhraseRevisions';
import PhraseCard from '../PhraseCard';
import TranslationsSection from '../translations/TranslationsSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs-with-url';

interface Props {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | undefined };
}

export default async function PhrasePage({ params, searchParams }: Props) {
  const id = Number(params.id);
  const phrase = await getPhrase(id);
  const votes = await getVotes(phrase);
  const revisions = await getPhraseRevisions(id);

  return (
    <>
      <PhraseCard
        className="m-0 mb-3 p-0"
        phrase={phrase}
        votes={votes}
        revisions={revisions.results}
        clickable={false}
      />

      <Tabs defaultValue={'translations'}>
        <TabsList>
          <TabsTrigger value="translations">Translations</TabsTrigger>
        </TabsList>

        <TabsContent value="translations">
          <TranslationsSection phrase={phrase} searchParams={searchParams} />
        </TabsContent>
      </Tabs>
    </>
  );
}
