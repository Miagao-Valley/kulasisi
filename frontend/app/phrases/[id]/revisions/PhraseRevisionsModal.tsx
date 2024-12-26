import React from 'react';
import { PhraseRevision } from '@/types';
import PhraseRevisionsList from './PhraseRevisionsList';

interface Props {
  revisions: PhraseRevision[];
  id: number;
}

export default function PhraseRevisionsModal({ revisions, id }: Props) {
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
          <PhraseRevisionsList revisions={revisions} />
        </div>
      </div>
    </>
  );
}
