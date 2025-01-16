'use client';

import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { NavMain } from './NavMain';
import { NavUser } from './NavUser';
import { NavLang } from './NavLang';
import Wordmark from '../brand/wordmark';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open, isMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex gap-1 items-center">
          {open && (
            <Link href="/" className="px-2 flex gap-1 items-center">
              <Wordmark className="w-24" />
            </Link>
          )}
          {!isMobile && <SidebarTrigger className="ms-auto" />}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavLang />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
