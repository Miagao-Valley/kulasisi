import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <>
      <nav className="navbar custom-container mb-5 border-b-2">
        <div className="flex-1">
          <Link href="/" className="text-2xl font-bold text-primary">
            Kulasisi
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal">
            <li>
              <Link href="/posts">Posts</Link>
            </li>
            <li>
              <Link href="/languages">Languages</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
