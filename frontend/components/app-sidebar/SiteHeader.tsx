'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import GlobalSearch, {
  GlobalSearchProvider,
} from '../global-search/GlobalSearch';
import CustomSidebarTrigger from './CustomSidebarTrigger';
import ThemeToggle from './ThemeToggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Separator } from '../ui/separator';
import Logo from '../brand/logo';
import Wordmark from '../brand/wordmark';
import { FeatherIcon } from 'lucide-react';

export function SiteHeader() {
  const { isMobile } = useSidebar();

  return (
    <header className="flex sticky top-0 z-50 w-full items-center border-b bg-background">
      <div className="flex h-[--header-height] w-full items-center gap-2 px-2">
        <div className="w-full p-2 flex items-center justify-between gap-2">
          <div className="flex gap-0 items-center">
            <CustomSidebarTrigger />
            <Separator orientation="vertical" className="h-4 mx-1" />
            <Link href="/">
              {isMobile ? (
                <Logo className="h-6" />
              ) : (
                <Wordmark className="h-12 mx-1" />
              )}
            </Link>
          </div>

          <div className="flex items-center gap-0">
            <GlobalSearchProvider>
              <GlobalSearch />
            </GlobalSearchProvider>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/contribute"
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'icon' })
                  )}
                >
                  <FeatherIcon />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">Contribute</TooltipContent>
            </Tooltip>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
