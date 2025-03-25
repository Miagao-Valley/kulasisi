import React from 'react';
import { Metadata } from 'next';
import { AccountTab } from './AccountTab';
import { UpdateUserForm } from './UpdateUserForm';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs-with-url';
import { H1 } from '@/components/ui/heading-with-anchor';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Update your account.',
};

export default function SettingsPage() {
  return (
    <>
      <H1>Settings</H1>

      <Tabs defaultValue={'account'}>
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <AccountTab />
        </TabsContent>
        <TabsContent value="profile">
          <UpdateUserForm />
        </TabsContent>
      </Tabs>
    </>
  );
}
