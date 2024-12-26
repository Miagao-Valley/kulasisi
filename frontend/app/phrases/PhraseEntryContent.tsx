'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/components/AuthProvider';
import { PhraseEntry, PhraseEntryRevision } from '@/types';
import EntryHeader from '../components/EntryHeader';
import UpdatePhraseEntryForm from './[id]/UpdatePhraseEntryForm';
import DeletePhraseEntryModal from './[id]/DeletePhraseEntryModal';
import PhraseEntryRevisionsModal from './[id]/revisions/PhraseEntryRevisionsModal';
import { FaClock, FaLink, FaPen, FaTrash } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';

interface Props {
  phraseEntry: PhraseEntry;
  revisions: PhraseEntryRevision[];
  className?: string;
}

export default function PhraseEntryContent({
  phraseEntry,
  revisions,
  className = '',
}: Props) {
  const auth = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    (document.activeElement as HTMLElement)?.blur();
    setIsEditing(true);
  };

  const copyLinkToClipboard = () => {
    const link = `${window.location.origin}/phrases/${phraseEntry.id}/`;
    navigator.clipboard.writeText(link);
  };

  const showDeleteModal = () => {
    const modal = document.getElementById(
      'delete-phrase-entry-modal',
    ) as HTMLDialogElement;
    modal?.showModal();
  };

  return (
    <div className={`${className}`}>
      <div className="flex gap-3 mb-2">
        <EntryHeader entry={phraseEntry} className="flex-1" />
        <details
          className="dropdown dropdown-bottom dropdown-end"
          onClick={(e) => e.stopPropagation()}
        >
          <summary className="btn btn-ghost btn-sm btn-circle">
            <MdMenu />
          </summary>
          <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li>
              <a onClick={copyLinkToClipboard}>
                <FaLink /> Copy link
              </a>
            </li>
            <li>
              <a href={`#revisions-${phraseEntry.id}`}>
                <FaClock /> Edits
              </a>
            </li>
            {auth.username === phraseEntry.contributor && (
              <>
                <li>
                  <a onClick={handleEdit}>
                    <FaPen /> Edit
                  </a>
                </li>
                <li>
                  <a className="text-error" onClick={showDeleteModal}>
                    <FaTrash /> Delete
                  </a>
                </li>
              </>
            )}
          </ul>
        </details>
      </div>
      {isEditing ? (
        <div className="mb-2" onClick={(e) => e.stopPropagation()}>
          <UpdatePhraseEntryForm
            id={phraseEntry.id}
            initialContent={phraseEntry.content}
            setIsEditing={setIsEditing}
          />
        </div>
      ) : (
        <>
          <div className="flex gap-3">
            <Link
              href={`/phrases/${phraseEntry.id}/`}
              className="flex-1 mb-2 hover:text-primary"
            >
              <p className="whitespace-pre-line">{phraseEntry.content}</p>
            </Link>
          </div>
        </>
      )}
      <div onClick={(e) => e.stopPropagation()}>
        <DeletePhraseEntryModal id={phraseEntry.id} />
        <PhraseEntryRevisionsModal revisions={revisions} id={phraseEntry.id} />
      </div>
    </div>
  );
}
