import React from 'react';
import Link from 'next/link';
import getTextEntry from '@/lib/textEntries/getTextEntry';
import getTextEntryRevisions from '@/lib/textEntries/getTextEntryRevisions';
import TextEntryContent from '../TextEntryContent';
import PostFooter from '../PostFooter';
import TranslationsSection from './translations/TranslationsSection';

interface Props {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | undefined };
}

export default async function PostPage({ params, searchParams }: Props) {
  const id = Number(params.id);
  const textEntry = await getTextEntry(id);
  const revisions = await getTextEntryRevisions(id);

  const currentTab = searchParams?.tab || 'translations';

  return (
    <>
      <div className="mb-3">
        <TextEntryContent textEntry={textEntry} revisions={revisions.results} />
        <PostFooter entry={textEntry} type="text-entries" />
      </div>

      <div role="tablist" className="tabs tabs-bordered w-fit">
        <Link
          href="?tab=translations"
          role="tab"
          className={`tab ${currentTab === 'translations' ? 'tab-active' : ''}`}
          aria-label="Translations"
        >
          Translations
        </Link>
      </div>
      {currentTab === 'translations' ? (
        <div role="tabpanel" className="p-6">
          <TranslationsSection
            searchParams={searchParams}
            textEntry={textEntry}
          />
        </div>
      ) : null}
    </>
  );
}
