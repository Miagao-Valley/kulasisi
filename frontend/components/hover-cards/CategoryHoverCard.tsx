'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Category } from '@/types/phrases';
import getCategory from '@/lib/phrases/getCategory';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';

interface Props {
  name: string;
}

export default function CategoryHoverCard({ name }: Props) {
  const [category, setCategory] = useState<Category>();

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await getCategory(name);
      setCategory(res);
    };

    fetchCategory();
  }, []);

  return (
    <HoverCard>
      {category && (
        <>
          <HoverCardTrigger asChild>
            <Link
              href={`/phrases?category=${name}`}
              className="flex gap-2 items-center"
            >
              <Badge
                variant="secondary"
                className="truncate flex justify-center"
              >
                #{name}
              </Badge>
            </Link>
          </HoverCardTrigger>

          <HoverCardContent className="max-w-80">
            <div className="gap-1">
              <h2 className="text-secondary-foreground font-semibold truncate max-w-40">#{name}</h2>
              <p className="text-xs w-full max-w-40">{category.description}</p>
            </div>
          </HoverCardContent>
        </>
      )}
    </HoverCard>
  );
}
