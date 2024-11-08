'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Translation, PaginationDetails } from '@/types';
import { TranslationsContent } from './TranslationContent';
import TextEntryFooter from '../../TextEntryFooter';

interface Props {
  translations?: PaginationDetails & { results: Translation[] };
  className?: string;
}

export default function TranslationsList({ translations, className }: Props) {
  const router = useRouter();

  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {translations &&
      translations.results &&
      translations.results.length > 0 ? (
        translations.results.map((translation) => (
          <li
            className="px-4 py-3 border rounded-lg flex flex-col hover:cursor-pointer"
            key={translation.id}
            onClick={() =>
              router.push(
                `/posts/${translation.text_entry}/#translation-${translation.id}`
              )
            }
          >
            <div id={`translation-${translation.id}`}>
              <TranslationsContent translation={translation} />
              <TextEntryFooter textEntry={translation} />
            </div>
          </li>
        ))
      ) : (
        <li className="w-full col-span-full p-3 text-center">
          <div>No translations found</div>
        </li>
      )}
    </ul>
  );
}

interface SkeletonProps {
  className?: string;
}

export function TranslationsListSkeleton({ className = '' }: SkeletonProps) {
  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: 10 }, (_, i) => (
        <li className="skeleton rounded-lg w-full h-24" key={i}></li>
      ))}
    </ul>
  );
}
