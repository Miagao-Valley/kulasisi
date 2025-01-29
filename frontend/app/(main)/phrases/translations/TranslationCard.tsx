'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Vote } from '@/types/core';
import { Translation, TranslationRevision } from '@/types/phrases';
import { cn } from '@/lib/utils';
import EntryHeader from '@/components/entry/EntryHeader';
import EntryFooter from '@/components/entry/EntryFooter';
import Source from '@/components/hover-cards/Source';
import TranslationDropdownMenu from './TranslationDropdownMenu';
import UpdateTranslationForm from './UpdateTranslationForm';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

interface Props {
  translation: Translation;
  votes: Vote[];
  revisions: TranslationRevision[];
  clickable?: boolean;
  className?: string;
}

export default function TranslationCard({
  translation,
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
        <EntryHeader className="me-auto" entry={translation} />
        <TranslationDropdownMenu
          translation={translation}
          revisions={revisions}
          setIsEditing={setIsEditing}
        />
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <UpdateTranslationForm
            translation={translation}
            initialContent={translation.content}
            setIsEditing={setIsEditing}
          />
        ) : (
          <>
            <Link
              href={`/phrases/${translation.phrase}?tab=translations#${translation.id}`}
            >
              <p className="mb-2 whitespace-pre-line">{translation.content}</p>
            </Link>
            <div className="flex flex-wrap gap-0 items-center">
              {(translation.source_title || translation.source_link) && (
                <Source
                  source_title={translation.source_title}
                  source_link={translation.source_link}
                />
              )}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        <EntryFooter entry={translation} votes={votes} />
      </CardFooter>
    </Card>
  );
}
