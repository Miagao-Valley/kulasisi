'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Vote } from '@/types/core';
import { Word, WordRevision } from '@/types/dictionary';
import { cn } from '@/lib/utils';
import EntryHeader from '@/components/entry/EntryHeader';
import EntryFooter from '@/components/entry/EntryFooter';
import Source from '@/components/hover-cards/Source';
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
  votes: Vote[];
  revisions: WordRevision[];
  clickable?: boolean;
  className?: string;
}

export default function WordCard({
  word,
  votes,
  revisions,
  clickable = true,
  className = '',
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card
      className={cn(
        className,
        `border-transparent shadow-none ${clickable && 'hover:bg-accent/40'}`,
      )}
    >
      <CardHeader className="flex flex-row">
        <EntryHeader className="me-auto" entry={word} />
        <WordDropdownMenu
          word={word}
          revisions={revisions}
          setIsEditing={setIsEditing}
        />
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <UpdateWordForm word={word} setIsEditing={setIsEditing} />
        ) : (
          <>
            <Link href={`/dictionary/${word.lang}/${word.word}/`}>
              <p className="mb-2 text-xl font-bold">{word.word}</p>
            </Link>
            <div className="flex gap-0 items-center">
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
        <EntryFooter entry={word} votes={votes} />
      </CardFooter>
    </Card>
  );
}
