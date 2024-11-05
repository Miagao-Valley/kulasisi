import React from 'react';
import { TranslationRevision } from '@/types';
import TextEntryRevisionsList from './TextEntryRevisionsList';

interface Props {
  id: number;
  revisions: TranslationRevision[];
}

export default function TranslationRevisionsModal({ id, revisions }: Props) {
  return (
    <>
      <dialog
        className="modal modal-bottom sm:modal-middle"
        id={`translation-revisions-${id}`}
      >
        <div className="modal-box">
          <form method="dialog" className="flex mb-1">
            <h1 className="text-base font-bold">Edits</h1>
            <button className="btn btn-sm btn-circle btn-ghost ms-auto">
              ✕
            </button>
          </form>
          <TextEntryRevisionsList revisions={revisions} />
        </div>
      </dialog>
    </>
  );
}
