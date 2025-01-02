'use client';

import React from 'react';
import Link from 'next/link';
import { Lang } from '@/types/languages';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

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
              <Badge variant="outline" className="hover:cursor-pointer">{lang.code}</Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>ISO 639-3</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Link>
      <h1 className="text-3xl mb-0">{lang.name}</h1>
    </div>
  );
}
