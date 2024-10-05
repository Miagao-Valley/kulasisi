import React from 'react';
import naturalTime from '@/utils/naturalTime';
import { FaAt, FaClock } from 'react-icons/fa';
import { MdCake, MdEmail } from 'react-icons/md';
import getUser from '@/lib/users/getUser';

interface Props {
  params: {
    username: string;
  };
}

export default async function UserPage({ params }: Props) {
  const user = await getUser(params.username);
  const lastLogin = new Date(user.last_login);
  const dateJoined = new Date(user.date_joined);

  return (
    <>
      <h1 className="mb-2">
        {user.first_name} {user.last_name}
      </h1>
      <div className="flex gap-3 mb-2">
        <span className="flex items-center gap-1">
          <FaAt /> {user.username}
        </span>
        <span className="flex items-center gap-1">
          <MdEmail /> {user.email}
        </span>
      </div>
      <div className="flex gap-3 text-sm mb-2">
        <span className="flex items-center gap-1">
          <MdCake /> Member since {dateJoined.toDateString()}
        </span>
        <span className="flex items-center gap-1">
          <FaClock /> Last seen {naturalTime(lastLogin)}
        </span>
      </div>
    </>
  );
}
