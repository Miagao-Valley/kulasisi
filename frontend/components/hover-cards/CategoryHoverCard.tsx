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
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  name: string;
}

export default function CategoryHoverCard({ name }: Props) {
  const [category, setCategory] = useState<Category>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      const res = await getCategory(name);
      setCategory(res);
      setLoading(false);
    };

    fetchCategory();
  }, [name]);

  return (
    <HoverCard>
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
        <div className="flex flex-col gap-1">
          <h2 className="text-secondary-foreground font-semibold truncate">
            #{name}
          </h2>
          {loading ? (
            <div className="flex flex-col gap-1">
              <Skeleton className="w-32 h-2" />
              <Skeleton className="w-24 h-2" />
              <Skeleton className="w-28 h-2" />
            </div>
          ) : (
            <p className="text-xs w-full">{category?.description}</p>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
