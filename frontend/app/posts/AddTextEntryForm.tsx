'use client';

import React, { useRef } from 'react';
import { Lang } from '../../types';
import addTextEntry from '@/lib/textEntries/addTextEntry';

interface Props {
  langs: Lang[];
  className?: string;
}

export default function AddTextEntryForm({ langs, className = '' }: Props) {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <>
      <form
        className={`flex flex-col gap-3 ${className}`}
        ref={ref}
        action={async (formData) => {
          await addTextEntry(formData);
          ref.current?.reset();
        }}
      >
        <select className="select select-bordered" name="lang" id="lang-select">
          {langs.map((lang) => (
            <option key={lang.id} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <textarea
          className="textarea textarea-bordered"
          name="content"
          id="content-field"
          cols={15}
          rows={5}
          placeholder="Say something..."
        ></textarea>
        <div className="flex justify-end">
          <button className="btn btn-primary" type="submit">
            Post
          </button>
        </div>
      </form>
    </>
  );
}
