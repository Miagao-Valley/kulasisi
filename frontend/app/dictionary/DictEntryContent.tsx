'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/components/AuthProvider';
import { DictEntry, DictEntryRevision } from '@/types';
import EntryHeader from '../components/EntryHeader';
import UpdateDictEntryForm from './[id]/UpdateDictEntryForm';
import DeleteDictEntryModal from './[id]/DeleteDictEntryModal';
import DictEntryRevisionsModal from './[id]/revisions/DictEntryRevisionsModal';
import { FaClock, FaLink, FaPen, FaTrash } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';

interface Props {
  dictEntry: DictEntry;
  revisions: DictEntryRevision[];
  className?: string;
}

export default function DictEntryContent({
  dictEntry,
  revisions,
  className = '',
}: Props) {
  const auth = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const copyLinkToClipboard = () => {
    const link = `${window.location.origin}/dictionary/${dictEntry.id}/`;
    navigator.clipboard.writeText(link);
  };

  const showDeleteModal = () => {
    const modal = document.getElementById(
      'delete-dict-entry-modal',
    ) as HTMLDialogElement;
    modal?.showModal();
  };

  return (
    <div className={`${className}`}>
      <div className="flex gap-3 mb-2">
        <EntryHeader entry={dictEntry} className="flex-1" />
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
              <a href={`#revisions-${dictEntry.id}`}>
                <FaClock /> Edits
              </a>
            </li>
            {auth.username === dictEntry.contributor && (
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
          <UpdateDictEntryForm
            id={dictEntry.id}
            initialWord={dictEntry.word}
            setIsEditing={setIsEditing}
          />
        </div>
      ) : (
        <>
          <div className="flex gap-3">
            <Link
              href={`/dictionary/${dictEntry.id}/`}
              className="flex-1 mb-2 hover:text-primary"
            >
              <p className="text-xl font-bold mb-1">{dictEntry.word}</p>
            </Link>
          </div>
        </>
      )}
      <div onClick={(e) => e.stopPropagation()}>
        <DeleteDictEntryModal id={dictEntry.id} />
        <DictEntryRevisionsModal revisions={revisions} id={dictEntry.id} />
      </div>
    </div>
  );
}
