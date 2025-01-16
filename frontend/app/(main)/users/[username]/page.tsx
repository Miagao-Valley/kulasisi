import React, { Suspense } from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs-with-url';
import getUser from '@/lib/users/getUser';
import Overview from './Overview';
import StatsTab from './StatsTab';
import PhrasesList, {
  PhrasesListSkeleton,
} from '@/app/(main)/phrases/PhrasesList';
import TranslationsList, {
  TranslationsListSkeleton,
} from '@/app/(main)/phrases/translations/TranslationsList';
import WordsList, {
  WordsListSkeleton,
} from '@/app/(main)/dictionary/WordsList';
import DefinitionsList, {
  DefinitionsListSkeleton,
} from '@/app/(main)/dictionary/definitions/DefinitionsList';

interface Props {
  params: {
    username: string;
  };
}

export default async function UserPage({ params }: Props) {
  const user = await getUser(params.username);

  return (
    <>
      <Overview user={user} className="mb-5" />

      <Tabs defaultValue={'stats'}>
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
