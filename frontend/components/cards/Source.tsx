'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '../ui/button';
import { LinkIcon } from 'lucide-react';

interface Props {
  source_title?: string;
  source_link?: string;
  showTitle?: boolean;
}

export function Source({
  source_title = '',
  source_link = '',
  showTitle = false,
}: Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`p-1 w-fit h-fit ${source_link && 'text-primary'}`}
          asChild={!!source_link}
        >
          <a
            href={source_link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-0! max-w-36 md:max-w-48"
          >
            <LinkIcon />
            {showTitle && (
              <span className="ms-1 truncate w-fit">
                {source_title || source_link}
              </span>
            )}
          </a>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p className="flex flex-wrap break-words gap-1">
          Source: <b>{source_title || source_link}</b>
        </p>
        {source_title && source_link && (
          <a
            href={source_link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-foreground/50 text-xs underline underline-offset-4 break-all"
          >
            {source_link}
          </a>
        )}
      </TooltipContent>
    </Tooltip>
  );
}
