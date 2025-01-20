'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Vote } from '@/types/core';
import { Phrase, PhraseRevision } from '@/types/phrases';
import { cn } from '@/lib/utils';
import EntryHeader from '@/components/entry/EntryHeader';
import EntryFooter from '@/components/entry/EntryFooter';
import Source from '@/components/hover-cards/Source';
import UsageNote from '@/components/hover-cards/UsageNote';
import PhraseDropdownMenu from './PhraseDropdownMenu';
import UpdatePhraseForm from './UpdatePhraseForm';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Props {
  phrase: Phrase;
  votes: Vote[];
  revisions: PhraseRevision[];
  clickable?: boolean;
  className?: string;
}

export default function PhraseCard({
  phrase,
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
        <EntryHeader className="me-auto" entry={phrase} />
        <PhraseDropdownMenu
          phrase={phrase}
          revisions={revisions}
          setIsEditing={setIsEditing}
        />
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <UpdatePhraseForm phrase={phrase} setIsEditing={setIsEditing} />
        ) : (
          <>
            <Link href={`/phrases/${phrase.id}/`}>
              <p className="mb-1 whitespace-pre-line">{phrase.content}</p>
            </Link>
            <div className="flex gap-0 items-center">
              <div className="flex gap-1 items-center me-1">
                {phrase.categories.map((category) => (
                  <Badge variant="secondary" className="h-fit" key={category}>
                    {category}
                  </Badge>
                ))}
              </div>
              {(phrase.source_title || phrase.source_link) && (
                <Source
                  source_title={phrase.source_title}
                  source_link={phrase.source_link}
                />
              )}
              {phrase.usage_note && <UsageNote note={phrase.usage_note} />}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        <EntryFooter entry={phrase} votes={votes} />
      </CardFooter>
    </Card>
  );
}
