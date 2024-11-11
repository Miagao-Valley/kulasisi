'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../components/AuthProvider';
import { User } from '@/types';
import getUser from '@/lib/users/getUser';
import Loading from '../loading';
import AccountTab from './AccountTab';
import ProfileTab from './ProfileTab';

interface Props {
  searchParams: {
    tab?: string;
  };
}

export default function SettingsPage({ searchParams }: Props) {
  const auth = useAuth();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetch = async () => {
      if (auth.isAuthenticated) {
        const res = await getUser(auth.username);
        setUser(res);
      }
    };

    fetch();
  }, [auth.username, auth.isAuthenticated]);

  const currentTab = searchParams?.tab || 'account';

  if (!user) {
    return <Loading />;
  }

  return (
    <>
      <h1>Settings</h1>

      <div role="tablist" className="tabs tabs-bordered w-fit">
        <Link
          href="?tab=account"
          role="tab"
          className={`tab ${currentTab === 'account' ? 'tab-active' : ''}`}
          aria-label="Account"
        >
          Account
        </Link>
        <Link
          href="?tab=profile"
          role="tab"
          className={`tab ${currentTab === 'profile' ? 'tab-active' : ''}`}
          aria-label="Profile"
        >
          Profile
        </Link>
      </div>
      {currentTab === 'account' ? (
        <div role="tabpanel" className="p-6">
          <AccountTab user={user} />
        </div>
      ) : (
        currentTab === 'profile' && (
          <div role="tabpanel" className="p-6">
            <ProfileTab user={user} />
          </div>
        )
      )}
    </>
  );
}
