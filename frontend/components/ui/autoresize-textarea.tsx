'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';

interface UseAutosizeTextAreaProps {
  textAreaRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  minHeight?: number;
  maxHeight?: number;
  triggerAutoSize: string;
}

export const useAutosizeTextArea = ({
  textAreaRef,
  triggerAutoSize,
  maxHeight = Number.MAX_SAFE_INTEGER,
  minHeight = 0,
}: UseAutosizeTextAreaProps) => {
  const [init, setInit] = React.useState(true);
  React.useEffect(() => {
    // We need to reset the height momentarily to get the correct scrollHeight for the textarea
    const offsetBorder = 6;
    const textAreaElement = textAreaRef.current;
    if (textAreaElement) {
      if (init) {
        textAreaElement.style.minHeight = `${minHeight + offsetBorder}px`;
        if (maxHeight > minHeight) {
          textAreaElement.style.maxHeight = `${maxHeight}px`;
        }
        setInit(false);
      }
      textAreaElement.style.height = `${minHeight + offsetBorder}px`;
      const scrollHeight = textAreaElement.scrollHeight;
      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      if (scrollHeight > maxHeight) {
        textAreaElement.style.height = `${maxHeight}px`;
      } else {
        textAreaElement.style.height = `${scrollHeight + offsetBorder}px`;
      }
    }
  }, [triggerAutoSize, init, maxHeight, minHeight, textAreaRef]);
};

export type AutosizeTextAreaRef = {
  textArea: HTMLTextAreaElement | null;
  focus: () => void;
};

export type AutosizeTextAreaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    maxHeight?: number;
    minHeight?: number;
    ref?: React.Ref<AutosizeTextAreaRef>;
  };

export function AutosizeTextarea({
  maxHeight = Number.MAX_SAFE_INTEGER,
  minHeight = 0,
  className,
  onChange,
  value,
  ref,
  ...props
}: AutosizeTextAreaProps) {
  const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const [triggerAutoSize, setTriggerAutoSize] = React.useState('');

  useAutosizeTextArea({
    textAreaRef,
    triggerAutoSize,
    maxHeight,
    minHeight,
  });

  React.useImperativeHandle(ref, () => ({
    textArea: textAreaRef.current,
    focus: () => textAreaRef.current?.focus(),
  }));

  React.useEffect(() => {
    setTriggerAutoSize(value as string);
  }, [value]);

  return (
    <textarea
      {...props}
      value={value}
      ref={textAreaRef}
      className={cn(className)}
      onChange={(e) => {
        setTriggerAutoSize(e.target.value);
        onChange?.(e);
      }}
    />
  );
}
