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
import { BirdIcon } from 'lucide-react';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open, isMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex gap-1 items-center">
          {open &&
            <Link href="/" className="px-2 flex gap-1 items-center">
              <BirdIcon />
              <h1 className="text-2xl m-0 p-0 truncate">kulasisi</h1>
            </Link>
          }
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
