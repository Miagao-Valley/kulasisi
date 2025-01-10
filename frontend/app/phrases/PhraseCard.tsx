'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Vote } from '@/types/core';
import { Phrase, PhraseRevision } from '@/types/phrases';
import { cn } from '@/lib/utils';
import UpdatePhraseForm from './UpdatePhraseForm';
import PhraseDropdownMenu from './PhraseDropdownMenu';
import EntryHeader from '@/components/EntryHeader';
import EntryFooter from '@/components/EntryFooter';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { LinkIcon } from 'lucide-react';

interface Props {
  phrase: Phrase;
  votes: Vote[];
  revisions: PhraseRevision[];
  className?: string;
}

export default function PhraseCard({
  phrase,
  votes,
  revisions,
  className = '',
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card className={cn(className, '')}>
      <CardHeader className="flex flex-row">
        <EntryHeader className="me-auto" entry={phrase} />
        <PhraseDropdownMenu
          phrase={phrase}
          revisions={revisions}
          setIsEditing={setIsEditing}
        />
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <UpdatePhraseForm
            phrase={phrase}
            setIsEditing={setIsEditing}
          />
        ) : (
          <>
            <Link href={`/phrases/${phrase.id}/`}>
              <p className="mb-2 whitespace-pre-line">{phrase.content}</p>
            </Link>
            <div className="flex gap-2">
              {(phrase.source_title || phrase.source_link) &&
                <a target="_blank" rel="noopener noreferrer" href={phrase.source_link} className={badgeVariants({ variant: "outline" })}>
                  <LinkIcon className="w-3 me-1" />
                  {phrase.source_title || phrase.source_link}
                </a>
              }
              {phrase.categories.map(category => (
                <Badge variant="secondary" key={category}>{category}</Badge>
              ))}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        <EntryFooter entry={phrase} votes={votes} type="phrases" />
      </CardFooter>
    </Card>
  );
}
