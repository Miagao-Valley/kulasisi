'use client';

import React, { useState, useEffect } from 'react';
import naturalTime from '@/utils/naturalTime';
import { Definition, DefinitionRevision } from '@/types/dictionary';
import getDefinitionRevisions from '@/lib/definitions/getDefinitionRevisions';
import DiffText from '@/components/DiffText';
import { UserHoverCard } from '@/components/cards/UserCard';
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DefinitionRevisionsModalProps {
  definition: Definition;
}

export function DefinitionRevisionsModal({
  definition,
}: DefinitionRevisionsModalProps) {
  const [revisions, setRevisions] = useState<DefinitionRevision[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleOpen = async (open: boolean) => {
    if (open && revisions.length === 0) {
      const res = await getDefinitionRevisions(definition.id);
      setRevisions(res.results);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog onOpenChange={handleOpen}>
      <DialogTrigger className="w-full text-left">Edits</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edits</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-96 pe-4">
          <DefinitionRevisionsList revisions={revisions} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

interface DefinitionRevisionsListProps {
  revisions: DefinitionRevision[];
}

export function DefinitionRevisionsList({
  revisions,
}: DefinitionRevisionsListProps) {
  return (
    <Accordion type="single" collapsible>
      {revisions && revisions.length > 0 ? (
        revisions.map((revision, index) => {
          const prevContent =
            index < revisions.length - 1
              ? revisions[index + 1].description
              : '';

          return (
            <AccordionItem
              value={`revision-${index}`}
              key={revision.history_id}
            >
              <AccordionTrigger className="hover:no-underline font-normal">
                <div className="flex flex-col sm:flex-row items-left sm:items-center gap-0">
                  <div className="flex gap-1 me-1">
                    <span className="font-medium">
                      #{revisions.length - index}
                    </span>
                    {revision.history_user && (
                      <UserHoverCard username={revision.history_user} />
                    )}
                  </div>
                  <span className="truncate text-xs text-muted-foreground">
                    modified content {naturalTime(revision.history_date)}
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <DiffText
                  prevContent={prevContent}
                  content={revision.description}
                />
              </AccordionContent>
            </AccordionItem>
          );
        })
      ) : (
        <div>No revisions</div>
      )}
    </Accordion>
  );
}
