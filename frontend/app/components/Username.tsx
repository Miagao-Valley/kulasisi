import React from 'react';
import Link from 'next/link';
import shortenNum from '@/utils/shortenNum';
import { FaUserCircle } from 'react-icons/fa';

interface Props {
  username: string;
  reputation: number;
}

export default async function Username({ username, reputation }: Props) {
  return (
    <Link href={`/users/${username}`} className="flex gap-1 items-center">
      <div className="indicator">
        <span className="indicator-item badge badge-primary badge-xs">
          {shortenNum(reputation || 0)}
        </span>
        <FaUserCircle className="text-xl" />
      </div>
      <span className="text-sm font-medium hover:text-primary">{username}</span>
    </Link>
  );
}
