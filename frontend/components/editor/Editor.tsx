'use client';

import React, { useEffect, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { proofread } from '@/lib/proofreader/proofread';
import { useEditorContext } from './EditorContext';
import { FlaggedToken, flaggedTokenLevelValue } from '@/types/proofreader';
import { TextEditor, TextEditorProps } from './TextEditor';
import { ProofreaderPanel } from './ProofreaderPanel';
import { EditorToolbar } from './EditorToolbar';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

interface EditorProps extends TextEditorProps {
  value?: string;
  onValueChange?: (text: string) => void;
  className?: string;
}

const Editor: React.FC<EditorProps> = ({
  onValueChange,
  className,
  ...props
}) => {
  const {
    lang,
    text,
    setFlaggedTokens,
    setStats,
    showToolbar,
    showProofreader,
    setLoading,
    setError,
  } = useEditorContext();
  const isMobile = useIsMobile();

  const fetchProofreaderData = useCallback(
    async (text: string) => {
      setLoading(true);

      try {
        const { data, error } = await proofread(text, lang);

        if (error) {
          setError(error);

          setFlaggedTokens([]);
          setStats({ token_count: 0, flagged_count: 0, correctness: 0 });
          setLoading(false);
          return;
        }
        setError(null);

        if (!data) {
          setFlaggedTokens([]);
          setStats({ token_count: 0, flagged_count: 0, correctness: 0 });
          setLoading(false);
          return;
        }

        const sortedTokens = [...data.flagged_tokens].sort(
          (a: FlaggedToken, b: FlaggedToken) =>
            a.offset - b.offset ||
            flaggedTokenLevelValue[a.level] - flaggedTokenLevelValue[b.level]
        );
        setFlaggedTokens(sortedTokens);

        setStats(
          data?.stats || { token_count: 0, flagged_count: 0, correctness: 0 }
        );
      } catch (error) {
        console.error('Error fetching proofread data:', error);
      } finally {
        setLoading(false);
      }
    },
    [lang, setFlaggedTokens, setStats, setLoading, setError]
  );

  useEffect(() => {
    if (!lang || !text.trim()) {
      setFlaggedTokens([]);
      setStats({ token_count: 0, flagged_count: 0, correctness: 0 });
      setLoading(false);
      return;
    }

    const delay = 500;
    const timeoutId = setTimeout(() => {
      fetchProofreaderData(text);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [text, lang]);

  return (
    <div className={cn(className, 'flex flex-col gap-1 my-2')}>
      <ResizablePanelGroup
        autoSaveId="persistence"
        direction={isMobile ? 'vertical' : 'horizontal'}
        className="min-h-6 flex-col! md:flex-row! gap-3"
      >
        <ResizablePanel
          defaultSize={75}
          minSize={30}
          className="basis-auto! md:basis-0!"
        >
          <TextEditor onValueChange={onValueChange} {...props} />
        </ResizablePanel>

        {showToolbar && isMobile && <EditorToolbar />}

        {showProofreader && (
          <>
            <ResizableHandle withHandle className="mx-2 hidden md:flex" />
            <ResizablePanel
              defaultSize={25}
              minSize={20}
              className="basis-auto! md:basis-0!"
            >
              <ProofreaderPanel />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>

      {showToolbar && !isMobile && <EditorToolbar />}
    </div>
  );
};

export { Editor };
