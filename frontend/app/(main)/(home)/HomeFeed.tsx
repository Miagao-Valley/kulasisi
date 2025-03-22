'use client';

import React, { useState, useEffect, useRef } from 'react';
import { isPhrase } from '@/types/phrases';
import { isWord } from '@/types/dictionary';
import getHomeFeed from '@/lib/core/getHomeFeed';
import { cn } from '@/lib/utils';
import PhraseCard from '../phrases/PhraseCard';
import WordCard from '../dictionary/WordCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

interface Props {
  className?: string;
}

export default function HomeFeed({ className = '' }: Props) {
  const limit = 15;
  const [page, setPage] = useState(1);
  const [feed, setFeed] = useState<any[]>([]);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(true);
  const fetchedPages = useRef(new Set<number>());
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Fetch feed for a given page.
  const fetchFeed = async (currentPage: number) => {
    // Avoid duplicate fetches.
    if (fetchedPages.current.has(currentPage)) return;
    fetchedPages.current.add(currentPage);

    setLoading(true);

    try {
      const data = await getHomeFeed({
        limit,
        offset: limit * (currentPage - 1),
      });
      if (!data) return;

      // Fetch additional data for each entry.
      const enriched = await Promise.all(
        data.results.map(async (entry: any) => {
          return {
            ...entry,
            type: isPhrase(entry) ? 'phrase' : isWord(entry) ? 'word' : '',
          };
        })
      );

      setFeed((prev) => [...prev, ...enriched]);
      setHasNext(!!data.next);
    } catch (error) {
      console.error('Error fetching home feed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch feed when page loads and changes.
  useEffect(() => {
    fetchFeed(page);
  }, [page]);

  // Set up infinite scroll using IntersectionObserver.
  useEffect(() => {
    if (!hasNext || loading || !sentinelRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setPage((prev) => prev + 1),
      { threshold: 0.1 }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [loading, hasNext]);

  return (
    <ul className={cn(className, 'flex flex-col')}>
      {!loading && feed.length === 0 ? (
        <li className="w-full col-span-full p-3 text-center">
          No entries found
        </li>
      ) : (
        feed.map((entry, idx) => (
          <li key={idx}>
            {entry.type === 'phrase' ? (
              <PhraseCard phrase={entry} clickable showTranslation />
            ) : (
              <WordCard word={entry} clickable showDefinition />
            )}
            <Separator className="my-2" />
          </li>
        ))
      )}

      {loading && <HomeFeedSkeleton />}
      {hasNext && !loading && <div ref={sentinelRef} className="h-10" />}
    </ul>
  );
}

export function HomeFeedSkeleton({ className = '' }: { className?: string }) {
  return (
    <ul className={cn(className, 'flex flex-col gap-3')}>
      {Array.from({ length: 5 }, (_, i) => (
        <Skeleton key={i} className="h-40 rounded-xl" />
      ))}
    </ul>
  );
}
