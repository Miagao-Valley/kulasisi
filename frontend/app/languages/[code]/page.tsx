import React from 'react';
import Link from 'next/link';
import getLang from '@/lib/langs/getLang';
import Overview from './Overview';
import StatsTab from './StatsTab';
import PhrasesTab from './PhrasesTab';
import TranslationsTab from './TranslationsTab';

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
          aria-label="translations"
        >
          Translations
        </Link>
      </div>
      {currentTab === 'stats' ? (
        <div role="tabpanel" className="p-6">
          <StatsTab lang={lang} />
        </div>
      ) : currentTab === 'phrases' ? (
        <div role="tabpanel" className="p-6">
          <PhrasesTab lang={lang} />
        </div>
      ) : currentTab === 'translations' ? (
        <div role="tabpanel" className="p-6">
          <TranslationsTab lang={lang} />
        </div>
      ) : null}
    </>
  );
}
