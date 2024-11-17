'use client';

import React from 'react';
import Link from 'next/link';
import naturalTime from '@/utils/naturalTime';
import { TextEntry, Translation } from '@/types';
import VoteActions from '../components/VoteActions';

interface Props {
  entry: TextEntry | Translation;
  type: "text-entries" | "translations";
  className?: string;
}

export default function TextEntryFooter({ entry, type, className = '' }: Props) {
  const updatedAt = new Date(entry.updated_at);

  return (
    <div className={`${className} flex items-center`}>
      <VoteActions entry={entry} type={type} />
      <div className="flex gap-2">
        <Link
          href={`/languages/${entry.lang}/`}
          onClick={(e) => e.stopPropagation()}
        >
          <span className="badge badge-primary [&:not(:hover)]:badge-outline">
            {entry.lang}
          </span>
        </Link>
      </div>
      <div className="ms-auto flex gap-2">
        <Link
          href={`/users/${entry.author}`}
          className="text-sm font-bold hover:text-primary"
          onClick={(e) => e.stopPropagation()}
        >
          {entry.author}
        </Link>
        <span className="text-sm">{naturalTime(updatedAt)}</span>
      </div>
    </div>
  );
}
