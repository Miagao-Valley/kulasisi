'use client';

import React, { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useAuth } from '../components/AuthProvider';
import { Lang } from '../../types';
import addTextEntry from '@/lib/textEntries/addTextEntry';
import getLangs from '@/lib/langs/getLangs';
import { useRouter } from 'next/navigation';

interface Props {
  className?: string;
}

interface SubmitButtonProps {
  disabled?: boolean;
}

export default function AddTextEntryForm({ className = '' }: Props) {
  const auth = useAuth();
  const router = useRouter();

  const [selectedLang, setSelectedLang] = useState('');
  const [content, setContent] = useState('');
  const [langs, setLangs] = useState<Lang[]>([]);

  useEffect(() => {
    const fetchLangs = async () => {
      const { results } = await getLangs();
      setLangs(results);
    };

    fetchLangs();
  }, []);

  const handleSubmit = async (prevState: any, formData: FormData) => {
    const res = await addTextEntry(formData);
    if (!res?.error) {
      setSelectedLang('');
      setContent('');
    }
    router.refresh();
    return res;
  };

  const [formState, formAction] = useFormState(handleSubmit, null);

  return (
    <form className={`flex flex-col gap-3 ${className}`} action={formAction}>
      {formState?.error?.detail && (
        <div role="alert" className="text-sm text-error">
          {formState.error.detail}
        </div>
      )}
      {formState?.error?.non_field_errors && (
        <div role="alert" className="text-sm text-error">
          {formState.error.non_field_errors[0]}
        </div>
      )}
      <div>
        <select
          className="select select-bordered w-full"
          name="lang"
          id="lang-select"
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          disabled={!auth.isAuthenticated}
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
        {formState?.error?.lang && (
          <div role="alert" className="text-sm text-error">
            {formState.error.lang[0]}
          </div>
        )}
      </div>
      <div>
        <textarea
          className="textarea textarea-bordered w-full"
          name="content"
          id="content-field"
          cols={15}
          rows={5}
          placeholder="Say something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={!auth.isAuthenticated}
        ></textarea>
        {formState?.error?.content && (
          <div role="alert" className="text-sm text-error">
            {formState.error.content[0]}
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <SubmitButton
          disabled={!content.trim() || !selectedLang || !auth.isAuthenticated}
        />
      </div>
    </form>
  );
}

function SubmitButton({ disabled = false }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      className="btn btn-primary"
      type="submit"
      disabled={disabled || pending}
    >
      {pending ? 'Posting...' : 'Post'}
    </button>
  );
}
