import React, { Suspense } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import getUser from '@/lib/users/getUser';
import Overview from './Overview';
import StatsTab from './StatsTab';
import PhrasesList, { PhrasesListSkeleton } from '@/app/phrases/PhrasesList';
import TranslationsList, { TranslationsListSkeleton } from '@/app/phrases/translations/TranslationsList';
import WordsList, { WordsListSkeleton } from '@/app/dictionary/WordsList';
import DefinitionsList, { DefinitionsListSkeleton } from '@/app/dictionary/definitions/DefinitionsList';

interface Props {
  params: {
    username: string;
  };
  searchParams: {
    tab?: string;
  };
}

export default async function UserPage({ params, searchParams }: Props) {
  const user = await getUser(params.username);

  const currentTab = searchParams?.tab || 'stats';

  return (
    <>
      <Overview user={user} className="mb-5" />

      <Tabs defaultValue={currentTab}>
        <TabsList>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="phrases">Phrases</TabsTrigger>
          <TabsTrigger value="translations">Translations</TabsTrigger>
          <TabsTrigger value="words">Words</TabsTrigger>
          <TabsTrigger value="definitions">Definitions</TabsTrigger>
        </TabsList>

        <TabsContent value="stats">
          <StatsTab user={user} />
        </TabsContent>

        <TabsContent value="phrases">
          <Suspense fallback={<PhrasesListSkeleton />}>
            <PhrasesList filters={{ contributor: user.username }} />
          </Suspense>
        </TabsContent>

        <TabsContent value="translations">
          <Suspense fallback={<TranslationsListSkeleton />}>
            <TranslationsList filters={{ contributor: user.username }} />
          </Suspense>
        </TabsContent>

        <TabsContent value="words">
          <Suspense fallback={<WordsListSkeleton />}>
            <WordsList filters={{ contributor: user.username }} />
          </Suspense>
        </TabsContent>

        <TabsContent value="definitions">
          <Suspense fallback={<DefinitionsListSkeleton />}>
            <DefinitionsList filters={{ contributor: user.username }} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </>
  );
}
