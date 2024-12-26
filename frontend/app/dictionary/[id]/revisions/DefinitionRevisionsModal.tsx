import React from 'react';
import { DefinitionRevision } from '@/types';
import DefinitionRevisionsList from './DefinitionRevisionsList';

interface Props {
  id: number;
  revisions: DefinitionRevision[];
}

export default function DefinitionRevisionsModal({ id, revisions }: Props) {
  return (
    <>
      <dialog
        className="modal modal-bottom sm:modal-middle"
        id={`definition-revisions-${id}`}
      >
        <div className="modal-box">
          <form method="dialog" className="flex mb-1">
            <h1 className="text-base font-bold">Edits</h1>
            <button className="btn btn-sm btn-circle btn-ghost ms-auto">
              ✕
            </button>
          </form>
          <DefinitionRevisionsList revisions={revisions} />
        </div>
      </dialog>
    </>
  );
}
