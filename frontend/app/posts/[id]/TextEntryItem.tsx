import React from 'react';
import Link from 'next/link';
import naturalTime from '@/utils/naturalTime';
import { TextEntry } from '@/types';
import UpdateTextEntryForm from './UpdateTextEntryForm';

interface Props {
  textEntry: TextEntry;
  className?: string;
}

export default async function TextEntryItem({
  textEntry,
  className = '',
}: Props) {
  const updatedAt = new Date(textEntry.updated_at);
  return (
    <div className={`${className}`}>
      <div className="mb-4">
        <p className="flex-1 mb-2 whitespace-pre-line">{textEntry.content}</p>
        <div className="flex">
          <Link href={`/languages/${textEntry.lang}/`}>
            <span className="badge badge-primary [&:not(:hover)]:badge-outline">
              {textEntry.lang}
            </span>
          </Link>
          <span className="ms-auto text-sm">{naturalTime(updatedAt)}</span>
        </div>
      </div>
      <UpdateTextEntryForm id={textEntry.id} />
    </div>
  );
}
