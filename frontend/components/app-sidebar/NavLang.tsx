'use client';

import { useAuth } from '../providers/AuthProvider';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
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
import { Skeleton } from '../ui/skeleton';
import { badgeVariants } from '../ui/badge';
import { ChevronRight, LanguagesIcon } from 'lucide-react';

export function NavLang() {
  const { state, isMobile } = useSidebar();
  const auth = useAuth();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {state === 'collapsed' && !isMobile && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton tooltip="Languages">
                  <LanguagesIcon />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="start">
                <DropdownMenuLabel className="w-full">
                  <Link
                    href="/languages/"
                    className="w-full hover:text-primary"
                  >
                    Languages
                  </Link>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {auth.user?.language_proficiencies?.map((lang_prof) => (
                    <DropdownMenuItem key={lang_prof.lang}>
                      <Link
                        href={`/languages/${lang_prof.lang}`}
                        className="w-full"
                      >
                        {lang_prof.lang}
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
            key="Languages"
            asChild
            defaultOpen={true}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip="Languages">
                  <LanguagesIcon />
                  <Link href="/languages/" className="w-full">
                    Languages
                  </Link>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarMenuSub>
                  {!auth.isAuthenticated && auth.isLoading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                      <SidebarMenuSubItem key={index}>
                        <SidebarMenuSubButton asChild>
                          <Skeleton className="h-5 w-11/12" />
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))
                  ) : auth.user?.language_proficiencies?.length ? (
                    auth.user?.language_proficiencies?.map((langProf) => (
                      <SidebarMenuSubItem key={langProf.lang}>
                        <SidebarMenuSubButton asChild>
                          <Link
                            href={`/languages/${langProf.lang}`}
                            className={cn(
                              'w-10 truncate flex justify-center',
                              badgeVariants({ variant: 'outline' })
                            )}
                          >
                            {langProf.lang}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))
                  ) : (
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <span className="text-sm truncate">
                          You have no languages.
                        </span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  )}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
