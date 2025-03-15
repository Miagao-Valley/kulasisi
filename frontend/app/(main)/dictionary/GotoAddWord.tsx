'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function GotoAddWord() {
  return (
    <div className="flex gap-2 items-center">
      <Button variant="outline" className="w-full justify-start" asChild>
        <Link href="/dictionary/submit/">Add a new word</Link>
      </Button>
    </div>
  );
}
