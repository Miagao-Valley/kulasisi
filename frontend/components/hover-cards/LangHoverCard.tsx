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

interface Props {
  code: string;
  showName?: boolean;
}

export default function LangHoverCard({ code, showName = false }: Props) {
  const [lang, setLang] = useState<Lang>();

  useEffect(() => {
    const fetchLang = async () => {
      const res = await getLang(code);
      setLang(res);
    };

    fetchLang();
  }, []);

  return (
    <HoverCard>
      {lang && (
        <>
          <HoverCardTrigger asChild>
            <Link
              href={`/languages/${code}/`}
              className="flex gap-2 items-center"
            >
              <Badge
                variant="outline"
                className="w-10 truncate flex justify-center"
              >
                {code}
              </Badge>
              {showName && <span>{lang.name}</span>}
            </Link>
          </HoverCardTrigger>

          <HoverCardContent className="max-w-80">
            <div className="gap-1">
              <h2 className="font-semibold truncate max-w-40">{lang.name}</h2>
              <span>{shortenNum(lang.user_count || 0)} Members</span>
            </div>
          </HoverCardContent>
        </>
      )}
    </HoverCard>
  );
}
