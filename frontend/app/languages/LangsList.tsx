import React from 'react';
import Link from 'next/link';
import { Lang } from '@/types';

interface Props {
  langs: Lang[];
}

export default function LangsList({ langs }: Props) {
  return (
    <>
      <ul>
        {langs.map((lang) => {
          return (
            <li key={lang.code}>
              <Link href={`/languages/${lang.code}/`}>
                {lang.name} ({lang.code})
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
