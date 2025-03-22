'use client';

import React, { useState, useEffect } from 'react';
import naturalTime from '@/lib/utils/naturalTime';
import { Word, WordRevision } from '@/types/dictionary';
import getWordRevisions from '@/lib/words/getWordRevisions';
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

interface WordRevisionsModalProps {
  word: Word;
}

export function WordRevisionsModal({ word }: WordRevisionsModalProps) {
  const [revisions, setRevisions] = useState<WordRevision[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleOpen = async (open: boolean) => {
    if (open && revisions.length === 0) {
      const { results } = await getWordRevisions(word.lang, word.word);
      setRevisions(results);
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
          <WordRevisionsList revisions={revisions} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

interface WordRevisionListProps {
  revisions: WordRevision[];
}

export function WordRevisionsList({ revisions }: WordRevisionListProps) {
  return (
    <Accordion type="single" collapsible>
      {revisions.length > 0 ? (
        revisions.map((revision, index) => {
          const prevContent =
            index < revisions.length - 1 ? revisions[index + 1].word : '';

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
                <DiffText prevContent={prevContent} content={revision.word} />
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
