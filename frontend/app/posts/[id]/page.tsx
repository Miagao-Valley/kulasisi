import React from 'react';
import getTextEntry from '@/lib/textEntries/getTextEntry';
import TextEntryFooter from '../TextEntryFooter';
import TextEntryContent from '../TextEntryContent';
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
      <div className="mb-3">
        <TextEntryContent textEntry={textEntry} />
        <TextEntryFooter textEntry={textEntry} />
      </div>
      <div role="tablist" className="tabs tabs-bordered">
        <input
          type="radio"
          name="post_tabs"
          role="tab"
          className="tab"
          aria-label="Translations"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content p-10">
          <TranslationsSection textEntry={textEntry} />
        </div>
      </div>
    </>
  );
}
