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

export default function Source({
  source_title = '',
  source_link = '',
}: Props) {
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
                className="!gap-0"
              >
                <LinkIcon className="w-3 me-1" />
                {source_title || source_link}
              </a>
            ) : (
              <span className="flex gap-0">
                <LinkIcon className="w-3 me-1" />
                {source_title}
              </span>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>
            Source: <b>{source_title || source_link}</b>
          </p>
          {source_title && source_link && (
            <a
              href={source_link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/50 text-xs underline underline-offset-4"
            >
              {source_link}
            </a>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
