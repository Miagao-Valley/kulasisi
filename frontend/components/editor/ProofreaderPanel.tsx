import React from 'react';
import { useEditorContext } from './EditorContext';
import FlaggedTokenCard from './FlaggedTokenCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '../ui/skeleton';

const ProofreaderPanel: React.FC = () => {
  const { text, flaggedTokens, stats, loading, error } = useEditorContext();

  if (error != null) {
    return (
      <div className="w-full h-full flex flex-col gap-1 p-1 text-center">
        <span>Proofreader is currently unavailable.</span>
        <span>{error?.lang || error?.text || 'Please try again later.'}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {/* Proofreader stats */}
      <div className="flex gap-2 text-xs">
        <span>{stats.token_count} tokens</span>
        <span>{stats.flagged_count} flagged</span>
        <span>{(stats.correctness * 100).toFixed(0)}% correct</span>
      </div>

      <Separator className="my-1" />

      {/* Flagged words list */}
      <ScrollArea className="p-0 pe-3 max-h-72 flex flex-col">
        {loading ? (
          Array.from({ length: 3 }, (_, i) => (
            <Skeleton className="h-16 rounded-xl mb-2" key={i}></Skeleton>
          ))
        ) : !text.trim() ? (
          <span>Nothing to check yet!</span>
        ) : flaggedTokens.length === 0 ? (
          <span>Looks good!</span>
        ) : (
          flaggedTokens.map((token, idx) => (
            <FlaggedTokenCard
              key={idx}
              token={token}
              concise
              className="mb-2"
            />
          ))
        )}
      </ScrollArea>
    </div>
  );
};

export default ProofreaderPanel;
