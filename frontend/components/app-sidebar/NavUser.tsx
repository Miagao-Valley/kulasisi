'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../providers/AuthProvider';
import { logout } from '@/lib/auth/logout';
import Link from 'next/link';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';
import {
  ChevronsUpDown,
  UserRoundIcon,
  SettingsIcon,
  LogOutIcon,
  LogInIcon,
} from 'lucide-react';
import { Spinner } from '../ui/spinner';

export function NavUser() {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { isMobile, open } = useSidebar();

  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      auth.updateAuth();
      router.push('/login/');
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setLoggingOut(false);
    }
  };

  if (auth.isLoading) {
    return (
      <div className="m-2 flex gap-2">
        <Skeleton className="h-8 w-9 rounded-lg" />
        <div className="flex flex-col gap-1 w-full">
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-3 w-8/12" />
        </div>
      </div>
    );
  }

  return auth.isAuthenticated && !auth.isLoading ? (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg">
                <AvatarImage src={''} alt={auth.user?.username} />
                <AvatarFallback>
                  {auth.user?.username.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm">
                <span className="truncate font-semibold">
                  {auth.user?.first_name} {auth.user?.last_name}
                </span>
                <span className="truncate text-xs">@{auth.user?.username}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  <AvatarImage src={''} alt={auth.user?.username} />
                  <AvatarFallback>
                    {auth.user?.username.slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm">
                  <span className="truncate font-semibold">
                    {auth.user?.first_name} {auth.user?.last_name}
                  </span>
                  <span className="truncate text-xs">
                    @{auth.user?.username}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserRoundIcon />
                <Link href={`/users/${auth.user?.username}`} className="w-full">
                  View Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon />
                <Link href="/settings" className="w-full">
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              {loggingOut ? <Spinner size="small" /> : <LogOutIcon />}
              <button
                className="w-full text-left cursor-pointer"
                onClick={handleLogout}
                disabled={loggingOut}
              >
                Sign out
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  ) : (
    <SidebarMenu>
      {open ? (
        <>
          <SidebarMenuItem>
            <Button variant="outline" className="w-full" asChild>
              <Link href={`/login?next=${pathname}`}>Sign in</Link>
            </Button>
          </SidebarMenuItem>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          <SidebarMenuItem>
            <Button className="w-full" asChild>
              <Link href="/register/">Sign up</Link>
            </Button>
          </SidebarMenuItem>
        </>
      ) : (
        <SidebarMenuItem>
          <SidebarMenuButton className="w-full" tooltip="Sign in" asChild>
            <Link href="/login/">
              <LogInIcon />
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
    </SidebarMenu>
  );
}
