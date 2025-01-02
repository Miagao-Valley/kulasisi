'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Vote } from '@/types/core';
import { Definition, DefinitionRevision } from '@/types/dictionary';
import { cn } from '@/lib/utils';
import EntryHeader from '@/components/EntryHeader';
import EntryFooter from '@/components/EntryFooter';
import DefinitionDropdownMenu from './DefinitionDropdownMenu';
import UpdateDefinitionForm from './UpdateDefinitionForm';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface Props {
  definition: Definition;
  votes: Vote[];
  revisions: DefinitionRevision[];
  className?: string;
}

export default function DefinitionCard({
  definition,
  votes,
  revisions,
  className = '',
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card className={cn(className, '')}>
      <CardHeader className="flex flex-row">
        <EntryHeader className="me-auto" entry={definition} />
        <DefinitionDropdownMenu definition={definition} revisions={revisions} setIsEditing={setIsEditing} />
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <UpdateDefinitionForm
            wordId={definition.word}
            id={definition.id}
            initialDescription={definition.description}
            setIsEditing={setIsEditing}
          />
        ) : (
          <Link href={`/dictionary/${definition.word}?tab=definitions#${definition.id}`}>
            <p className="mb-2 whitespace-pre-line">{definition.description}</p>
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <EntryFooter entry={definition} votes={votes} type="definitions" />
      </CardFooter>
    </Card>
  );
}
