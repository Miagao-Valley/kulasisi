import React from 'react';
import getPhrase from '@/lib/phrases/getPhrase';
import getVotes from '@/lib/vote/getVotes';
import getPhraseRevisions from '@/lib/phrases/getPhraseRevisions';
import PhraseCard from '../PhraseCard';
import TranslationsSection from '../translations/TranslationsSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

  const currentTab = searchParams?.tab || 'translations';

  return (
    <>
      <PhraseCard
        className="mb-3"
        phrase={phrase}
        votes={votes}
        revisions={revisions.results}
      />

      <Tabs defaultValue={currentTab}>
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
