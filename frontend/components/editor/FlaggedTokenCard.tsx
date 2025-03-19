import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useEditorContext } from './EditorContext';
import { FlaggedToken } from '@/types/proofreader';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CircleAlert } from 'lucide-react';

const textLevelVariants = cva('', {
  variants: {
    level: {
      error: 'text-destructive',
      warning: 'text-warning',
      info: 'text-info',
    },
  },
  defaultVariants: {
    level: 'error',
  },
});

const hoverTextLevelVariants = cva('hover:cursor-pointer', {
  variants: {
    level: {
      error: 'hover:text-destructive',
      warning: 'hover:text-warning',
      info: 'hover:text-info',
    },
  },
  defaultVariants: {
    level: 'error',
  },
});

const bgLevelVariants = cva('', {
  variants: {
    level: {
      error: 'bg-destructive-foreground',
      warning: 'bg-warning-foreground',
      info: 'bg-info-foreground',
    },
  },
  defaultVariants: {
    level: 'error',
  },
});

interface Props {
  token: FlaggedToken;
  concise?: boolean;
  clickable?: boolean;
  className?: string;
}

export default function FlaggedTokenCard({
  token,
  concise = false,
  clickable = true,
  className = '',
}: Props) {
  const { setCurrentToken, applySuggestion } = useEditorContext();

  const showSpaces = (token: string) =>
    token.trim() === '' ? '◦ '.repeat(token.length) : token;

  return (
    <Card
      className={cn(
        className,
        clickable && 'hover:bg-accent/40',
        'flex flex-col gap-1 shadow-none'
      )}
    >
      {/* Info */}
      {concise ? (
        // Concise mode
        <Tooltip>
          <TooltipTrigger className="w-fit" type="button">
            <div className="flex gap-1 items-center">
              <CircleAlert
                size={16}
                className={textLevelVariants({ level: token.level })}
              />
              <span
                className={cn(
                  'text-sm font-semibold',
                  hoverTextLevelVariants({ level: token.level }),
                  token.token.trim() === '' && 'text-muted-foreground'
                )}
                onClick={() => setCurrentToken && setCurrentToken(token)}
              >
                {showSpaces(token.token)}
              </span>
            </div>
          </TooltipTrigger>

          <TooltipContent
            className={cn(
              bgLevelVariants({ level: token.level }),
              textLevelVariants({ level: token.level })
            )}
          >
            <p>{token.message}</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        // Full mode
        <div>
          <span
            className={cn(
              'text-xs font-semibold flex gap-1 items-center',
              textLevelVariants({ level: token.level })
            )}
          >
            <CircleAlert size={12} /> {token.message}
          </span>

          <span className="text-sm">
            Change{' '}
            <span
              className={cn(
                'font-bold',
                hoverTextLevelVariants({ level: token.level })
              )}
              onClick={() => setCurrentToken && setCurrentToken(token)}
            >
              {showSpaces(token.token)}
            </span>{' '}
            to:
          </span>
        </div>
      )}

      {/* Suggestions */}
      {token.suggestions.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {token.suggestions.map((suggestion, idx) => (
            <Badge
              key={idx}
              variant="outline"
              onClick={() => applySuggestion(suggestion, token)}
              className="cursor-pointer"
            >
              {suggestion.trim() === '' ? showSpaces(' ') : suggestion}
            </Badge>
          ))}
        </div>
      ) : (
        <span className="text-sm text-muted-foreground">
          No suggestions available.
        </span>
      )}
    </Card>
  );
}
