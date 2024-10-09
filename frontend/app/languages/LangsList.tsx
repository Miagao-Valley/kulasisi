import React from 'react';
import Link from 'next/link';
import { Lang } from '@/types';
import getLangs from '@/lib/langs/getLangs';

interface Props {
  className?: string;
}

export default async function LangsList({ className = '' }: Props) {
  const langs: Lang[] = await getLangs();

  return (
    <ul
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ${className}`}
    >
      {langs.map((lang) => {
        return (
          <li key={lang.code}>
            <Link
              className="hover:text-primary flex gap-2"
              href={`/languages/${lang.code}/`}
            >
              <span className="badge badge-primary badge-outline">
                {lang.code}
              </span>
              <span className="font-semibold">{lang.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
