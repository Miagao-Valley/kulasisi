import React from 'react';
import { cn } from '@/lib/utils';
import copyToClipboard from '@/utils/copyToClipboard';
import pasteFromClipboard from '@/utils/pasteFromClipboard';
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
    <div className={cn(className, 'flex items-center')}>
      <CharCountProgress charCount={text.length} maxCharCount={maxCharCount} />
      <div className="rounded-full border flex gap-0">
        {/* Copy button */}
        <Button
          title="Copy"
          aria-label="Copy"
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => copyToClipboard(text)}
          disabled={text.trim().length === 0}
          type="button"
        >
          <CopyIcon />
        </Button>

        {/* Paste button */}
        <Button
          title="Paste"
          aria-label="Paste"
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() =>
            pasteFromClipboard((clipboardText) =>
              setText((prevText) => prevText + clipboardText)
            )
          }
          type="button"
        >
          <ClipboardIcon />
        </Button>

        {/* Toggle proofreader */}
        <Button
          title="Toggle proofreader"
          aria-label="Toggle proofreader"
          variant="ghost"
          size="icon"
          className="rounded-full"
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
      </div>
    </div>
  );
};

export default EditorToolbar;
