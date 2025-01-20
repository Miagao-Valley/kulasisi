'use client';

import React, { useEffect, useState } from 'react';
import getWords from '@/lib/words/getWords';
import { cn } from '@/lib/utils';
import ListSelector from '../ui/list-selector';

interface Props {
  selectedWords: string[];
  setSelectedWords: (value: string[]) => void;
  exclude?: string[];
  placeholder?: string;
  hidePlaceholderWhenSelected?: boolean;
  className?: string;
}

export default function WordsSelect({
  selectedWords,
  setSelectedWords,
  exclude = [],
  placeholder = 'words...',
  hidePlaceholderWhenSelected = false,
  className = '',
}: Props) {
  const [wordOptions, setWordOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchWords = async () => {
      const { results } = await getWords();
      setWordOptions(results.map((word) => word.word).filter((word) => !exclude.includes(word)));
    };

    fetchWords();
  }, []);

  return (
    <ListSelector
      value={selectedWords}
      defaultOptions={wordOptions}
      onChange={setSelectedWords}
      onSearch={async (q) => {
        q = q.toLowerCase();
        return wordOptions.filter((option) =>
          option.toLowerCase().includes(q),
        );
      }}
      triggerSearchOnFocus
      placeholder={placeholder}
      hidePlaceholderWhenSelected={hidePlaceholderWhenSelected}
      emptyIndicator={<p className="text-center">No results found</p>}
      className={cn('!text-xs border-0 bg-accent/20', className)}
    />
  );
}
