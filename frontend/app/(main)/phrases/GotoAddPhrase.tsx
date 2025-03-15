'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function GotoAddPhrase() {
  return (
    <div className="flex gap-2 items-center">
      <Button variant="outline" className="w-full justify-start" asChild>
        <Link href="/phrases/submit/">Add a new phrase</Link>
      </Button>
    </div>
  );
}
