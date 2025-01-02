'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../AuthProvider';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function UserActions() {
  const auth = useAuth();
  const pathname = usePathname();

  if (auth.isLoading) {
    return;
  }

  return (
    <>
      {auth.isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="hover:cursor-pointer">
              <AvatarImage src="" alt={auth.username} />
              <AvatarFallback>{auth.username.slice(0, 1).toUpperCase()}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>@{auth.username}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href={`/users/${auth.username}/`} className="w-full">View Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/settings/`} className="w-full">Settings</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href={`/auth/logout/`} className="w-full">Sign out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      ) : (
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/auth/login?next=${pathname}`}>
              Sign in
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/auth/register/`}>
              Sign up
            </Link>
          </Button>
        </div>
      )}
    </>
  );
}
