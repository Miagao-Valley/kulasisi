'use client';

import React, { useRef, useState } from 'react';
import { Lang } from '../../types';
import addTextEntry from '@/lib/textEntries/addTextEntry';

interface Props {
  langs: Lang[];
  className?: string;
}

export default function AddTextEntryForm({ langs, className = '' }: Props) {
  const ref = useRef<HTMLFormElement>(null);
  const [content, setContent] = useState('');
  const [selectedLang, setSelectedLang] = useState('');

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLang(e.target.value);
  };

  const handleSubmit = async (formData: FormData) => {
    await addTextEntry(formData);
    ref.current?.reset();
    setContent('');
    setSelectedLang('');
  };

  return (
    <form
      className={`flex flex-col gap-3 ${className}`}
      ref={ref}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(new FormData(ref.current!));
      }}
    >
      <select
        className="select select-bordered"
        name="lang"
        id="lang-select"
        value={selectedLang}
        onChange={handleLangChange}
        required
      >
        <option value="" disabled>
          Select a language
        </option>
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
        value={content}
        onChange={handleContentChange}
      ></textarea>
      <div className="flex justify-end">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={!content.trim() || !selectedLang}
        >
          Post
        </button>
      </div>
    </form>
  );
}
