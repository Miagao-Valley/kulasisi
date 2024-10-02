import React from 'react';
import Link from 'next/link';
import naturalTime from '@/utils/naturalTime';
import { TextEntry } from '@/types';

interface Props {
  textEntries: TextEntry[];
  className?: string;
}

export default function PostsList({ textEntries, className = '' }: Props) {
  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {textEntries.map((textEntry) => {
        const updatedAt = new Date(textEntry.updated_at);
        return (
          <li
            className="px-4 py-3 border rounded-lg flex flex-col"
            key={textEntry.id}
          >
            <Link href={`/posts/${textEntry.id}/`}>
              <p className="mb-2 hover:text-primary">{textEntry.content}</p>
            </Link>
            <div className="flex">
              <Link href={`/languages/${textEntry.lang}/`}>
                <span className="badge badge-primary [&:not(:hover)]:badge-outline">
                  {textEntry.lang}
                </span>
              </Link>
              <span className="ms-auto text-sm">{naturalTime(updatedAt)}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
