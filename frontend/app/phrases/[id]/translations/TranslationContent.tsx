'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/components/AuthProvider';
import { Translation, TranslationRevision } from '@/types/phrases';
import EntryHeader from '../../../components/EntryHeader';
import UpdateTranslationForm from './UpdateTranslationForm';
import DeleteTranslationModal from './DeleteTranslationModal';
import TranslationRevisionsModal from '../revisions/TranslationRevisionsModal';
import { FaClock, FaLink, FaPen, FaTrash } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';

interface Props {
  translation: Translation;
  revisions: TranslationRevision[];
  className?: string;
}

export function TranslationsContent({
  translation,
  revisions,
  className = '',
}: Props) {
  const auth = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const copyLinkToClipboard = () => {
    const link = `${window.location.origin}/phrases/${translation.phrase}/#translation-${translation.id}`;
    navigator.clipboard.writeText(link);
  };

  const showDeleteModal = (id: number) => {
    (
      document.getElementById(
        `delete-translation-modal-${id}`,
      ) as HTMLFormElement
    )?.showModal();
  };

  const showRevisionsModal = (id: number) => {
    (
      document.getElementById(`translation-revisions-${id}`) as HTMLFormElement
    )?.showModal();
  };

  return (
    <div className={`${className}`}>
      <div className="flex gap-3 mb-2">
        <EntryHeader entry={translation} className="flex-1" />
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
              <a onClick={() => showRevisionsModal(translation.id)}>
                <FaClock /> Edits
              </a>
            </li>
            {auth.username === translation.contributor && (
              <>
                <li>
                  <a onClick={handleEdit}>
                    <FaPen /> Edit
                  </a>
                </li>
                <li>
                  <a
                    className="text-error"
                    onClick={() => showDeleteModal(translation.id)}
                  >
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
          <UpdateTranslationForm
            phraseId={translation.phrase}
            id={translation.id}
            initialContent={translation.content}
            setIsEditing={setIsEditing}
          />
        </div>
      ) : (
        <>
          <div className="flex gap-3">
            <Link
              href={`/phrases/${translation.phrase}#translation${translation.id}`}
              className="flex-1 mb-2 hover:text-primary"
            >
              <p className="whitespace-pre-line">{translation.content}</p>
            </Link>
          </div>
        </>
      )}
      <div onClick={(e) => e.stopPropagation()}>
        <TranslationRevisionsModal id={translation.id} revisions={revisions} />
        <DeleteTranslationModal
          phraseId={translation.phrase}
          id={translation.id}
        />
      </div>
    </div>
  );
}
