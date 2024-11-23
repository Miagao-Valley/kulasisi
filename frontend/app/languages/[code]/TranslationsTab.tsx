import React from 'react'
import { Lang } from '@/types'
import TranslationsList from '@/app/posts/[id]/translations/TranslationsList';

interface Props {
  lang: Lang;
}

export default function PostsTab({ lang }: Props) {
  const filters = { lang: lang.code };
  return (
    <>
      <TranslationsList filters={filters} />
    </>
  );
}
