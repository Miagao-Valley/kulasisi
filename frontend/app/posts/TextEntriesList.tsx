import React from 'react';
import Link from 'next/link';
import { TextEntry } from '@/types';

interface Props {
  textEntries: TextEntry[];
}

export default function PostsList({ textEntries }: Props) {
  return (
    <>
      <ul>
        {textEntries.map((textEntry) => {
          return (
            <li key={textEntry.id}>
              <Link href={`/posts/${textEntry.id}/`}>
                <p>
                  {textEntry.content} ({textEntry.lang})
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
