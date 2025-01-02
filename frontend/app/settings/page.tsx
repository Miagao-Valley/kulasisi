'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { User } from '@/types/users';
import getUser from '@/lib/users/getUser';
import Loading from '../loading';
import AccountTab from './AccountTab';
import ProfileTab from './ProfileTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Props {
  searchParams: {
    tab?: string;
  };
}

export default function SettingsPage({ searchParams }: Props) {
  const auth = useAuth();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (auth.isAuthenticated) {
        const res = await getUser(auth.username);
        setUser(res);
      }
    };

    fetchUser();
  }, [auth.username, auth.isAuthenticated]);

  const currentTab = searchParams?.tab || 'account';

  if (!user) {
    return <Loading />;
  }

  return (
    <>
      <h1>Settings</h1>

      <Tabs defaultValue={currentTab}>
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <AccountTab user={user} />
        </TabsContent>
        <TabsContent value="profile">
          <ProfileTab user={user} />
        </TabsContent>
      </Tabs>
    </>
  );
}
