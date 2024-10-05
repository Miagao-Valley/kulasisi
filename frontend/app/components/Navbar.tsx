import React from 'react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import logout from '@/lib/auth/logout';
import verifyToken from '@/lib/tokens/verifyToken';

export default async function Navbar() {
  const authToken = await verifyToken();

  return (
    <nav className="navbar custom-container mb-5">
      <div className="navbar-start">
        <Link className="text-primary text-2xl font-bold" href={`/`}>
          Kulasisi
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={`/posts/`}>Posts</Link>
          </li>
          <li>
            <Link href={`/languages/`}>Languages</Link>
          </li>
          <li>
            <Link href={`/users/`}>Users</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end flex gap-2">
        {authToken ? (
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
                <Link
                  className="font-bold"
                  href={`/users/${authToken.username}/`}
                >
                  @{authToken.username}
                </Link>
              </li>
              <li>
                <form action={logout}>
                  <button className="flex items-center gap-1">
                    Sign out <MdLogout />
                  </button>
                </form>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link
              href={`/login/`}
              className="btn btn-sm btn-primary btn-outline"
            >
              Sign in
            </Link>
            <Link href={`/register/`} className="btn btn-sm btn-primary">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
