import React, { useState, useRef, ChangeEvent } from 'react';
import { cn } from '@/lib/utils';
import { AutosizeTextarea, AutosizeTextAreaProps, AutosizeTextAreaRef } from './autoresize-textarea';
import applyHighlights from '../applyHighlights';

interface HighlightedTextareaProps extends AutosizeTextAreaProps {
  highlight?: string | RegExp;
  highlightClass?: string;
  className?: string;
}

const HighlightedTextarea: React.FC<HighlightedTextareaProps> = ({ highlight, highlightClass, className, ...props }) => {
  const [text, setText] = useState(props.value || '');
  const textareaRef = useRef<AutosizeTextAreaRef>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (props.onChange) props.onChange(e);
  };

  return (
    <div className="relative w-full">
      <div
        ref={backdropRef}
        className={cn(
          "absolute top-0 left-0 w-full h-full overflow-auto whitespace-pre-wrap break-words",
          className
        )}
      >
        <div>{applyHighlights(text as string, highlight, highlightClass)}</div>
      </div>

      <AutosizeTextarea
        ref={textareaRef}
        value={text}
        onInput={handleInput}
        className={cn(
          "relative z-10 w-full h-full bg-transparent text-transparent caret-gray-800",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default HighlightedTextarea;
