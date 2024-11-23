import React from 'react';
import Link from 'next/link';
import getLang from '@/lib/langs/getLang';
import Overview from './Overview';
import StatsTab from './StatsTab';
import PostsTab from './PostsTab';
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
          href="?tab=posts"
          role="tab"
          className={`tab ${currentTab === 'posts' ? 'tab-active' : ''}`}
          aria-label="Posts"
        >
          Posts
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
      ) : currentTab === 'posts' ? (
        <div role="tabpanel" className="p-6">
          <PostsTab lang={lang} />
        </div>
      ) : currentTab === 'translations' ? (
        <div role="tabpanel" className="p-6">
          <TranslationsTab lang={lang} />
        </div>
      ) : null}
    </>
  );
}
