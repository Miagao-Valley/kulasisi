import React from 'react';
import { TextEntryRevision } from '@/types';
import TextEntryRevisionsList from './TextEntryRevisionsList';

interface Props {
  revisions: TextEntryRevision[];
  id: number;
}

export default function TextEntryRevisionsModal({ revisions, id }: Props) {
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
          <TextEntryRevisionsList revisions={revisions} />
        </div>
      </div>
    </>
  );
}
