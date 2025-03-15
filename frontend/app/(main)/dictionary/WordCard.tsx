'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Word } from '@/types/dictionary';
import { cn } from '@/lib/utils';
import EntryHeader from '@/components/entry/EntryHeader';
import EntryFooter from '@/components/entry/EntryFooter';
import Source from '@/components/cards/Source';
import { PosHoverCard } from '@/components/cards/PosCard';
import WordDropdownMenu from './WordDropdownMenu';
import UpdateWordForm from './UpdateWordForm';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

interface Props {
  word: Word;
  targetLang?: string;
  clickable?: boolean;
  className?: string;
}

export default function WordCard({
  word,
  targetLang,
  clickable = true,
  className = '',
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card
      className={cn(
        className,
        `border-transparent shadow-none ${clickable && 'hover:bg-accent/40'}`
      )}
    >
      <CardHeader className="flex flex-row">
        <EntryHeader className="me-auto" entry={word} />
        <WordDropdownMenu word={word} setIsEditing={setIsEditing} />
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <UpdateWordForm word={word} setIsEditing={setIsEditing} />
        ) : (
          <>
            <Link href={`/dictionary/${word.lang}/${word.word}/`}>
              <p className="mb-1 hover:text-primary text-xl font-bold break-all">
                {word.word}
              </p>
            </Link>
            {targetLang && word.best_definitions[targetLang] && (
              <Link
                href={`/dictionary/${word.lang}/${word.word}?tab=definitions`}
              >
                <p className="text-sm bg-accent/50 text-accent-foreground hover:text-primary rounded-sm p-2 mb-1 whitespace-pre-line">
                  {word.best_definitions[targetLang]}
                </p>
              </Link>
            )}
            <div className="flex flex-wrap gap-0 items-center">
              <div className="flex flex-wrap gap-1 items-center me-1">
                {word.parts_of_speech.map((pos) => (
                  <PosHoverCard abbr={pos} key={pos} />
                ))}
              </div>
              {(word.source_title || word.source_link) && (
                <Source
                  source_title={word.source_title}
                  source_link={word.source_link}
                />
              )}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        <EntryFooter entry={word} />
      </CardFooter>
    </Card>
  );
}
