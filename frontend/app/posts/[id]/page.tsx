import React from 'react';
import getTextEntry from '@/lib/textEntries/getTextEntry';
import TextEntryItem from './TextEntryItem';
import TranslationsSection from './translations/TranslationsSection';

interface Props {
  params: {
    id: string;
  };
}

export default async function PostPage({ params }: Props) {
  const id = Number(params.id);
  const textEntry = await getTextEntry(id);

  return (
    <>
      <TextEntryItem textEntry={textEntry} className="mb-5" />
      <div role="tablist" className="tabs tabs-lifted">
        <input
          type="radio"
          name="post_tabs"
          role="tab"
          className="tab"
          aria-label="Translations"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <TranslationsSection textEntry={textEntry} />
        </div>
      </div>
    </>
  );
}
