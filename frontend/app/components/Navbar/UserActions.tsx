'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../AuthProvider';
import { FaUserCircle } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
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
            <FaUserCircle className="text-xl"/>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box bg-base-100 z-[1] w-52 p-2 shadow"
          >
            <li>
              <Link
                href={`/users/${auth.username}/`}
                className="flex flex-col gap-1"
              >
                <div className="w-full">View Profile</div>
                <span className="w-full text-xs">@{auth.username}</span>
              </Link>
            </li>
            <li>
              <Link href={`/settings/`} className="flex items-center gap-1">
                <FaGear /> Settings
              </Link>
            </li>
            <li>
              <Link href={`/auth/logout/`} className="flex items-center gap-1">
                <MdLogout /> Sign out
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
