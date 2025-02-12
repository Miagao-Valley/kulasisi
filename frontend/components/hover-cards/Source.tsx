import { LinkIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '../ui/button';

interface Props {
  source_title?: string;
  source_link?: string;
}

export default function Source({ source_title = '', source_link = '' }: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={`p-2 h-fit ${source_link && 'text-primary'}`}
            asChild={!!source_link}
          >
            {source_link ? (
              <a
                href={source_link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex !gap-0 max-w-36 md:max-w-48"
              >
                <LinkIcon className="w-3 me-1" />
                <span className="truncate w-fit">
                  {source_title || source_link}
                </span>
              </a>
            ) : (
              <span className="flex gap-0 max-w-36 md:max-w-48">
                <LinkIcon className="w-3 me-1" />
                <span className="truncate w-fit">{source_title}</span>
              </span>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p className="flex flex-wrap break-words">
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
    </TooltipProvider>
  );
}
