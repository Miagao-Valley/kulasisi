import React from 'react';
import Link from 'next/link';
import getLang from '@/lib/langs/getLang';
import Overview from './Overview';
import StatsTab from './StatsTab';
import PhrasesList from '@/app/phrases/PhrasesList';
import TranslationsList from '@/app/phrases/[id]/translations/TranslationsList';
import WordsList from '@/app/dictionary/WordsList';
import DefinitionsList from '@/app/dictionary/[id]/definitions/DefinitionsList';

interface Props {
  params: {
    code: string;
  };
  searchParams: {
    tab?: string;
  };
}

export default async function LanguagePage({ params, searchParams }: Props) {
  const lang = await getLang(params.code);

  const currentTab = searchParams?.tab || 'stats';

  return (
    <>
      <Overview lang={lang} className="mb-5" />

      <div role="tablist" className="tabs tabs-bordered w-fit">
        <Link
          href="?tab=stats"
          role="tab"
          className={`tab ${currentTab === 'stats' ? 'tab-active' : ''}`}
          aria-label="Stats"
        >
          Stats
        </Link>
        <Link
          href="?tab=phrases"
          role="tab"
          className={`tab ${currentTab === 'phrases' ? 'tab-active' : ''}`}
          aria-label="Phrases"
        >
          Phrases
        </Link>
        <Link
          href="?tab=translations"
          role="tab"
          className={`tab ${currentTab === 'translations' ? 'tab-active' : ''}`}
          aria-label="Translations"
        >
          Translations
        </Link>
        <Link
          href="?tab=words"
          role="tab"
          className={`tab ${currentTab === 'words' ? 'tab-active' : ''}`}
          aria-label="Words"
        >
          Words
        </Link>
        <Link
          href="?tab=definitions"
          role="tab"
          className={`tab ${currentTab === 'definitions' ? 'tab-active' : ''}`}
          aria-label="Definitions"
        >
          Definitions
        </Link>
      </div>
      {currentTab === 'stats' ? (
        <div role="tabpanel" className="p-6">
          <StatsTab lang={lang} />
        </div>
      ) : currentTab === 'phrases' ? (
        <div role="tabpanel" className="p-6">
          <PhrasesList filters={{ lang: lang.code }} />
        </div>
      ) : currentTab === 'translations' ? (
        <div role="tabpanel" className="p-6">
          <TranslationsList filters={{ lang: lang.code }} />
        </div>
      ) : currentTab === 'words' ? (
        <div role="tabpanel" className="p-6">
          <WordsList filters={{ lang: lang.code }} />
        </div>
      ) : currentTab === 'definitions' ? (
        <div role="tabpanel" className="p-6">
          <DefinitionsList filters={{ lang: lang.code }} />
        </div>
      ) : null}
    </>
  );
}
