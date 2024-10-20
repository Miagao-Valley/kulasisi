'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lang } from '@/types';
import { Filter } from '../components/FilterMenu';
import getLangs from '@/lib/langs/getLangs';

interface Props {
  searchTerm: string;
  sortOption: string;
  isDescending: boolean;
  filters: Filter;
  className?: string;
}

export default function LangsList({
  searchTerm,
  sortOption,
  isDescending,
  filters,
  className = '',
}: Props) {
  const [isLoading, setLoading] = useState(true);
  const [langs, setLangs] = useState<Lang[]>([]);

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      const data = await getLangs({
        search: searchTerm,
        ordering: isDescending ? `-${sortOption}` : sortOption,
      });
      setLangs(data);
    };

    fetch();
    setLoading(false);
  }, [searchTerm, sortOption, isDescending, filters]);

  if (isLoading) {
    return <LangsListSkeleton />;
  }

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

interface SkeletonProps {
  className?: string;
}

export function LangsListSkeleton({ className = '' }: SkeletonProps) {
  return (
    <ul
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ${className}`}
    >
      {Array.from({ length: 40 }, (_, i) => i).map((i) => {
        return <li key={i} className="skeleton w-full h-8"></li>;
      })}
    </ul>
  );
}
