'use client';

import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface Props {
  name: string;
  type: string;
  placeholder: string;
  icon?: React.ReactNode;
  error?: string;
  autoFocus?: boolean;
}

export default function AuthInputField({
  name,
  type,
  placeholder,
  icon,
  error,
  autoFocus,
}: Props) {
  const [fieldType, setFieldType] = useState(type);
  const [content, setContent] = useState('');

  return (
    <div>
      <label
        className={`input input-bordered ${
          error && 'input-error'
        } flex items-center gap-3`}
      >
        <span>{icon}</span>
        <input
          className="grow w-full"
          name={name}
          type={fieldType}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onChange={(e) => setContent(e.target.value)}
        />
        {type == 'password' && content && (
          <button
            className="btn btn-ghost btn-circle btn-sm"
            type="button"
            onClick={() =>
              setFieldType(fieldType == 'password' ? 'text' : 'password')
            }
          >
            {fieldType == 'password' ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </label>
      {error && (
        <div role="alert" className="text-sm text-error">
          {error[0]}
        </div>
      )}
    </div>
  );
}
