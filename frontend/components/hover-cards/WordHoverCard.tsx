'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Word } from '@/types/dictionary';
import getWord from '@/lib/words/getWord';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';

interface Props {
  lang: string;
  word: string;
}

export default function WordHoverCard({ lang, word }: Props) {
  const [wordObj, setWordObj] = useState<Word>();

  useEffect(() => {
    const fetchWord = async () => {
      const res = await getWord(lang, word);
      setWordObj(res);
    };

    fetchWord();
  }, []);

  return (
    <HoverCard>
      {word && (
        <>
          <HoverCardTrigger asChild>
            <Link
              href={`/dictionary/${lang}/${word}/`}
              className="flex gap-2 items-center"
            >
              <Badge
                variant="outline"
                className="truncate flex justify-center"
              >
                {word}
              </Badge>
            </Link>
          </HoverCardTrigger>

          <HoverCardContent className="max-w-80">
            <div className="gap-1">
              <div className="mb-2">
                <h2 className="font-semibold truncate max-w-40">{word}</h2>
                <div className="flex gap-1 items-center">
                  {wordObj?.parts_of_speech.slice(0, 3).map((pos) => (
                    <Badge variant="secondary" key={pos}>{pos}</Badge>
                  ))}
                  {(wordObj?.parts_of_speech.length || 0) > 3 && (
                    <span className="text-muted-foreground">...</span>
                  )}
                </div>
              </div>
              <p className="text-xs w-full max-w-40">{wordObj?.best_definition || 'This word has no definition'}</p>
            </div>
          </HoverCardContent>
        </>
      )}
    </HoverCard>
  );
}
