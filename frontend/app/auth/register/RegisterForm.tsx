'use client';

import React from 'react';
import Link from 'next/link';
import { FaLock, FaAt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useAuth } from '@/app/components/AuthProvider';
import register from '@/lib/auth/register';

export default function RegisterForm() {
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    await register(formData);
    auth.updateAuth();
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit} method="POST">
      <input
        className="input input-bordered"
        name="first_name"
        type="text"
        placeholder="First name"
        autoFocus={true}
      />
      <input
        className="input input-bordered"
        name="last_name"
        type="text"
        placeholder="Last name"
      />
      <label className="input input-bordered flex items-center gap-3">
        <FaAt />
        <input
          className="grow"
          name="username"
          type="text"
          placeholder="Username"
        />
      </label>
      <label className="input input-bordered flex items-center gap-3">
        <MdEmail />
        <input className="grow" name="email" type="text" placeholder="Email" />
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
        Sign up
      </button>
      <p className="flex gap-1">
        Already have an account?
        <Link className="link text-primary link-hover" href={`login`}>
          Sign in
        </Link>
      </p>
    </form>
  );
}
