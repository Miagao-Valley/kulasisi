import React from 'react';
import getUser from '@/lib/users/getUser';
import Overview from './Overview';
import StatsTab from './StatsTab';
import PhrasesTab from './PhrasesTab';
import TranslationsTab from './TranslationsTab';
import Link from 'next/link';

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
      </div>
      {currentTab === 'stats' ? (
        <div role="tabpanel" className="p-6">
          <StatsTab user={user} />
        </div>
      ) : currentTab === 'phrases' ? (
        <div role="tabpanel" className="p-6">
          <PhrasesTab user={user} />
        </div>
      ) : currentTab === 'translations' ? (
        <div role="tabpanel" className="p-6">
          <TranslationsTab user={user} />
        </div>
      ) : null}
    </>
  );
}
