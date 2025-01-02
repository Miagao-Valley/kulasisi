'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Vote } from '@/types/core';
import { Word, WordRevision } from '@/types/dictionary';
import { cn } from '@/lib/utils';
import UpdateWordForm from './UpdateWordForm';
import EntryHeader from '@/components/EntryHeader';
import EntryFooter from '@/components/EntryFooter';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import WordDropdownMenu from './WordDropdownMenu';

interface Props {
  word: Word;
  votes: Vote[];
  revisions: WordRevision[];
  className?: string;
}

export default function WordCard({
  word,
  votes,
  revisions,
  className = '',
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card className={cn(className, '')}>
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
          <UpdateWordForm
            id={word.id}
            initialWord={word.word}
            setIsEditing={setIsEditing}
          />
        ) : (
          <Link href={`/dictionary/${word.id}/`}>
            <p className="mb-2 text-xl font-bold">{word.word}</p>
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <EntryFooter entry={word} votes={votes} type="phrases" />
      </CardFooter>
    </Card>
  );
}
