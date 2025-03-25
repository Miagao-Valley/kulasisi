import React from 'react';
import { Metadata } from 'next';
import { EditorWrapper } from './EditorWrapper';
import { LangSelectWrapper } from './LangSelectWrapper';
import { H1 } from '@/components/ui/heading-with-anchor';

export const metadata: Metadata = {
  title: 'Proofreader',
  description: 'Check your writing for errors and improvements.',
};

interface Props {
  searchParams: { [key: string]: string | undefined };
}

export default async function ProofreaderPage({ searchParams }: Props) {
  const lang = searchParams.lang || 'eng';

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <H1 className="mb-0">Proofreader</H1>
        <LangSelectWrapper currentSelectedLang={lang} />
      </div>
      <EditorWrapper lang={lang} />
    </>
  );
}
