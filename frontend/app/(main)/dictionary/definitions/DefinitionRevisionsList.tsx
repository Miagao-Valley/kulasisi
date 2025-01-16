import React from 'react';
import naturalTime from '@/utils/naturalTime';
import { DefinitionRevision } from '@/types/dictionary';
import DiffText from '@/components/DiffText';
import UserHoverCard from '@/components/UserHoverCard';
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface Props {
  revisions: DefinitionRevision[];
}

export default function DefinitionRevisionsList({ revisions }: Props) {
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
                    <UserHoverCard username={revision.history_user} />
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
