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
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CircleHelp, LinkIcon } from 'lucide-react';

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
      className={cn(className, `border-transparent shadow-none ${clickable && 'hover:bg-accent/40'}`)}
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
          <UpdatePhraseForm
            phrase={phrase}
            setIsEditing={setIsEditing}
          />
        ) : (
          <>
            <Link href={`/phrases/${phrase.id}/`}>
              <p className="mb-1 whitespace-pre-line">{phrase.content}</p>
            </Link>
            <div className="flex gap-2">
              {phrase.usage_note &&
                <Popover>
                  <PopoverTrigger>
                    <Badge variant="outline" className="h-full">
                      <CircleHelp className="w-4" />
                    </Badge>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Label>How to use?</Label>
                    <p className="m-0">{phrase.usage_note}</p>
                  </PopoverContent>
                </Popover>
              }
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
        <EntryFooter entry={phrase} votes={votes} />
      </CardFooter>
    </Card>
  );
}
