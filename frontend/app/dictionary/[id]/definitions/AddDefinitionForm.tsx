'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '../../../components/AuthProvider';
import { Lang } from '@/types/languages';
import addDefinition from '@/lib/definitions/addDefinition';
import getLangs from '@/lib/langs/getLangs';

interface Props {
  wordId: number;
  original_lang: string;
  className?: string;
}

export default function AddDefinitionForm({
  wordId,
  original_lang,
  className = '',
}: Props) {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [selectedLang, setSelectedLang] = useState('');
  const [description, setDescription] = useState('');
  const [langs, setLangs] = useState<Lang[]>([]);

  useEffect(() => {
    const fetchLangs = async () => {
      const { results } = await getLangs();
      setLangs(results);
    };

    fetchLangs();
  }, [original_lang]);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newValue = e.target.value;
    setDescription(newValue);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleSubmit = async (prevState: any, formData: FormData) => {
    if (!auth.isAuthenticated) {
      toast.error('You need to sign in to post.');
      router.push(`/auth/login?next=${pathname}`);
      return;
    }
    const res = await addDefinition(wordId, formData);
    console.log(res);
    if (!res?.error) {
      setSelectedLang('');
      setDescription('');
      toast.success('Definition added');
    }
    return res;
  };

  const [formState, formAction] = useFormState(handleSubmit, null);

  return (
    <form className={`flex flex-col ${className}`} action={formAction}>
      <input type="hidden" name="word" value={wordId} />
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
          name="description"
          id="description-field"
          ref={textareaRef}
          rows={1}
          placeholder="Enter your definition"
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>
        {formState?.error?.description && (
          <div role="alert" className="text-sm text-error">
            {formState.error.description[0]}
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
          disabled={!description.trim() || !selectedLang}
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
