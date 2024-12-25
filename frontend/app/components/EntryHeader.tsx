import React from 'react';
import Link from 'next/link';
import naturalTime from '@/utils/naturalTime';
import { PhraseEntry, DictEntry, Translation } from '@/types';
import Username from './Username';

interface Props {
  entry: PhraseEntry | DictEntry | Translation;
  className?: string;
}

export default async function EntryHeader({ entry, className = '' }: Props) {
  return (
    <>
      <div className={`${className} flex gap-1 items-center text-sm`}>
        <Link href={`/users/${entry.contributor}/`}>
          <Username
            username={entry.contributor}
            reputation={entry.contributor_reputation}
          />
        </Link>
        •
        <span className="text-sm">
          {naturalTime(new Date(entry.updated_at))}
        </span>
        •
        <Link href={`/languages/${entry.lang}/`}>
          <span className="badge badge-primary [&:not(:hover)]:badge-outline">
            {entry.lang}
          </span>
        </Link>
      </div>
    </>
  );
}
