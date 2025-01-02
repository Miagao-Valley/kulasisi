'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Lang } from '@/types/languages';
import getLang from '@/lib/langs/getLang';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
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
  }, [code])

  return (
    <HoverCard>
      {lang &&
        <>
          <HoverCardTrigger asChild>
            <Link href={`/languages/${code}/`} className="flex gap-2 items-center">
              <Badge variant="outline">{code}</Badge>
              {showName &&
                <span className="font-semibold">{lang.name}</span>
              }
            </Link>
          </HoverCardTrigger>

          <HoverCardContent className="w-80">
            <div className="gap-1">
              <h4 className="text-sm font-semibold">{lang.name}</h4>
              <span>{shortenNum(lang.user_count || 0)} Members</span>
            </div>
          </HoverCardContent>
        </>
      }
    </HoverCard>
  );
}
