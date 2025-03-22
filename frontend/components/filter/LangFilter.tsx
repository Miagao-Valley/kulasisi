'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import LangSelect from '../forms/LangSelect';
import { Button } from '../ui/button';
import { ArrowLeftRight } from 'lucide-react';

interface Props {
  currentSourceLang: string;
  currentTargetLang: string;
  className?: string;
}

export default function LangFilter({
  currentSourceLang,
  currentTargetLang,
  className,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sourceLang, setSourceLang] = useState(currentSourceLang);
  const [targetLang, setTargetLang] = useState(currentTargetLang);

  useEffect(() => {
    const currentSearchParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );

    if (sourceLang) {
      currentSearchParams.set('sl', sourceLang);
    } else {
      currentSearchParams.delete('sl');
    }
    if (targetLang) {
      currentSearchParams.set('tl', targetLang);
    } else {
      currentSearchParams.delete('tl');
    }

    router.push(`?${currentSearchParams.toString()}`);
  }, [sourceLang, targetLang, searchParams, router]);

  const swapLangs = () => {
    const tmpLang = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(tmpLang);
  };

  return (
    <div className={cn('flex items-center gap-0', className)}>
      <LangSelect
        selectedLang={sourceLang}
        setSelectedLang={setSourceLang}
        showChevrons={false}
        placeholder="any"
      />
      <Button variant="ghost" className="p-1 h-fit" onClick={swapLangs}>
        <ArrowLeftRight />
      </Button>
      <LangSelect
        selectedLang={targetLang}
        setSelectedLang={setTargetLang}
        showChevrons={false}
        placeholder="any"
      />
    </div>
  );
}
