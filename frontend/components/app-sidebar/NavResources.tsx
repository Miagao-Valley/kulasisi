'use client';

import Link from 'next/link';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { BrushIcon, ChevronRight, CodeIcon, FileTextIcon } from 'lucide-react';
import { AppLogo } from '../brand/app-logo';

const items = [
  {
    title: 'About Kulasisi',
    url: '/about/',
    icon: AppLogo,
  },
  {
    title: 'Design',
    url: '/design/',
    icon: BrushIcon,
  },
  {
    title: 'Source',
    url: 'https://github.com/Miagao-Valley/kulasisi',
    external: true,
    icon: CodeIcon,
  },
];

export function NavResources() {
  const { state, isMobile } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {state === 'collapsed' && !isMobile && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton tooltip="Resources">
                  <FileTextIcon />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="start">
                <DropdownMenuLabel className="w-full">
                  Resources
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {items.map((item) => (
                    <DropdownMenuItem key={item.title}>
                      <item.icon />
                      <Link
                        href={item.url}
                        className="w-full"
                        target={item.external ? '_blank' : ''}
                      >
                        {item.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}

        {state === 'expanded' && (
          <Collapsible
            key="Resources"
            asChild
            defaultOpen={true}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip="Resources">
                  <FileTextIcon />
                  Resources
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarMenuSub>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton tooltip={item.title} asChild>
                        <Link
                          href={item.url}
                          target={item.external ? '_blank' : undefined}
                        >
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
