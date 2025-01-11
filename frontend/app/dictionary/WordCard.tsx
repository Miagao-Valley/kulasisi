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
import { badgeVariants } from '@/components/ui/badge';
import WordDropdownMenu from './WordDropdownMenu';
import { LinkIcon } from 'lucide-react';

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
            word={word}
            setIsEditing={setIsEditing}
          />
        ) : (
          <>
            <Link href={`/dictionary/${word.id}/`}>
              <p className="mb-2 text-xl font-bold">{word.word}</p>
            </Link>
            <div className="flex gap-2">
              {(word.source_title || word.source_link) &&
                <a target="_blank" rel="noopener noreferrer" href={word.source_link} className={badgeVariants({ variant: "outline" })}>
                  <LinkIcon className="w-3 me-1" />
                  {word.source_title || word.source_link}
                </a>
              }
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
