'use client';

import React, { useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { useAuth } from '@/app/components/AuthProvider';
import UpdateTextEntryForm from './UpdateTextEntryForm';
import { TextEntry } from '@/types';

interface Props {
  textEntry: TextEntry;
}

export default function TextEntryContent({ textEntry }: Props) {
  const auth = useAuth();

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <>
      {isEditing ? (
        <div className="mb-2">
          <UpdateTextEntryForm
            id={textEntry.id}
            initialContent={textEntry.content}
            onUpdate={() => setIsEditing(false)}
          />
        </div>
      ) : (
        <div className="flex">
          <p className="flex-1 mb-2 whitespace-pre-line">{textEntry.content}</p>
          {auth.username === textEntry.author && (
            <button
              onClick={handleEdit}
              className="btn btn-ghost btn-circle btn-sm"
            >
              <FaPen className="text-default" />
            </button>
          )}
        </div>
      )}
    </>
  );
}
