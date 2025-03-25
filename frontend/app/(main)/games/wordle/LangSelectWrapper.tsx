'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { useSearchParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { LangSelect } from '@/components/forms/LangSelect';
import { DEFAULT_LANG } from './WordleContext';

interface LangSelectWrapperProps {
  currentSelectedLang: string;
  className?: string;
}

export function LangSelectWrapper({
  currentSelectedLang,
  className,
}: LangSelectWrapperProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedLang, setSelectedLang] = useState(
    isAuthenticated ? currentSelectedLang : DEFAULT_LANG
  );

  useEffect(() => {
    const currentSearchParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );
    if (selectedLang) {
      currentSearchParams.set('lang', selectedLang);
    } else {
      currentSearchParams.delete('lang');
    }
    router.push(`?${currentSearchParams.toString()}`);
  }, [selectedLang, searchParams, router]);

  return (
    <LangSelect
      selectedLang={selectedLang}
      setSelectedLang={(lang) => setSelectedLang(lang)}
      className={cn(className)}
      disabled={!isAuthenticated}
      onClick={() => {
        if (!isAuthenticated) {
          toast.error('Sign in to change the word length.');
        }
      }}
    />
  );
}
