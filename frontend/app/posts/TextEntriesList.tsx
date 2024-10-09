import React from 'react';
import Link from 'next/link';
import { TextEntry } from '@/types';
import TextEntryFooter from './TextEntryFooter';

interface Props {
  textEntries: TextEntry[];
  className?: string;
}

export default function PostsList({ textEntries, className = '' }: Props) {
  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {textEntries.map((textEntry) => {
        return (
          <li
            className="px-4 py-3 border rounded-lg flex flex-col"
            key={textEntry.id}
          >
            <Link href={`/posts/${textEntry.id}/`}>
              <p className="mb-2 hover:text-primary">{textEntry.content}</p>
            </Link>
            <TextEntryFooter textEntry={textEntry} />
          </li>
        );
      })}
    </ul>
  );
}
