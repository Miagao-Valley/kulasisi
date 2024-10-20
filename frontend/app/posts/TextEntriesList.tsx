'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { TextEntry } from '@/types';
import { Filter } from '../components/FilterMenu';
import getTextEntries from '@/lib/textEntries/getTextEntries';
import TextEntryFooter from './TextEntryFooter';

interface Props {
  searchTerm: string;
  sortOption: string;
  isDescending: boolean;
  filters: Filter;
  className?: string;
}

export default function TextEntriesList({
  searchTerm,
  sortOption,
  isDescending,
  filters,
  className = '',
}: Props) {
  const [isLoading, setLoading] = useState(true);
  const [textEntries, setTextEntries] = useState<TextEntry[]>([]);

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      const data = await getTextEntries({
        search: searchTerm,
        ordering: isDescending ? `-${sortOption}` : sortOption,
        lang__code: filters?.lang || '',
      });
      setTextEntries(data);
    };

    fetch();
    setLoading(false);
  }, [searchTerm, sortOption, isDescending, filters]);

  if (isLoading) {
    return <TextEntriesListSkeleton />;
  }

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

interface SkeletonProps {
  className?: string;
}

export async function TextEntriesListSkeleton({
  className = '',
}: SkeletonProps) {
  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: 10 }, (_, i) => i).map((i) => {
        return <li className="skeleton rounded-lg w-full h-24" key={i}></li>;
      })}
    </ul>
  );
}
