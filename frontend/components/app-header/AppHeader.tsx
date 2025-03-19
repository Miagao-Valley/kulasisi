'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { SidebarTrigger, useSidebar } from '../ui/sidebar';
import { ThemeToggle } from './ThemeToggle';
import Wordmark from '../brand/wordmark';
import { buttonVariants } from '../ui/button';
import { FeatherIcon } from 'lucide-react';

export default function AppHeader() {
  const { isMobile } = useSidebar();

  return (
    <div className="w-full p-4 flex items-center justify gap-2">
      {isMobile && <SidebarTrigger />}

      {isMobile && (
        <Link href="/" className="ms-auto flex gap-1 items-center">
          <Wordmark className="w-20" />
        </Link>
      )}

      <div className="flex gap-0 ms-auto">
        <Link
          href="/contribute"
          className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
        >
          <FeatherIcon />
        </Link>
        <ThemeToggle />
      </div>
    </div>
  );
}
