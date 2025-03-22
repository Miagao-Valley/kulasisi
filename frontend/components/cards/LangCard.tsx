'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import shortenNum from '@/lib/utils/shortenNum';
import { Lang } from '@/types/languages';
import getLang from '@/lib/langs/getLang';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

interface LangCardProps {
  lang: Lang;
  clickable?: boolean;
  className?: string;
}

export default function LangCard({
  lang,
  clickable = true,
  className = '',
}: LangCardProps) {
  return (
    <Card className={cn(className, clickable && 'hover:bg-accent/40')}>
      <div className="flex flex-col gap-1">
        <div className="flex gap-1">
          <Badge
            variant="outline"
            className="w-10 truncate flex justify-center"
          >
            {lang.code}
          </Badge>
          <Link
            href={`/languages/${lang?.code}/`}
            className="w-full font-semibold truncate max-w-48 hover:text-primary"
          >
            {lang?.name || lang?.code || ''}
          </Link>
        </div>
        <div className="flex gap-1 text-sm font-semibold">
          {shortenNum(lang?.user_count || 0)}{' '}
          <span className="text-muted-foreground">Members</span>
        </div>
      </div>
    </Card>
  );
}

interface LangHoverCardProps {
  code: string;
}

export function LangHoverCard({ code }: LangHoverCardProps) {
  const [lang, setLang] = useState<Lang | null>(null);
  const [loading, setLoading] = useState(true);

  const handleHover = async (open: boolean) => {
    if (open && !lang) {
      setLoading(true);
      const data = await getLang(code);
      setLang(data);
      setLoading(false);
    }
  };

  return (
    <HoverCard onOpenChange={handleHover}>
      <HoverCardTrigger asChild>
        <Link
          href={`/languages/${code}`}
          className={cn(
            'w-10 truncate flex justify-center',
            badgeVariants({ variant: 'outline' })
          )}
        >
          {code}
        </Link>
      </HoverCardTrigger>

      <HoverCardContent className="max-w-80 p-0">
        {loading || !lang ? (
          <div className="flex flex-col gap-1 p-3">
            <div className="flex gap-1">
              <Skeleton className="w-10 h-6" />
              <Skeleton className="w-24 h-6" />
            </div>
            <Skeleton className="w-30 h-4" />
          </div>
        ) : (
          <LangCard
            lang={lang}
            clickable={false}
            className="border-transparent"
          />
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
