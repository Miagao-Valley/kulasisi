'use client';

import React, { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import toast from 'react-hot-toast';
import updateDictEntry from '@/lib/dictEntries/updateDictEntry';

interface Props {
  id: number;
  initialWord?: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

export default function UpdateDictEntryForm({
  id,
  initialWord = '',
  setIsEditing,
  className = '',
}: Props) {
  const [word, setWord] = useState(initialWord);

  const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setWord(newValue);
  };

  const handleSubmit = async (prevState: any, formData: FormData) => {
    const res = await updateDictEntry(id, formData);
    if (!res?.error) {
      setWord('');
      toast.success('Entry updated');
      setIsEditing(false);
    }
    return res;
  };

  const [formState, formAction] = useFormState(handleSubmit, null);

  return (
    <>
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
          <input
            className="input text-xl font-bold w-full p-0 rounded-none overflow-hidden resize-none focus:outline-none focus:border-transparent"
            name="word"
            id="word-field"
            type="text"
            autoFocus={true}
            placeholder="Enter updated word"
            defaultValue={initialWord}
            value={word}
            onChange={handleWordChange}
          ></input>
          {formState?.error?.word && (
            <div role="alert" className="text-sm text-error">
              {formState.error.word[0]}
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="btn"
            type="button"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
          <UpdateButton
            disabled={!word.trim() || word == initialWord}
          />
        </div>
      </form>
    </>
  );
}

interface UpdateButtonProps {
  disabled?: boolean;
}

function UpdateButton({ disabled = false }: UpdateButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      className="btn btn-primary"
      type="submit"
      disabled={disabled || pending}
    >
      {pending ? 'Saving...' : 'Save'}
    </button>
  );
}
