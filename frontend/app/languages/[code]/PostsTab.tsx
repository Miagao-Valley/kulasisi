import React from 'react'
import { Lang } from '@/types'
import TextEntriesList from '@/app/posts/TextEntriesList';

interface Props {
  lang: Lang;
}

export default function PostsTab({ lang }: Props) {
  const filters = { lang: lang.code };
  return (
    <>
      <TextEntriesList filters={filters} />
    </>
  );
}
