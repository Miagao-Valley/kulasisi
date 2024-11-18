import React from 'react';
import Link from 'next/link';
import naturalTime from '@/utils/naturalTime';
import { TextEntry, Translation } from '@/types';

interface Props {
  entry: TextEntry | Translation;
  className?: string;
}

export default async function PostHeader({ entry, className = '' }: Props) {
  return (
    <>
      <div className={`${className} flex gap-1 items-center text-sm`}>
        <Link
          href={`/languages/${entry.lang}/`}
        >
          <span className="badge badge-primary [&:not(:hover)]:badge-outline">
            {entry.lang}
          </span>
        </Link>
        •
        <Link
          href={`/users/${entry.author}`}
          className="text-sm font-medium hover:text-primary"
        >
          {entry.author}
        </Link>
        •
        <span className="text-sm">{naturalTime(new Date(entry.updated_at))}</span>
      </div>
    </>
  );
}
