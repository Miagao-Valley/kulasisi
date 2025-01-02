import React from 'react';
import { diffWords } from 'diff';
import { cn } from '@/lib/utils';

interface Props {
  prevContent: string;
  content: string;
  className?: string;
}

export default function DiffText({
  prevContent,
  content,
  className = '',
}: Props) {
  const diff = diffWords(prevContent, content);

  return (
    <p className={cn(className)}>
      {diff.map((part, i) => (
        <span
          key={i}
          className={`${
            part.added
              ? 'bg-green-200'
              : part.removed
                ? 'line-through bg-red-200'
                : ''
          }`}
        >
          {part.value}
        </span>
      ))}
    </p>
  );
}
