'use client';

import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { FaLock, FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useAuth } from '@/app/components/AuthProvider';
import register from '@/lib/auth/register';
import AuthInputField from '../AuthInputField';

interface SubmitButtonProps {
  disabled?: boolean;
}

export default function RegisterForm() {
  const auth = useAuth();

  const handleSubmit = async (prevState: any, formData: FormData) => {
    const res = await register(formData);
    auth.updateAuth();
    return res;
  };

  const [formState, formAction] = useFormState(handleSubmit, null);

  return (
    <form className="flex flex-col gap-3" action={formAction}>
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
      <div className="flex flex-col sm:flex-row gap-2">
        <AuthInputField
          name="first_name"
          type="text"
          placeholder="First Name"
          error={formState?.error?.first_name}
          autoFocus={true}
        />
        <AuthInputField
          name="last_name"
          type="text"
          placeholder="Last Name"
          error={formState?.error?.last_name}
        />
      </div>
      <AuthInputField
        name="username"
        type="text"
        placeholder="Username"
        icon={<FaUser />}
        error={formState?.error?.username}
      />
      <AuthInputField
        name="email"
        type="text"
        placeholder="Email"
        icon={<MdEmail />}
        error={formState?.error?.email}
      />
      <AuthInputField
        name="password"
        type="password"
        placeholder="Password"
        icon={<FaLock />}
        error={formState?.error?.password}
      />
      <SubmitButton />
      <p className="flex gap-1">
        Already have an account?
        <Link className="link text-primary link-hover" href={`login`}>
          Sign in
        </Link>
      </p>
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
      {pending ? 'Signing up...' : 'Sign up'}
    </button>
  );
}
