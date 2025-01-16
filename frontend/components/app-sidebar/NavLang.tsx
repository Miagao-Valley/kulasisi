'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider';
import { User } from '@/types/users';
import getUser from '@/lib/users/getUser';
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
} from '@/components/ui/sidebar';
import { Skeleton } from '../ui/skeleton';
import LangHoverCard from '../LangHoverCard';
import { ChevronRight, LanguagesIcon } from 'lucide-react';

export function NavLang() {
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUser(auth.username);
        setUser(res);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (auth.isAuthenticated) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, [auth]);

  return (
    <SidebarGroup>
      <SidebarMenu>
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
                <span>Languages</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarMenuSub>
                {!auth.isAuthenticated && isLoading ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <SidebarMenuSubItem key={index}>
                      <SidebarMenuSubButton asChild>
                        <Skeleton className="h-5 w-11/12" />
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))
                ) : user?.language_proficiencies?.length ? (
                  user?.language_proficiencies?.map((lang_prof) => (
                    <SidebarMenuSubItem key={lang_prof.lang}>
                      <SidebarMenuSubButton asChild>
                        <LangHoverCard code={lang_prof.lang} showName />
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
      </SidebarMenu>
    </SidebarGroup>
  );
}
