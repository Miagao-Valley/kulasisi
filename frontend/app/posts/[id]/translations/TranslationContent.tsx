import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/components/AuthProvider';
import { Translation, TranslationRevision } from '@/types';
import getTranslationRevisions from '@/lib/translations/getTranslationRevisions';
import UpdateTranslationForm from './UpdateTranslationForm';
import DeleteTranslationModal from './DeleteTranslationModal';
import TranslationRevisionsModal from '../revisions/TranslationRevisionsModal';
import { FaClock, FaLink, FaPen, FaTrash } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';

interface Props {
  translation: Translation;
  className?: string;
}

export function TranslationsContent({ translation, className = '' }: Props) {
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

  const copyLinkToClipboard = () => {
    const link = `${window.location.origin}/posts/${translation.text_entry}/#translation-${translation.id}`;
    navigator.clipboard.writeText(link);
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
        <div className="flex gap-3">
          <p className="flex-1 mb-2 whitespace-pre-line">
            {translation.content}
          </p>
          <div>
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
        </div>
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
