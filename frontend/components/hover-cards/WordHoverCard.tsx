'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Word } from '@/types/dictionary';
import getWord from '@/lib/words/getWord';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  lang: string;
  word: string;
}

export default function WordHoverCard({ lang, word }: Props) {
  const [wordObj, setWordObj] = useState<Word | null>(null);
  const [loading, setLoading] = useState(true);

  const handleHover = async (open: boolean) => {
    if (open && !wordObj) {
      setLoading(true);
      const res = await getWord(lang, word);
      setWordObj(res);
      setLoading(false);
    }
  };

  return (
    <HoverCard onOpenChange={handleHover}>
      {word && (
        <>
          <HoverCardTrigger asChild>
            <Link
              href={`/dictionary/${lang}/${word}/`}
              className="flex gap-2 items-center"
            >
              <Badge variant="outline" className="truncate flex justify-center">
                {word}
              </Badge>
            </Link>
          </HoverCardTrigger>

          <HoverCardContent className="max-w-80">
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                {loading ? (
                  <Skeleton className="w-24 h-4" />
                ) : (
                  <h2 className="font-semibold truncate">{word}</h2>
                )}
                <div className="flex gap-1 items-center">
                  {loading ? (
                    <Skeleton className="w-8 h-4" />
                  ) : (
                    wordObj?.parts_of_speech.slice(0, 3).map((pos) => (
                      <Badge variant="secondary" key={pos}>
                        {pos}
                      </Badge>
                    ))
                  )}
                  {(wordObj?.parts_of_speech.length || 0) > 3 && !loading && (
                    <span className="text-muted-foreground">...</span>
                  )}
                </div>
              </div>

              {loading ? (
                <Skeleton className="w-32 h-2" />
              ) : (
                <p className="text-xs w-full">
                  {wordObj?.best_definition || 'This word has no definition'}
                </p>
              )}
            </div>
          </HoverCardContent>
        </>
      )}
    </HoverCard>
  );
}
