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
import { Badge, badgeVariants } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

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
      const data = await getWord(lang, word);
      setWordObj(data);
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
              className={cn(
                'truncate flex justify-center',
                badgeVariants({ variant: 'outline' })
              )}
            >
              {word}
            </Link>
          </HoverCardTrigger>

          <HoverCardContent className="max-w-80 flex flex-col gap-1">
            {loading ? (
              <Skeleton className="w-24 h-4" />
            ) : (
              <h2 className="font-semibold truncate">{word}</h2>
            )}

            {loading ? (
              <Skeleton className="w-32 h-2" />
            ) : (
              <p className="text-xs w-full">
                {Object.values(wordObj?.best_definitions ?? {})[0] ||
                  'This word has no definition'}
              </p>
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
          </HoverCardContent>
        </>
      )}
    </HoverCard>
  );
}
