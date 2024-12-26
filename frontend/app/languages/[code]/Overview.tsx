'use client';

import React from 'react';
import Link from 'next/link';
import { Lang } from '@/types';

interface Props {
  lang: Lang;
  className?: string;
}

export default function Overview({ lang, className = '' }: Props) {
  return (
    <div className={`${className}`}>
      <div className="flex gap-1">
        <div>
          <div>
            <Link href={`https://iso639-3.sil.org/code/${lang.code}/`}>
              <div className="tooltip tooltip-right" data-tip="ISO 639">
                <span className="badge badge-primary [&:not(:hover)]:badge-outline">
                  {lang.code}
                </span>
              </div>
            </Link>
          </div>
          <h1 className="text-3xl mb-0">{lang.name}</h1>
        </div>
      </div>
    </div>
  );
}
