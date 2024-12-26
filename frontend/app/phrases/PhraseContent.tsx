'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/components/AuthProvider';
import { Phrase, PhraseRevision } from '@/types';
import EntryHeader from '../components/EntryHeader';
import UpdatePhraseForm from './[id]/UpdatePhraseForm';
import DeletePhraseModal from './[id]/DeletePhraseModal';
import PhraseRevisionsModal from './[id]/revisions/PhraseRevisionsModal';
import { FaClock, FaLink, FaPen, FaTrash } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';

interface Props {
  phrase: Phrase;
  revisions: PhraseRevision[];
  className?: string;
}

export default function PhraseContent({
  phrase,
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
    const link = `${window.location.origin}/phrases/${phrase.id}/`;
    navigator.clipboard.writeText(link);
  };

  const showDeleteModal = () => {
    const modal = document.getElementById(
      'delete-phrase-modal',
    ) as HTMLDialogElement;
    modal?.showModal();
  };

  return (
    <div className={`${className}`}>
      <div className="flex gap-3 mb-2">
        <EntryHeader entry={phrase} className="flex-1" />
        <div
          className="dropdown dropdown-bottom dropdown-end"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-sm btn-circle"
          >
            <MdMenu />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <a onClick={copyLinkToClipboard}>
                <FaLink /> Copy link
              </a>
            </li>
            <li>
              <a href={`#revisions-${phrase.id}`}>
                <FaClock /> Edits
              </a>
            </li>
            {auth.username === phrase.contributor && (
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
        </div>
      </div>
      {isEditing ? (
        <div className="mb-2" onClick={(e) => e.stopPropagation()}>
          <UpdatePhraseForm
            id={phrase.id}
            initialContent={phrase.content}
            setIsEditing={setIsEditing}
          />
        </div>
      ) : (
        <>
          <div className="flex gap-3">
            <Link
              href={`/phrases/${phrase.id}/`}
              className="flex-1 mb-2 hover:text-primary"
            >
              <p className="whitespace-pre-line">{phrase.content}</p>
            </Link>
          </div>
        </>
      )}
      <div onClick={(e) => e.stopPropagation()}>
        <DeletePhraseModal id={phrase.id} />
        <PhraseRevisionsModal revisions={revisions} id={phrase.id} />
      </div>
    </div>
  );
}
