'use client';

import { useState } from 'react';
import { Entry } from '@/types/core';
import { isPhrase, isTranslation } from '@/types/phrases';
import { isDefinition, isWord } from '@/types/dictionary';
import copyToClipboard from '@/lib/utils/copyToClipboard';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Button } from '../ui/button';
import { CopyIcon, CheckIcon } from 'lucide-react';

interface Props {
  entry: Entry;
}

export default function CopyEntry({ entry }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  let content = '';
  if (isPhrase(entry) || isTranslation(entry)) {
    content = entry.content;
  } else if (isWord(entry)) {
    content = entry.word;
  } else if (isDefinition(entry)) {
    content = entry.description;
  } else {
    console.error('Unknown entry type');
  }

  const handleCopy = () => {
    copyToClipboard(content, 'Content copied to clipboard.');
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="w-fit h-fit p-1 px-2 bg-transparent"
          onClick={handleCopy}
          disabled={isCopied}
        >
          {isCopied ? (
            <CheckIcon className="w-4 h-4" />
          ) : (
            <CopyIcon className="w-4 h-4" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        {isCopied ? 'Content copied!' : 'Copy content'}
      </TooltipContent>
    </Tooltip>
  );
}
