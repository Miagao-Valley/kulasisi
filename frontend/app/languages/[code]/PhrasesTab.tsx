import React from 'react';
import { Lang } from '@/types';
import TextEntriesList from '@/app/phrases/PhraseEntriesList';

interface Props {
  lang: Lang;
}

export default function PhrasesTab({ lang }: Props) {
  const filters = { lang: lang.code };
  return (
    <>
      <TextEntriesList filters={filters} />
    </>
  );
}
