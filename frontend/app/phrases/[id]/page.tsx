import React from 'react';
import Link from 'next/link';
import getPhraseEntry from '@/lib/phraseEntries/getPhraseEntry';
import getPhraseEntryRevisions from '@/lib/phraseEntries/getPhraseEntryRevisions';
import PhraseEntryContent from '../PhraseEntryContent';
import EntryFooter from '../../components/EntryFooter';
import TranslationsSection from './translations/TranslationsSection';

interface Props {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | undefined };
}

export default async function PhrasePage({ params, searchParams }: Props) {
  const id = Number(params.id);
  const phraseEntry = await getPhraseEntry(id);
  const revisions = await getPhraseEntryRevisions(id);

  const currentTab = searchParams?.tab || 'translations';

  return (
    <>
      <div className="mb-3">
        <PhraseEntryContent
          phraseEntry={phraseEntry}
          revisions={revisions.results}
        />
        <EntryFooter entry={phraseEntry} type="phrase-entries" />
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
            phraseEntry={phraseEntry}
          />
        </div>
      ) : null}
    </>
  );
}
