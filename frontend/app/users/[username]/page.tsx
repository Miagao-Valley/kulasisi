import React from 'react';
import getUser from '@/lib/users/getUser';
import Overview from './Overview';
import LanguagesTab from './LanguagesTab';
import PostsTab from './PostsTab';
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

  const currentTab = searchParams?.tab || 'languages';

  return (
    <>
      <Overview user={user} className="mb-5" />

      <div role="tablist" className="tabs tabs-bordered w-fit">
        <Link
          href="?tab=languages"
          role="tab"
          className={`tab ${currentTab === 'languages' ? 'tab-active' : ''}`}
          aria-label="Languages"
        >
          Languages
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
          aria-label="Translations"
        >
          Translations
        </Link>
      </div>
      {currentTab === 'languages' ? (
        <div role="tabpanel" className="p-6">
          <LanguagesTab user={user} />
        </div>
      ) : currentTab === 'posts' ? (
        <div role="tabpanel" className="p-6">
          <PostsTab user={user} />
        </div>
      ) : currentTab === 'translations' ? (
        <div role="tabpanel" className="p-6">
          <TranslationsTab user={user} />
        </div>
      ) : null}
    </>
  );
}
