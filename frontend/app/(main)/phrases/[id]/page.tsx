import React from 'react';
import { Metadata } from 'next';
import { getPhrase } from '@/lib/phrases/getPhrase';
import { PhraseCard } from '../PhraseCard';
import { TranslationsSection } from '../translations/TranslationsSection';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs-with-url';

interface Props {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);

  const phrase = await getPhrase(id);
  const truncatedContent =
    phrase.content.length > 50
      ? phrase.content.slice(0, 50) + '...'
      : phrase.content;

  return {
    title: `${truncatedContent} | ${phrase.lang.toUpperCase()} Phrasebook`,
    description: `${truncatedContent} (${phrase.lang.toUpperCase()})`,
  };
}

export default async function PhrasePage({ params, searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const resolvedSarams = await params;
  const id = Number(resolvedSarams.id);
  const phrase = await getPhrase(id);

  return (
    <>
      <PhraseCard className="m-0 mb-3 p-0" phrase={phrase} />

      <Tabs defaultValue={'translations'}>
        <TabsList>
          <TabsTrigger value="translations">Translations</TabsTrigger>
        </TabsList>

        <TabsContent value="translations">
          <TranslationsSection
            phrase={phrase}
            searchParams={resolvedSearchParams}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
