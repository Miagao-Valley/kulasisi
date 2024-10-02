'use client';

import React, { useRef } from 'react';
import { Lang } from '../../types';
import addTextEntry from '@/lib/textEntries/addTextEntry';

interface Props {
  langs: Lang[];
}

export default function AddTextEntryForm({ langs }: Props) {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <>
      <form
        ref={ref}
        action={async (formData) => {
          await addTextEntry(formData);
          ref.current?.reset();
        }}
      >
        <select name="lang" id="lang-select">
          {langs.map((lang) => (
            <option key={lang.id} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <textarea
          name="content"
          id="content-field"
          cols={15}
          rows={5}
        ></textarea>
        <div>
          <button type="submit">Post</button>
        </div>
      </form>
    </>
  );
}
