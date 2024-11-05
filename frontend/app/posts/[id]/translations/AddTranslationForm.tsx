'use client';

import React, { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../components/AuthProvider';
import { Lang } from '@/types';
import addTranslation from '@/lib/translations/addTranslation';
import getLangs from '@/lib/langs/getLangs';
import toast from 'react-hot-toast';

interface Props {
  id: number;
  original_lang: string;
  className?: string;
}

interface SubmitButtonProps {
  disabled?: boolean;
}

export default function AddTranslationForm({
  id,
  original_lang,
  className = '',
}: Props) {
  const auth = useAuth();
  const router = useRouter();

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
  };

  const handleSubmit = async (prevState: any, formData: FormData) => {
    const res = await addTranslation(id, formData);
    console.log(res);
    if (!res?.error) {
      setSelectedLang('');
      setContent('');
      router.refresh();
      toast.success('Translation added');
    }
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
            Select target language
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
          placeholder="Add your translation..."
          value={content}
          onChange={handleContentChange}
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
      {pending ? 'Adding...' : 'Add'}
    </button>
  );
}
