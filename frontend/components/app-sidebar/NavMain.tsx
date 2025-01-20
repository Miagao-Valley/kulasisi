'use client';

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  BookAIcon,
  HashIcon,
  MessageSquareQuoteIcon,
  TagsIcon,
  UsersRoundIcon,
} from 'lucide-react';

const items = [
  {
    title: 'Phrases',
    url: '/phrases/',
    icon: MessageSquareQuoteIcon,
  },
  {
    title: 'Categories',
    url: '/phrases/categories/',
    icon: HashIcon,
  },
  {
    title: 'Dictionary',
    url: '/dictionary/',
    icon: BookAIcon,
  },
  {
    title: 'Parts of Speech',
    url: '/dictionary/parts-of-speech/',
    icon: TagsIcon,
  },
  {
    title: 'Users',
    url: '/users/',
    icon: UsersRoundIcon,
  },
];

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton tooltip={item.title} asChild>
              <a href={item.url}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
