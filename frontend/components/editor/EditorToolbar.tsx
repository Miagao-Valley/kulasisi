import React from 'react';
import { cn } from '@/lib/utils';
import copyToClipboard from '@/lib/utils/copyToClipboard';
import pasteFromClipboard from '@/lib/utils/pasteFromClipboard';
import { useEditorContext } from './EditorContext';
import CharCountProgress from './CharCountProgress';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import {
  CopyIcon,
  SpellCheck2Icon,
  SpellCheckIcon,
  ClipboardIcon,
} from 'lucide-react';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

interface EditorToolbarProps {
  className?: string;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ className }) => {
  const {
    text,
    setText,
    stats,
    maxCharCount,
    showProofreader,
    setShowProofreader,
    loading,
  } = useEditorContext();

  return (
    <div
      className={cn(
        className,
        'flex items-center motion-preset-slide-down motion-duration-300'
      )}
      tabIndex={0}
    >
      <CharCountProgress charCount={text.length} maxCharCount={maxCharCount} />

      <div className="rounded-full border flex gap-0">
        {/* Copy button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label="Copy"
              variant="ghost"
              size="icon"
              className="w-fit h-fit p-1 rounded-full"
              onClick={() => copyToClipboard(text)}
              type="button"
            >
              <CopyIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy text</TooltipContent>
        </Tooltip>

        {/* Paste button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label="Paste"
              variant="ghost"
              size="icon"
              className="w-fit h-fit p-1 rounded-full"
              onClick={() =>
                pasteFromClipboard((clipboardText) =>
                  setText((prevText) => prevText + clipboardText)
                )
              }
              type="button"
            >
              <ClipboardIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Paste text</TooltipContent>
        </Tooltip>

        {/* Toggle proofreader */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label="Toggle proofreader"
              variant={showProofreader ? 'secondary' : 'ghost'}
              size="icon"
              className="w-fit h-fit p-1 rounded-full"
              onClick={() => setShowProofreader(!showProofreader)}
              disabled={loading}
              type="button"
            >
              {loading ? (
                <Spinner />
              ) : stats.flagged_count === 0 ? (
                <SpellCheckIcon />
              ) : (
                <SpellCheck2Icon />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {showProofreader ? 'Hide proofreader' : 'Show proofreader'}{' '}
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default EditorToolbar;
