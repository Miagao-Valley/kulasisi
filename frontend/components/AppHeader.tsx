'use client';

import Link from "next/link";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import { ThemeToggle } from "./ThemeToggle";
import { BirdIcon } from "lucide-react";

export default function AppHeader() {
  const { isMobile } = useSidebar();

  return (
    <div className="w-full p-4 flex items-center justify gap-2">
      {isMobile && <SidebarTrigger />}
      {isMobile &&
        <Link href="/" className="ms-auto flex gap-1 items-center">
          <BirdIcon className="h-6 w-6" />
          <h1 className="text-xl m-0 p-0 truncate">kulasisi</h1>
        </Link>
      }
      <ThemeToggle className="ms-auto" />
    </div>
  )
}
