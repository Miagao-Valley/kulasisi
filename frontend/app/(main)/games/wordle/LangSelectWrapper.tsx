'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LangSelect } from '@/components/forms/LangSelect';

interface LangSelectWrapperProps {
  currentSelectedLang: string;
  className?: string;
}

export function LangSelectWrapper({
  currentSelectedLang,
  className,
}: LangSelectWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedLang, setSelectedLang] = useState(currentSelectedLang);

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
    />
  );
}
