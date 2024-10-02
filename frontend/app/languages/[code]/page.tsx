import React from 'react';
import { Lang } from '@/types';
import getLang from '@/lib/langs/getLang';

interface Props {
  params: {
    code: string;
  };
}

export default async function LanguagePage({ params }: Props) {
  const lang: Lang = await getLang(params.code);
  return (
    <>
      <div>{lang.code}</div>
      <h1>{lang.name}</h1>
    </>
  );
}
