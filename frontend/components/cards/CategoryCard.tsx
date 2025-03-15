'use client';

import React, { useState } from 'react';
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
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  category: Category;
  clickable?: boolean;
  className?: string;
}

export default function CategoryCard({
  category,
  clickable = true,
  className = '',
}: CategoryCardProps) {
  return (
    <Card
      className={cn(
        className,
        `shadow-none ${clickable && 'hover:bg-accent/40'}`
      )}
    >
      <div className="flex flex-col gap-1">
        <Link
          href={`/phrases?category=${category.name}`}
          className="w-full font-semibold max-w-48 truncate text-secondary-foreground hover:text-primary"
        >
          #{category.name}
        </Link>
        <p className="text-xs w-full">{category.description}</p>
      </div>
    </Card>
  );
}

interface CategoryHoverCard {
  name: string;
}

export function CategoryHoverCard({ name }: CategoryHoverCard) {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  const handleHover = async (open: boolean) => {
    if (open && !category) {
      setLoading(true);
      const res = await getCategory(name);
      setCategory(res);
      setLoading(false);
    }
  };

  return (
    <HoverCard onOpenChange={handleHover}>
      <HoverCardTrigger asChild>
        <Link
          href={`/phrases?category=${name}`}
          className="flex gap-2 items-center"
        >
          <Badge variant="secondary" className="truncate flex justify-center">
            #{name}
          </Badge>
        </Link>
      </HoverCardTrigger>

      <HoverCardContent className="max-w-80 p-0">
        {loading || !category ? (
          <div className="flex flex-col gap-1 p-3">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-36 h-2" />
            <Skeleton className="w-32 h-2" />
          </div>
        ) : (
          <CategoryCard
            category={category}
            clickable={false}
            className="border-transparent"
          />
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
