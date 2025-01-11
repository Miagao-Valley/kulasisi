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
              <p className="mb-2 whitespace-pre-line">{definition.description}</p>
            </Link>
            <div className="flex gap-2">
              {definition.usage_note &&
                <Popover>
                  <PopoverTrigger>
                    <Badge variant="outline" className="h-full">
                      <CircleHelp className="w-4" />
                    </Badge>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Label>How to use?</Label>
                    <p className="m-0">{definition.usage_note}</p>
                  </PopoverContent>
                </Popover>
              }
              {(definition.source_title || definition.source_link) &&
                <a target="_blank" rel="noopener noreferrer" href={definition.source_link} className={badgeVariants({ variant: "outline" })}>
                  <LinkIcon className="w-3 me-1" />
                  {definition.source_title || definition.source_link}
                </a>
              }
              <Badge variant="secondary">{definition.pos}</Badge>
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
