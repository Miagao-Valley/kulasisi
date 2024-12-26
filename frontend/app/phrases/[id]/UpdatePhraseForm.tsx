'use client';

import React, { useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import toast from 'react-hot-toast';
import updatePhrase from '@/lib/phrases/updatePhrase';

interface Props {
  id: number;
  initialContent?: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

export default function UpdatePhraseForm({
  id,
  initialContent = '',
  setIsEditing,
  className = '',
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [content, setContent] = useState('');

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
    const res = await updatePhrase(id, formData);
    if (!res?.error) {
      setContent('');
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
          <textarea
            className="textarea text-base w-full p-0 rounded-none overflow-hidden resize-none focus:outline-none focus:border-transparent"
            name="content"
            id="content-field"
            ref={textareaRef}
            rows={1}
            autoFocus={true}
            placeholder="Enter updated phrase"
            defaultValue={initialContent}
            value={content}
            onChange={handleContentChange}
          ></textarea>
          {formState?.error?.content && (
            <div role="alert" className="text-sm text-error">
              {formState.error.content[0]}
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
            disabled={!content.trim() || content == initialContent}
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
