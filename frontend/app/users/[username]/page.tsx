import React from 'react';
import Link from 'next/link';
import getUser from '@/lib/users/getUser';
import Overview from './Overview';
import StatsTab from './StatsTab';
import PhraseEntriesList from '@/app/phrases/PhraseEntriesList';
import TranslationsList from '@/app/phrases/[id]/translations/TranslationsList';
import DictEntriesList from '@/app/dictionary/DictEntriesList';
import DefinitionsList from '@/app/dictionary/[id]/definitions/DefinitionsList';

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
          <StatsTab user={user} />
        </div>
      ) : currentTab === 'phrases' ? (
        <div role="tabpanel" className="p-6">
          <PhraseEntriesList filters={{ user: user.username }} />
        </div>
      ) : currentTab === 'translations' ? (
        <div role="tabpanel" className="p-6">
          <TranslationsList filters={{ user: user.username }} />
        </div>
      ) : currentTab === 'words' ? (
        <div role="tabpanel" className="p-6">
          <DictEntriesList filters={{ user: user.username }} />
        </div>
      ) : currentTab === 'definitions' ? (
        <div role="tabpanel" className="p-6">
          <DefinitionsList filters={{ user: user.username }} />
        </div>
      ) : null}
    </>
  );
}
