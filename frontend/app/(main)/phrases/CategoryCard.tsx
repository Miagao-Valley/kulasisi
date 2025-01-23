import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import getCategory from '@/lib/phrases/getCategory';
import Link from 'next/link';

interface Props {
  name: string;
  className?: string;
}

export default async function CategoryCard({ name, className = '' }: Props) {
  const category = await getCategory(name);

  return (
    <Card className={cn(className, `shadow-none'}`)}>
      <CardContent>
        <div className="flex gap-2">
          <Link href={`/phrases?category=${category.name}`}>
            <h2 className="text-xl text-secondary-foreground">
              #{category.name}
            </h2>
          </Link>
        </div>
        <p className="text-sm mb-1 whitespace-pre-line">
          {category.description}
        </p>
      </CardContent>
    </Card>
  );
}
