import React from 'react';
import { PhraseEntryRevision } from '@/types';
import PhraseEntryRevisionsList from '../../../components/EntryRevisionsList';

interface Props {
  revisions: PhraseEntryRevision[];
  id: number;
}

export default function PhraseEntryRevisionsModal({ revisions, id }: Props) {
  return (
    <>
      <div
        className="modal modal-bottom sm:modal-middle"
        role="dialog"
        id={`revisions-${id}`}
      >
        <div className="modal-box">
          <div className="flex mb-1">
            <h1 className="text-base font-bold">Edits</h1>
            <a href="#" className="btn btn-sm btn-circle btn-ghost ms-auto">
              ✕
            </a>
          </div>
          <PhraseEntryRevisionsList revisions={revisions} />
        </div>
      </div>
    </>
  );
}
