'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { FaLock, FaUser } from 'react-icons/fa';
import { useAuth } from '@/app/components/AuthProvider';
import login from '@/lib/auth/login';

interface SubmitButtonProps {
  disabled?: boolean;
}

export default function LoginForm() {
  const auth = useAuth();

  const handleSubmit = async (formData: FormData) => {
    await login(formData);
    auth.updateAuth();
  };

  return (
    <form className="flex flex-col gap-3" action={handleSubmit} method="POST">
      <label className="input input-bordered flex items-center gap-3">
        <FaUser />
        <input
          className="grow"
          name="username"
          type="text"
          placeholder="Username"
          autoFocus={true}
        />
      </label>
      <label className="input input-bordered flex items-center gap-3">
        <FaLock />
        <input
          className="grow"
          name="password"
          type="password"
          placeholder="Password"
        />
      </label>
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
