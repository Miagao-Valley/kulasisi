'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import getProofreaderLangs from '@/lib/proofreader/getProofreaderLangs';
import LangSelect from '@/components/forms/LangSelect';

interface LangSelectWrapperProps {
  currentSelectedLang: string;
}

export default function LangSelectWrapper({
  currentSelectedLang,
}: LangSelectWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedLang, setSelectedLang] = useState(currentSelectedLang);
  const [supportedLangs, setSupportedLangs] = useState<string[]>([]);

  useEffect(() => {
    const fetchSupportedLangs = async () => {
      const langs = await getProofreaderLangs();
      setSupportedLangs(langs);
    };

    fetchSupportedLangs();
  }, []);

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
    supportedLangs.length > 0 && (
      <LangSelect
        selectedLang={selectedLang}
        setSelectedLang={(lang) => setSelectedLang(lang)}
        include={supportedLangs}
      />
    )
  );
}
