'use client';

import React from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { AccountTab } from './AccountTab';
import { UpdateUserForm } from './UpdateUserForm';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs-with-url';
import { H1 } from '@/components/ui/heading-with-anchor';

export default function SettingsPage() {
  const auth = useAuth();

  if (!auth.user) {
    return <div>No user found.</div>;
  }

  return (
    <>
      <H1>Settings</H1>

      <Tabs defaultValue={'account'}>
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <AccountTab user={auth.user} />
        </TabsContent>
        <TabsContent value="profile">
          <UpdateUserForm user={auth.user} />
        </TabsContent>
      </Tabs>
    </>
  );
}
