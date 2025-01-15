import React from 'react';
import naturalTime from '@/utils/naturalTime';
import { WordRevision } from '@/types/dictionary';
import DiffText from '@/components/DiffText';
import UserHoverCard from '@/components/UserHoverCard';
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface Props {
  revisions: WordRevision[];
}

export default function WordRevisionsList({ revisions }: Props) {
  return (
    <Accordion type="single" collapsible>
      {revisions && revisions.length > 0 ? (
        revisions.map((revision, index) => {
          const prevContent =
            index < revisions.length - 1 ? revisions[index + 1].word : '';

          return (
            <AccordionItem
              value={`revision-${index}`}
              key={revision.history_id}
            >
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    #{revisions.length - index}
                  </span>
                  <UserHoverCard username={revision.history_user} />
                  <span className="text-muted-foreground">
                    modified word {naturalTime(revision.history_date)}
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
