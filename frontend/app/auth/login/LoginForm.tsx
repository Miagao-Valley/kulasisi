'use client';

import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaLock, FaUser } from 'react-icons/fa';
import { useAuth } from '@/app/components/AuthProvider';
import login from '@/lib/auth/login';
import AuthInputField from '../AuthInputField';

interface SubmitButtonProps {
  disabled?: boolean;
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const auth = useAuth();

  const next = searchParams.get('next');

  const handleSubmit = async (prevState: any, formData: FormData) => {
    const res = await login(formData);
    if (!res?.error) {
      auth.updateAuth();
      console.log(next);
      if (next) {
        router.push(next);
      }
    }
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
      <AuthInputField
        name="username"
        type="text"
        placeholder="Username"
        icon={<FaUser />}
        error={formState?.error?.username}
        autoFocus={true}
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
        Don't have an account?
        <Link className="link text-primary link-hover" href={`register`}>
          Sign up
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
      {pending ? 'Signing in...' : 'Sign in'}
    </button>
  );
}
