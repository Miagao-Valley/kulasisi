import React from 'react';
import getTextEntry from '@/lib/textEntries/getTextEntry';
import TextEntryFooter from '../TextEntryFooter';
import TextEntryContent from '../TextEntryContent';
import TranslationsSection from './translations/TranslationsSection';
import Link from 'next/link';

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    tab?: string;
  };
}

export default async function PostPage({ params, searchParams }: Props) {
  const id = Number(params.id);
  const textEntry = await getTextEntry(id);

  const currentTab = searchParams?.tab || 'translations';

  return (
    <>
      <div className="mb-3">
        <TextEntryContent textEntry={textEntry} />
        <TextEntryFooter textEntry={textEntry} />
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
          <TranslationsSection textEntry={textEntry} />
        </div>
      ) : null}
    </>
  );
}
