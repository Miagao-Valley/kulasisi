'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Lang } from '@/types/languages';
import getLang from '@/lib/langs/getLang';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import shortenNum from '@/utils/shortenNum';
import { Skeleton } from '../ui/skeleton';

interface Props {
  code: string;
  showName?: boolean;
}

export default function LangHoverCard({ code, showName = false }: Props) {
  const [lang, setLang] = useState<Lang>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLang = async () => {
      setLoading(true);
      const res = await getLang(code);
      setLang(res);
      setLoading(false);
    };

    fetchLang();
  }, []);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href={`/languages/${code}/`} className="flex gap-2 items-center">
          <Badge
            variant="outline"
            className="w-10 truncate flex justify-center"
          >
            {code}
          </Badge>
          {showName ? (
            loading ? (
              <Skeleton className="w-32 h-6" />
            ) : (
              <span>{lang?.name}</span>
            )
          ) : null}
        </Link>
      </HoverCardTrigger>

      <HoverCardContent className="max-w-80">
        <div className="flex flex-col gap-1">
          {loading ? (
            <Skeleton className="w-24 h-4" />
          ) : (
            <h2 className="font-semibold truncate max-w-60">
              {lang?.name || ''}
            </h2>
          )}
          {loading ? (
            <Skeleton className="w-16 h-4" />
          ) : (
            <span className="text-sm">
              {shortenNum(lang?.user_count || 0)} Members
            </span>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
