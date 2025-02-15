import React, { useRef, ChangeEvent, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useEditorContext } from './EditorContext';
import HighlightedText from './HighlightedText';
import {
  AutosizeTextarea,
  AutosizeTextAreaProps,
  AutosizeTextAreaRef,
} from '@/components/ui/autoresize-textarea';

export interface TextEditorProps extends AutosizeTextAreaProps {
  value?: string;
  onValueChange?: (text: string) => void;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({
  value,
  onValueChange,
  onChange,
  className,
  ...props
}) => {
  const { text, setText, flaggedTokens, setCurrentToken, maxCharCount, error } =
    useEditorContext();

  const textareaRef = useRef<AutosizeTextAreaRef>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > maxCharCount) return;

    setText(e.target.value);
    onChange?.(e);
  };

  const handleCursorPosition = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    const cursorPosition = (e.target as HTMLTextAreaElement).selectionStart;
    setCurrentToken(
      flaggedTokens?.find(
        ({ offset, token }) =>
          cursorPosition >= offset && cursorPosition <= offset + token.length,
      ) || null,
    );
  };

  useEffect(() => {
    setText((prev) => value || prev);
  }, [value]);

  useEffect(() => {
    if (onValueChange) {
      onValueChange(text);
    }
  }, [text]);

  // Sync scroll position between textarea and highlight overlay
  useEffect(() => {
    const textarea = textareaRef.current;
    const highlight = highlightRef.current;

    if (!textarea || !highlight) return;

    const syncScroll = () => {
      highlight.scrollTop = textarea.textArea.scrollTop;
      highlight.scrollLeft = textarea.textArea.scrollLeft;
    };

    textarea.textArea.addEventListener('scroll', syncScroll);
    return () => textarea.textArea.removeEventListener('scroll', syncScroll);
  }, []);

  return (
    <div className="relative">
      {/* Highlighted text overlay */}
      {!error && (
        <div
          ref={highlightRef}
          className={cn(
            'borderless-input p-0 m-0 me-3 rounded-none text-base absolute top-0 left-0 w-full h-full text-transparent overflow-auto whitespace-pre-wrap break-words',
            className,
          )}
        >
          <span>
            <HighlightedText />
          </span>
        </div>
      )}

      {/* Actual text area */}
      <AutosizeTextarea
        ref={textareaRef}
        value={text}
        onInput={handleInput}
        onClick={handleCursorPosition}
        spellCheck={false}
        className={cn(
          'borderless-input p-0 m-0 me-3 rounded-none text-base relative z-10 w-full h-full bg-transparent',
          className,
        )}
        minHeight={10}
        maxHeight={maxCharCount * 0.5}
        {...props}
      />
    </div>
  );
};

export default TextEditor;
