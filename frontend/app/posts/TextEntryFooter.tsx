'use client';

import React from 'react';
import Link from 'next/link';
import naturalTime from '@/utils/naturalTime';
import { TextEntry } from '@/types';

interface Props {
  textEntry: TextEntry;
  className?: string;
}

export default function TextEntryFooter({ textEntry, className = '' }: Props) {
  const updatedAt = new Date(textEntry.updated_at);

  return (
    <div className={`${className} flex`}>
      <div className="flex gap-2">
        <Link
          href={`/languages/${textEntry.lang}/`}
          onClick={(e) => e.stopPropagation()}
        >
          <span className="badge badge-primary [&:not(:hover)]:badge-outline">
            {textEntry.lang}
          </span>
        </Link>
      </div>
      <div className="ms-auto flex gap-2">
        <Link
          href={`/users/${textEntry.author}`}
          className="text-sm font-bold hover:text-primary"
          onClick={(e) => e.stopPropagation()}
        >
          {textEntry.author}
        </Link>
        <span className="text-sm">{naturalTime(updatedAt)}</span>
      </div>
    </div>
  );
}
