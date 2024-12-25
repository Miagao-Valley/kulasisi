import React from 'react';
import Link from 'next/link';
import UserActions from './UserActions';

export default async function Navbar() {
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
            <Link href={`/phrases/`}>Phrases</Link>
          </li>
          <li>
            <Link href={`/dictionary/`}>Dictionary</Link>
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
        <UserActions />
      </div>
    </nav>
  );
}
