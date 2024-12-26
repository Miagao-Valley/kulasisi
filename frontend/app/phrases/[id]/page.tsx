import React from 'react';
import Link from 'next/link';
import getPhrase from '@/lib/phrases/getPhrase';
import getPhraseRevisions from '@/lib/phrases/getPhraseRevisions';
import PhraseContent from '../PhraseContent';
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
  const phrase = await getPhrase(id);
  const revisions = await getPhraseRevisions(id);

  const currentTab = searchParams?.tab || 'translations';

  return (
    <>
      <div className="mb-3">
        <PhraseContent
          phrase={phrase}
          revisions={revisions.results}
        />
        <EntryFooter entry={phrase} type="phrases" />
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
            phrase={phrase}
          />
        </div>
      ) : null}
    </>
  );
}
