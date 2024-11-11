import React from 'react';
import getUser from '@/lib/users/getUser';
import Overview from './Overview';
import LanguagesTab from './LanguagesTab';
import PostsTab from './PostsTab';
import TranslationsTab from './TranslationsTab';

interface Props {
  params: {
    username: string;
  };
}

export default async function UserPage({ params }: Props) {
  const user = await getUser(params.username);

  return (
    <>
      <Overview user={user} />

      <div role="tablist" className="tabs tabs-bordered">
        <input
          type="radio"
          name="user_tabs"
          role="tab"
          className="tab"
          aria-label="Languages"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content p-10">
          <LanguagesTab user={user} />
        </div>

        <input
          type="radio"
          name="user_tabs"
          role="tab"
          className="tab"
          aria-label="Posts"
        />
        <div role="tabpanel" className="tab-content p-10">
          <PostsTab user={user} />
        </div>

        <input
          type="radio"
          name="user_tabs"
          role="tab"
          className="tab"
          aria-label="Translations"
        />
        <div role="tabpanel" className="tab-content p-10">
          <TranslationsTab user={user} />
        </div>
      </div>
    </>
  );
}
