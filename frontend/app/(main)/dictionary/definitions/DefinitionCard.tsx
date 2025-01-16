'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Vote } from '@/types/core';
import { Definition, DefinitionRevision } from '@/types/dictionary';
import { cn } from '@/lib/utils';
import EntryHeader from '@/components/EntryHeader';
import EntryFooter from '@/components/EntryFooter';
import SourceButton from '@/components/SourceButton';
import UsageNote from '@/components/UsageNote';
import DefinitionDropdownMenu from './DefinitionDropdownMenu';
import UpdateDefinitionForm from './UpdateDefinitionForm';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Props {
  definition: Definition;
  votes: Vote[];
  revisions: DefinitionRevision[];
  clickable?: boolean;
  className?: string;
}

export default function DefinitionCard({
  definition,
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
        <EntryHeader className="me-auto" entry={definition} />
        <DefinitionDropdownMenu
          definition={definition}
          revisions={revisions}
          setIsEditing={setIsEditing}
        />
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <UpdateDefinitionForm
            definition={definition}
            setIsEditing={setIsEditing}
          />
        ) : (
          <>
            <Link
              href={`/dictionary/${definition.word}?tab=definitions#${definition.id}`}
            >
              <p className="mb-2 whitespace-pre-line">
                {definition.description}
              </p>
            </Link>
            <div className="flex gap-0 items-center">
              <Badge variant="secondary" className="h-fit me-1">
                {definition.pos}
              </Badge>
              {(definition.source_title || definition.source_link) && (
                <SourceButton
                  source_title={definition.source_title}
                  source_link={definition.source_link}
                />
              )}
              {definition.usage_note && (
                <UsageNote note={definition.usage_note} />
              )}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        <EntryFooter entry={definition} votes={votes} />
      </CardFooter>
    </Card>
  );
}
