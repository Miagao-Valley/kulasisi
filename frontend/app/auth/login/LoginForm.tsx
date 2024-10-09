'use client';

import React from 'react';
import Link from 'next/link';
import { FaLock, FaUser } from 'react-icons/fa';
import { useAuth } from '@/app/components/AuthProvider';
import login from '@/lib/auth/login';

export default function LoginForm() {
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    await login(formData);
    auth.updateAuth();
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit} method="POST">
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
      <button className="btn btn-primary" type="submit">
        Sign in
      </button>
      <p className="flex gap-1">
        Don't have an account?
        <Link className="link text-primary link-hover" href={`register`}>
          Sign up
        </Link>
      </p>
    </form>
  );
}
