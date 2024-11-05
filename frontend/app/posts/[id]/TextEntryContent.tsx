'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/components/AuthProvider';
import { TextEntry, TextEntryRevision } from '@/types';
import UpdateTextEntryForm from './UpdateTextEntryForm';
import DeleteTextEntryModal from './DeleteTextEntryModal';
import { FaClock, FaLink, FaPen, FaTrash } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';
import TextEntryRevisionsModal from './revisions/TextEntryRevisionsModal';
import getTextEntryRevisions from '@/lib/textEntries/getTextEntryRevisions';

interface Props {
  textEntry: TextEntry;
}

export default function TextEntryContent({ textEntry }: Props) {
  const auth = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [revisions, setRevisions] = useState<TextEntryRevision[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { results } = await getTextEntryRevisions(textEntry.id);
      setRevisions(results);
    };

    fetch();
  }, [textEntry.id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const copyLinkToClipboard = () => {
    const link = `${window.location.origin}/text-entries/${textEntry.id}`;
    navigator.clipboard.writeText(link);
  };

  const showDeleteModal = () => {
    const modal = document.getElementById(
      'delete-text-entry-modal',
    ) as HTMLDialogElement;
    modal?.showModal();
  };

  return (
    <>
      {isEditing ? (
        <div className="mb-2">
          <UpdateTextEntryForm
            id={textEntry.id}
            initialContent={textEntry.content}
            setIsEditing={setIsEditing}
          />
        </div>
      ) : (
        <div className="flex gap-3">
          <p className="flex-1 mb-2 whitespace-pre-line">{textEntry.content}</p>
          <details className="dropdown dropdown-bottom dropdown-end">
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
                <a href={`#revisions`}>
                  <FaClock /> Edits
                </a>
              </li>
              {auth.username === textEntry.author && (
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
      )}
      <DeleteTextEntryModal id={textEntry.id} />
      <TextEntryRevisionsModal revisions={revisions} />
    </>
  );
}
