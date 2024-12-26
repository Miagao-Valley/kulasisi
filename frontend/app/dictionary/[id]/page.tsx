import React from 'react';
import Link from 'next/link';
import getWord from '@/lib/words/getWord';
import getWordRevisions from '@/lib/words/getWordRevisions';
import WordContent from '../WordContent';
import EntryFooter from '../../components/EntryFooter';
import DefinitionsSection from './definitions/DefinitionsSection';

interface Props {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | undefined };
}

export default async function PostPage({ params, searchParams }: Props) {
  const id = Number(params.id);
  const word = await getWord(id);
  const revisions = await getWordRevisions(id);

  const currentTab = searchParams?.tab || 'definitions';

  return (
    <>
      <div className="mb-3">
        <WordContent word={word} revisions={revisions.results} />
        <EntryFooter entry={word} type="words" />
      </div>

      <div role="tablist" className="tabs tabs-bordered w-fit">
        <Link
          href="?tab=definitions"
          role="tab"
          className={`tab ${currentTab === 'definitions' ? 'tab-active' : ''}`}
          aria-label="Definitions"
        >
          Definitions
        </Link>
      </div>
      {currentTab === 'definitions' ? (
        <div role="tabpanel" className="p-6">
          <DefinitionsSection
            word={word}
            searchParams={searchParams}
          />
        </div>
      ) : null}
    </>
  );
}
