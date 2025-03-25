'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Slider } from '@/components/ui/slider';
import { DEFAULT_WORD_LENGTH } from './WordleContext';

interface WordLengthSliderProps {
  currentLength: number;
  className?: string;
}

export function WordLengthSlider({
  currentLength,
  className,
}: WordLengthSliderProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [length, setLength] = useState(
    isAuthenticated ? currentLength : DEFAULT_WORD_LENGTH
  );
  const [debouncedLength] = useDebounce(length, 300);

  useEffect(() => {
    const currentSearchParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );
    if (debouncedLength) {
      currentSearchParams.set('len', debouncedLength.toString());
    } else {
      currentSearchParams.delete('len');
    }
    router.push(`?${currentSearchParams.toString()}`);
  }, [debouncedLength, searchParams, router]);

  return (
    <div
      className={`flex items-center gap-1 px-3 py-1 rounded-full border ${
        !isAuthenticated && 'text-muted-foreground'
      }`}
    >
      <span className="text-xs">{length} letters</span>
      <Slider
        defaultValue={[length]}
        onValueChange={(value: number[]) => setLength(value[0])}
        max={7}
        min={3}
        step={1}
        className={cn('w-16', className)}
        disabled={!isAuthenticated}
        onClick={() => {
          if (!isAuthenticated) {
            toast.error('Sign in to change the word length.');
          }
        }}
      />
    </div>
  );
}
