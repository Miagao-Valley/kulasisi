'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/components/AuthProvider';
import { Definition, DefinitionRevision } from '@/types';
import EntryHeader from '../../../components/EntryHeader';
import UpdateDefinitionForm from './UpdateDefinitionForm';
import DeleteDefinitionModal from './DeleteDefinitionModal';
import DefinitionRevisionsModal from '../revisions/DefinitionRevisionsModal';
import { FaClock, FaLink, FaPen, FaTrash } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';

interface Props {
  definition: Definition;
  revisions: DefinitionRevision[];
  className?: string;
}

export function DefinitionsContent({
  definition,
  revisions,
  className = '',
}: Props) {
  const auth = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const copyLinkToClipboard = () => {
    const link = `${window.location.origin}/dictionary/${definition.dict_entry}/#definition-${definition.id}`;
    navigator.clipboard.writeText(link);
  };

  const showDeleteModal = (id: number) => {
    (
      document.getElementById(
        `delete-definition-modal-${id}`,
      ) as HTMLFormElement
    )?.showModal();
  };

  const showRevisionsModal = (id: number) => {
    (
      document.getElementById(`definition-revisions-${id}`) as HTMLFormElement
    )?.showModal();
  };

  return (
    <div className={`${className}`}>
      <div className="flex gap-3 mb-2">
        <EntryHeader entry={definition} className="flex-1" />
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
              <a onClick={() => showRevisionsModal(definition.id)}>
                <FaClock /> Edits
              </a>
            </li>
            {auth.username === definition.contributor && (
              <>
                <li>
                  <a onClick={handleEdit}>
                    <FaPen /> Edit
                  </a>
                </li>
                <li>
                  <a
                    className="text-error"
                    onClick={() => showDeleteModal(definition.id)}
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
          <UpdateDefinitionForm
            dictEntryId={definition.dict_entry}
            id={definition.id}
            initialDescription={definition.description}
            setIsEditing={setIsEditing}
          />
        </div>
      ) : (
        <>
          <div className="flex gap-3">
            <Link
              href={`/dictionary/${definition.dict_entry}#definition${definition.id}`}
              className="flex-1 mb-2 hover:text-primary"
            >
              <p className="whitespace-pre-line">{definition.description}</p>
            </Link>
          </div>
        </>
      )}
      <div onClick={(e) => e.stopPropagation()}>
        <DefinitionRevisionsModal id={definition.id} revisions={revisions} />
        <DeleteDefinitionModal
          dictEntryId={definition.dict_entry}
          id={definition.id}
        />
      </div>
    </div>
  );
}
