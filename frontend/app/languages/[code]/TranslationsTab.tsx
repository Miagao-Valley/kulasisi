import React from 'react';
import { Lang } from '@/types';
import TranslationsList from '@/app/phrases/[id]/translations/TranslationsList';

interface Props {
  lang: Lang;
}

export default function TranslationsTab({ lang }: Props) {
  const filters = { lang: lang.code };
  return (
    <>
      <TranslationsList filters={filters} />
    </>
  );
}
