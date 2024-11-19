import React from 'react';
import Link from 'next/link';
import naturalTime from '@/utils/naturalTime';
import { TextEntry, Translation } from '@/types';
import Username from '../components/Username';

interface Props {
  entry: TextEntry | Translation;
  className?: string;
}

export default async function PostHeader({ entry, className = '' }: Props) {
  return (
    <>
      <div className={`${className} flex gap-1 items-center text-sm`}>
        <Username username={entry.author} reputation={entry.author_reputation} />
        •
        <span className="text-sm">{naturalTime(new Date(entry.updated_at))}</span>
        •
        <Link
          href={`/languages/${entry.lang}/`}
        >
          <span className="badge badge-primary [&:not(:hover)]:badge-outline">
            {entry.lang}
          </span>
        </Link>
      </div>
    </>
  );
}
