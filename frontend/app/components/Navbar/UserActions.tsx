'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../AuthProvider';
import { FaUser } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';

export default function UserActions() {
  const auth = useAuth();

  if (auth.isLoading) {
    return;
  }

  return (
    <>
      {auth.isAuthenticated ? (
        <div className="dropdown dropdown-bottom dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-sm btn-circle text-lg"
          >
            <FaUser />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <Link className="font-bold" href={`/users/${auth.username}/`}>
                @{auth.username}
              </Link>
            </li>
            <li>
              <Link href={`/auth/logout/`} className="flex items-center gap-1">
                Sign out <MdLogout />
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <>
          <Link
            href={`/auth/login/`}
            className="btn btn-sm btn-primary btn-outline"
          >
            Sign in
          </Link>
          <Link href={`/auth/register/`} className="btn btn-sm btn-primary">
            Sign up
          </Link>
        </>
      )}
    </>
  );
}
