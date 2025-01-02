'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Vote } from '@/types/core';
import { Translation, TranslationRevision } from '@/types/phrases';
import { cn } from '@/lib/utils';
import EntryHeader from '@/components/EntryHeader';
import EntryFooter from '@/components/EntryFooter';
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
  className?: string;
}

export default function TranslationCard({
  translation,
  votes,
  revisions,
  className = '',
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card className={cn(className, '')}>
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
            phraseId={translation.phrase}
            id={translation.id}
            initialContent={translation.content}
            setIsEditing={setIsEditing}
          />
        ) : (
          <Link
            href={`/phrases/${translation.phrase}?tab=translations#${translation.id}`}
          >
            <p className="mb-2 whitespace-pre-line">{translation.content}</p>
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <EntryFooter entry={translation} votes={votes} type="translations" />
      </CardFooter>
    </Card>
  );
}
