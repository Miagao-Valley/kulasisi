'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/components/AuthProvider';
import { Word, WordRevision } from '@/types/dictionary';
import EntryHeader from '../components/EntryHeader';
import UpdateWordForm from './[id]/UpdateWordForm';
import DeleteWordModal from './[id]/DeleteWordModal';
import WordRevisionsModal from './[id]/revisions/WordRevisionsModal';
import { FaClock, FaLink, FaPen, FaTrash } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';

interface Props {
  word: Word;
  revisions: WordRevision[];
  className?: string;
}

export default function WordContent({
  word,
  revisions,
  className = '',
}: Props) {
  const auth = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const copyLinkToClipboard = () => {
    const link = `${window.location.origin}/dictionary/${word.id}/`;
    navigator.clipboard.writeText(link);
  };

  const showDeleteModal = () => {
    const modal = document.getElementById(
      'delete-word-modal',
    ) as HTMLDialogElement;
    modal?.showModal();
  };

  return (
    <div className={`${className}`}>
      <div className="flex gap-3 mb-2">
        <EntryHeader entry={word} className="flex-1" />
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
              <a href={`#revisions-${word.id}`}>
                <FaClock /> Edits
              </a>
            </li>
            {auth.username === word.contributor && (
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
          <UpdateWordForm
            id={word.id}
            initialWord={word.word}
            setIsEditing={setIsEditing}
          />
        </div>
      ) : (
        <>
          <div className="flex gap-3">
            <Link
              href={`/dictionary/${word.id}/`}
              className="flex-1 mb-2 hover:text-primary"
            >
              <p className="text-xl font-bold mb-1">{word.word}</p>
            </Link>
          </div>
        </>
      )}
      <div onClick={(e) => e.stopPropagation()}>
        <DeleteWordModal id={word.id} />
        <WordRevisionsModal revisions={revisions} id={word.id} />
      </div>
    </div>
  );
}
