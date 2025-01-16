import React, { Suspense } from 'react';
import getLang from '@/lib/langs/getLang';
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs-with-url';

interface Props {
  params: {
    code: string;
  };
}

export default async function LanguagePage({ params }: Props) {
  const lang = await getLang(params.code);

  return (
    <>
      <Overview lang={lang} className="mb-5" />

      <Tabs defaultValue={'stats'}>
        <TabsList>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="phrases">Phrases</TabsTrigger>
          <TabsTrigger value="translations">Translations</TabsTrigger>
          <TabsTrigger value="words">Words</TabsTrigger>
          <TabsTrigger value="definitions">Definitions</TabsTrigger>
        </TabsList>

        <TabsContent value="stats">
          <StatsTab lang={lang} />
        </TabsContent>

        <TabsContent value="phrases">
          <Suspense fallback={<PhrasesListSkeleton />}>
            <PhrasesList filters={{ lang: lang.code }} />
          </Suspense>
        </TabsContent>

        <TabsContent value="translations">
          <Suspense fallback={<TranslationsListSkeleton />}>
            <TranslationsList filters={{ lang: lang.code }} />
          </Suspense>
        </TabsContent>

        <TabsContent value="words">
          <Suspense fallback={<WordsListSkeleton />}>
            <WordsList filters={{ lang: lang.code }} />
          </Suspense>
        </TabsContent>

        <TabsContent value="definitions">
          <Suspense fallback={<DefinitionsListSkeleton />}>
            <DefinitionsList filters={{ lang: lang.code }} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </>
  );
}
