import React from 'react';
import Link from 'next/link';
import { User } from '@/types';
import { FaBirthdayCake, FaCalendar, FaLink, FaMapPin } from 'react-icons/fa';

interface Props {
  user: User;
  className?: string;
}

export default function Overview({ user, className = '' }: Props) {
  const dateJoined = new Date(user.date_joined);
  const dateOfBirth = new Date(user.date_of_birth || '');

  return (
    <div className={`${className}`}>
      <div>
        <h1 className="text-2xl mb-0">
          {user.first_name} {user.last_name}
        </h1>
        <span>@{user.username}</span>
      </div>
      <p className="mt-3 mb-2">{user.bio}</p>
      <div className="flex gap-3 text-sm mb-2">
        {user.website && (
          <span className="flex items-center gap-1">
            <FaLink />{' '}
            <Link className="link link-primary link-hover" href={user.website}>
              {new URL(user.website).hostname.replace(/^www\./, '')}
            </Link>
          </span>
        )}
        {user.location && (
          <span className="flex items-center gap-1">
            <FaMapPin /> {user.location}
          </span>
        )}
        {dateOfBirth && (
          <span className="flex items-center gap-1">
            <FaBirthdayCake /> Born{' '}
            {dateOfBirth.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
            })}
          </span>
        )}
        {dateJoined && (
          <span className="flex items-center gap-1">
            <FaCalendar /> Joined{' '}
            {dateJoined.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
            })}
          </span>
        )}
      </div>
    </div>
  );
}
