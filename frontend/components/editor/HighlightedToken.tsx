import { useEffect, useRef, useState } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useEditorContext } from './EditorContext';
import { FlaggedToken } from '@/types/proofreader';
import { FlaggedTokenCard } from './FlaggedTokenCard';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const tokenUnderlineVariants = cva(
  'outline-none ring-0 underline underline-offset-4 transition-all duration-300 ease-in-out transform',
  {
    variants: {
      level: {
        error: 'decoration-destructive',
        warning: 'decoration-warning',
        info: 'decoration-info',
      },
      active: {
        true: 'scale-x-100 opacity-100',
        false: 'scale-x-0 opacity-0',
      },
    },
    defaultVariants: {
      level: 'error',
      active: false,
    },
  }
);

const tokenBgVariants = cva(
  'transition-all duration-300 ease-in-out transform',
  {
    variants: {
      level: {
        error: 'bg-destructive/20',
        warning: 'bg-warning/20',
        info: 'bg-info/20',
      },
      active: {
        true: 'scale-x-100 opacity-100',
        false: 'scale-x-0 opacity-0',
      },
    },
    defaultVariants: {
      level: 'error',
      active: false,
    },
  }
);

interface HighlightedTokenProps {
  token: FlaggedToken;
  className?: string;
}

export function HighlightedToken({
  token,
  className = '',
}: HighlightedTokenProps) {
  const { currentToken, setCurrentToken, loading } = useEditorContext();

  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const active = !loading && token === currentToken;

  // Close popover if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setCurrentToken(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setCurrentToken]);

  useEffect(() => {
    const delay = 100;
    const timeoutId = setTimeout(() => {
      setIsMounted(true);
      setOpen(active);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [active]);

  return (
    <Popover open={open}>
      <PopoverTrigger
        className={cn(
          className,
          'outline-none ring-0 whitespace-pre-wrap break-words',
          tokenUnderlineVariants({ level: token.level, active: active }),
          active && tokenBgVariants({ level: token.level, active: active }),
          isMounted ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
        )}
      >
        {token.token}
      </PopoverTrigger>
      <PopoverContent ref={popoverRef} className="p-0">
        <FlaggedTokenCard
          token={token}
          clickable={false}
          className="border-none"
        />
      </PopoverContent>
    </Popover>
  );
}
