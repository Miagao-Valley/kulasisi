import React from 'react';
import Link from 'next/link';
import getDictEntry from '@/lib/dictEntries/getDictEntry';
import getDictEntryRevisions from '@/lib/dictEntries/getDictEntryRevisions';
import DictEntryContent from '../DictEntryContent';
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
  const dictEntry = await getDictEntry(id);
  const revisions = await getDictEntryRevisions(id);

  const currentTab = searchParams?.tab || 'definitions';

  return (
    <>
      <div className="mb-3">
        <DictEntryContent dictEntry={dictEntry} revisions={revisions.results} />
        <EntryFooter entry={dictEntry} type="dict-entries" />
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
          <DefinitionsSection dictEntry={dictEntry} searchParams={searchParams} />
        </div>
      ) : null}
    </>
  );
}
