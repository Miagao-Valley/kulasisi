'use client';

import React from 'react';
import Link from 'next/link';
import { Lang } from '@/types/languages';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { H1 } from '@/components/ui/heading-with-anchor';

interface Props {
  lang: Lang;
  className?: string;
}

export default function Overview({ lang, className = '' }: Props) {
  return (
    <div className={cn(className, 'flex flex-col gap-1')}>
      <Link href={`https://iso639-3.sil.org/code/${lang.code}/`}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger disabled>
              <Badge variant="outline" className="hover:cursor-pointer">
                {lang.code}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>ISO 639-3</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Link>

      <H1 className="!text-3xl truncate m-0">{lang.name}</H1>
    </div>
  );
}
