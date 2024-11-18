'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/components/AuthProvider';
import { Translation, TranslationRevision } from '@/types';
import PostHeader from '../../PostHeader';
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

export function TranslationsContent({ translation, revisions, className = '' }: Props) {
  const auth = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const copyLinkToClipboard = () => {
    const link = `${window.location.origin}/posts/${translation.text_entry}/#translation-${translation.id}`;
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
      {isEditing ? (
        <div className="mb-2" onClick={(e) => e.stopPropagation()}>
          <UpdateTranslationForm
            textEntryId={translation.text_entry}
            id={translation.id}
            initialContent={translation.content}
            setIsEditing={setIsEditing}
          />
        </div>
      ) : (
        <>
          <div className="flex gap-3 mb-2">
            <PostHeader entry={translation} className='flex-1' />
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
                  <a onClick={() => showRevisionsModal(translation.id)}>
                    <FaClock /> Edits
                  </a>
                </li>
                {auth.username === translation.author && (
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
            </details>
          </div>

          <div className="flex gap-3">
            <Link href={`/posts/${translation.text_entry}#translation${translation.id}`} className='flex-1 mb-2 hover:text-primary'>
              <p className="whitespace-pre-line">{translation.content}</p>
            </Link>
          </div>
        </>
      )}
      <div onClick={(e) => e.stopPropagation()}>
        <TranslationRevisionsModal id={translation.id} revisions={revisions} />
        <DeleteTranslationModal
          textEntryId={translation.text_entry}
          id={translation.id}
        />
      </div>
    </div>
  );
}
