'use client';

import React, { useEffect, useState } from 'react';
import getWords from '@/lib/words/getWords';
import { cn } from '@/lib/utils';
import ListSelector from '../ui/list-selector';

interface Props {
  selectedWords?: string[];
  setSelectedWords: (value: string[]) => void;
  include?: string[];
  exclude?: string[];
  lang?: string;
  placeholder?: string;
  hidePlaceholderWhenSelected?: boolean;
  error?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export default function WordsSelect({
  selectedWords = [],
  setSelectedWords,
  include = [],
  exclude = [],
  lang,
  placeholder = 'words...',
  hidePlaceholderWhenSelected = false,
  error,
  disabled = false,
  className = '',
}: Props) {
  const [wordOptions, setWordOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchWords = async () => {
      const { results } = await getWords();
      const filteredWords = results.filter((result) => {
        if (include.length > 0) {
          return (
            include.includes(result.word) && (!lang || result.lang === lang)
          );
        } else if (exclude.length > 0) {
          return (
            !exclude.includes(result.word) && (!lang || result.lang === lang)
          );
        }
        return !lang || result.lang === lang;
      });
      const uniqueWords = new Set(filteredWords.map((word) => word.word));
      setWordOptions(Array.from(uniqueWords));
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
        return wordOptions.filter((option) => option.toLowerCase().includes(q));
      }}
      triggerSearchOnFocus
      placeholder={placeholder}
      hidePlaceholderWhenSelected={hidePlaceholderWhenSelected}
      emptyIndicator={<p className="text-center">No results found</p>}
      message={error && <p className="text-center text-destructive">{error}</p>}
      disabled={disabled}
      className={cn(
        '!text-xs border-0 bg-accent/20',
        error && 'border border-destructive',
        className
      )}
    />
  );
}
