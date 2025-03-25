'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavMain } from './NavMain';
import { NavUser } from './NavUser';
import { NavLang } from './NavLang';
import { NavTools } from './NavTools';
import { NavGames } from './NavGames';
import { NavResources } from './NavResources';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
      collapsible="icon"
      {...props}
    >
      <SidebarContent>
        <NavMain />
        <NavLang />
        <NavTools />
        <NavGames />
        <NavResources />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
