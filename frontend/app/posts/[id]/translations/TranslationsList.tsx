'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/components/AuthProvider';
import { Translation, PaginationDetails, TranslationRevision } from '@/types';
import TextEntryFooter from '../../TextEntryFooter';
import UpdateTranslationForm from './UpdateTranslationForm';
import { DeleteTranslationModal } from './DeleteTranslationModal';
import { FaClock, FaPen, FaTrash } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';
import TranslationRevisionsModal from '../revisions/TranslationRevisionsModal';
import getTranslationRevisions from '@/lib/translations/getTranslationRevisions';

interface Props {
  translations?: PaginationDetails & { results: Translation[] };
  className?: string;
}

export default function TranslationsList({ translations, className }: Props) {
  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {translations &&
      translations.results &&
      translations.results.length > 0 ? (
        translations.results.map((translation) => (
          <li key={translation.id}>
            <TranslationsListItem translation={translation} />
          </li>
        ))
      ) : (
        <li className="w-full col-span-full p-3 text-center">
          <div>No translations found</div>
        </li>
      )}
    </ul>
  );
}

interface ItemProps {
  translation: Translation;
  className?: string;
}

export function TranslationsListItem({
  translation,
  className = '',
}: ItemProps) {
  const auth = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [revisions, setRevisions] = useState<TranslationRevision[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { results } = await getTranslationRevisions(translation.id);
      setRevisions(results);
    };

    fetch();
  }, [translation.text_entry, translation.id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const showDeleteModal = (id: number) => {
    (
      document.getElementById(
        `delete-translation-modal-${id}`
      ) as HTMLFormElement
    )?.showModal();
  };

  const showRevisionsModal = (id: number) => {
    (
      document.getElementById(`translation-revisions-${id}`) as HTMLFormElement
    )?.showModal();
  };

  return (
    <div
      className={`px-4 py-3 border rounded-lg flex flex-col ${className}`}
      id={`translation${translation.id}`}
    >
      <TranslationRevisionsModal id={translation.id} revisions={revisions} />
      <DeleteTranslationModal
        textEntryId={translation.text_entry}
        id={translation.id}
      />
      {isEditing ? (
        <UpdateTranslationForm
          textEntryId={translation.text_entry}
          id={translation.id}
          initialContent={translation.content}
          setIsEditing={setIsEditing}
          className="mb-2"
        />
      ) : (
        <div className="flex gap-3">
          <p className="flex-1 mb-2 whitespace-pre-line">
            {translation.content}
          </p>
          <div>
            <details className="dropdown dropdown-bottom dropdown-end">
              <summary className="btn btn-ghost btn-sm btn-circle">
                <MdMenu />
              </summary>
              <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
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
        </div>
      )}
      <TextEntryFooter textEntry={translation} />
    </div>
  );
}

interface SkeletonProps {
  className?: string;
}

export function TranslationsListSkeleton({ className = '' }: SkeletonProps) {
  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: 10 }, (_, i) => (
        <li className="skeleton rounded-lg w-full h-24" key={i}></li>
      ))}
    </ul>
  );
}
