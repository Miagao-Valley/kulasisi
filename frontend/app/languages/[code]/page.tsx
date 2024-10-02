import React from 'react';
import Link from 'next/link';
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
      <div className="mb-2">
        <Link href={`https://iso639-3.sil.org/code/${lang.code}/`}>
          <div className="tooltip tooltip-right" data-tip="ISO 639">
            <span className="badge badge-primary [&:not(:hover)]:badge-outline">
              {lang.code}
            </span>
          </div>
        </Link>
      </div>
      <h1>{lang.name}</h1>
    </>
  );
}
