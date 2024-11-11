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
  value?: string;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  className?: string;
}

export default function AuthInputField({
  name,
  type,
  placeholder,
  icon,
  error,
  autoFocus,
  value,
  onChange,
  className = '',
}: Props) {
  const [fieldType, setFieldType] = useState(type);
  const [content, setContent] = useState(value || '');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newValue = e.target.value;
    setContent(newValue);

    if (onChange) {
      onChange(e);
    }
  };

  const renderInputField = () => {
    switch (type) {
      case 'password':
        return (
          <div className={`flex w-full ${className}`}>
            <input
              className="grow w-full"
              name={name}
              type={fieldType}
              placeholder={placeholder}
              autoFocus={autoFocus}
              value={content}
              onChange={handleChange}
            />
            {content && (
              <button
                className="btn btn-ghost btn-circle btn-sm"
                type="button"
                onClick={() =>
                  setFieldType(fieldType === 'password' ? 'text' : 'password')
                }
              >
                {fieldType === 'password' ? <FaEyeSlash /> : <FaEye />}
              </button>
            )}
          </div>
        );
      case 'email':
      case 'tel':
      case 'number':
      case 'date':
        return (
          <input
            className={`${className} grow w-full`}
            name={name}
            type={type}
            placeholder={placeholder}
            autoFocus={autoFocus}
            value={content}
            onChange={handleChange}
          />
        );
      case 'textarea':
        return (
          <textarea
            className={`${className} textarea textarea-bordered grow w-full`}
            name={name}
            placeholder={placeholder}
            autoFocus={autoFocus}
            value={content}
            onChange={handleChange}
          />
        );
      default:
        return (
          <input
            className={`${className} grow w-full`}
            name={name}
            type={type}
            placeholder={placeholder}
            autoFocus={autoFocus}
            value={content}
            onChange={handleChange}
          />
        );
    }
  };

  return (
    <div className={`${className}`}>
      {type === 'textarea' ? (
        renderInputField()
      ) : (
        <label
          className={`input input-bordered ${
            error && 'input-error'
          } flex items-center gap-3`}
        >
          {icon && <span>{icon}</span>}
          {renderInputField()}
        </label>
      )}

      {error && (
        <div role="alert" className="text-sm text-error">
          {error[0]}
        </div>
      )}
    </div>
  );
}
