'use client';

import React, { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '../components/AuthProvider';
import { Lang } from '../../types';
import addWord from '@/lib/words/addWord';
import getLangs from '@/lib/langs/getLangs';

interface Props {
  className?: string;
}

export default function AddWordForm({ className = '' }: Props) {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [selectedLang, setSelectedLang] = useState('');
  const [word, setWord] = useState('');
  const [langs, setLangs] = useState<Lang[]>([]);

  useEffect(() => {
    const fetchLangs = async () => {
      const { results } = await getLangs();
      setLangs(results);
    };

    fetchLangs();
  }, []);

  useEffect(() => {
    const savedWord = localStorage.getItem('wordWordDraft');
    if (savedWord) {
      setWord(savedWord);
    }
  }, []);

  const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setWord(newValue);
    localStorage.setItem('wordWordDraft', newValue);
  };

  const handleSubmit = async (prevState: any, formData: FormData) => {
    if (!auth.isAuthenticated) {
      toast.error('You need to sign in to post.');
      router.push(`/auth/login?next=${pathname}`);
      return;
    }
    const res = await addWord(formData);
    if (!res?.error) {
      setSelectedLang('');
      localStorage.removeItem('wordDefinitionDraft');
      localStorage.removeItem('wordWordDraft');
      router.push(`/dictionary/${res.id}/`);
      toast.success('Posted');
    }
    return res;
  };

  const [formState, formAction] = useFormState(handleSubmit, null);

  return (
    <form className={`flex flex-col ${className}`} action={formAction}>
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
        <input
          className="input w-full text-3xl font-bold rounded-none p-1 overflow-hidden resize-none focus:outline-none focus:border-transparent"
          name="word"
          id="word-field"
          type="text"
          placeholder="word"
          value={word}
          onChange={handleWordChange}
        ></input>
        {formState?.error?.word && (
          <div role="alert" className="text-sm text-error">
            {formState.error.word[0]}
          </div>
        )}
      </div>
      <div className="flex gap-2 items-center">
        <div>
          <select
            className="select select-bordered select-sm w-full"
            name="lang"
            id="lang-select"
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
          >
            <option value="" disabled>
              Language
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
        <SubmitButton
          className="ms-auto"
          disabled={!word.trim() || !selectedLang}
        />
      </div>
    </form>
  );
}

interface SubmitButtonProps {
  disabled?: boolean;
  className?: string;
}

function SubmitButton({ disabled = false, className = '' }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      className={`btn btn-primary ${className}`}
      type="submit"
      disabled={disabled || pending}
    >
      {pending ? 'Posting...' : 'Post'}
    </button>
  );
}
