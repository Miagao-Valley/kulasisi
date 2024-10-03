'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaPen } from 'react-icons/fa';
import naturalTime from '@/utils/naturalTime';
import { TextEntry } from '@/types';
import UpdateTextEntryForm from './UpdateTextEntryForm';

interface Props {
  textEntry: TextEntry;
  className?: string;
}

export default function TextEntryItem({ textEntry, className = '' }: Props) {
  const updatedAt = new Date(textEntry.updated_at);

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className={`${className}`}>
      <div className="mb-3">
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
            <p className="flex-1 mb-2 whitespace-pre-line">
              {textEntry.content}
            </p>
            <button
              onClick={handleEdit}
              className="btn btn-ghost btn-circle btn-sm"
            >
              <FaPen className="text-default" />
            </button>
          </div>
        )}
        <div className="flex">
          <Link href={`/languages/${textEntry.lang}/`}>
            <span className="badge badge-primary [&:not(:hover)]:badge-outline">
              {textEntry.lang}
            </span>
          </Link>
          <span className="ms-auto text-sm">{naturalTime(updatedAt)}</span>
        </div>
      </div>
    </div>
  );
}
