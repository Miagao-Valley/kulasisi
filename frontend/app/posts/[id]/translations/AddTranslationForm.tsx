'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '../../../components/AuthProvider';
import { Lang } from '@/types';
import addTranslation from '@/lib/translations/addTranslation';
import getLangs from '@/lib/langs/getLangs';

interface Props {
  textEntryId: number;
  original_lang: string;
  className?: string;
}

export default function AddTranslationForm({
  textEntryId,
  original_lang,
  className = '',
}: Props) {
  const auth = useAuth();
  const router = useRouter();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [selectedLang, setSelectedLang] = useState('');
  const [content, setContent] = useState('');
  const [langs, setLangs] = useState<Lang[]>([]);

  useEffect(() => {
    const fetchLangs = async () => {
      const { results } = await getLangs();
      setLangs(results.filter((result) => result.code !== original_lang));
    };

    fetchLangs();
  }, [original_lang]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setContent(newValue);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleSubmit = async (prevState: any, formData: FormData) => {
    if (!auth.isAuthenticated) {
      toast.error('You need to sign in to post.')
      router.push(`/auth/login/`)
      return
    }
    const res = await addTranslation(textEntryId, formData);
    console.log(res);
    if (!res?.error) {
      setSelectedLang('');
      setContent('');
      toast.success('Translation added');
    }
    return res;
  };

  const [formState, formAction] = useFormState(handleSubmit, null);

  return (
    <form className={`flex flex-col ${className}`} action={formAction}>
      <input type="hidden" name="text_entry" value={textEntryId} />
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
        <textarea
          className="textarea w-full text-xl rounded-none p-1 overflow-hidden resize-none focus:outline-none focus:border-transparent"
          name="content"
          id="content-field"
          ref={textareaRef}
          rows={1}
          placeholder="Add your translation..."
          value={content}
          onChange={handleContentChange}
        ></textarea>
        {formState?.error?.content && (
          <div role="alert" className="text-sm text-error">
            {formState.error.content[0]}
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
          disabled={!content.trim() || !selectedLang}
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
      {pending ? 'Adding...' : 'Add'}
    </button>
  );
}
