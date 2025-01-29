'use client'

import React from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import UserHoverCard from '@/components/hover-cards/UserHoverCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function GotoAddWord() {
  const auth = useAuth();

  return (
    <div className="flex gap-2 items-center">
      <UserHoverCard username={auth.username} showAvatar={true} showUsername={false} />
      <Button variant="outline" className="w-full justify-start" asChild>
        <Link href="/dictionary/submit/">Add a new word</Link>
      </Button>
    </div>
  );
}
