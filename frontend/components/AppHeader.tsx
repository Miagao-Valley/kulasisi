'use client';

import Link from "next/link";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import { ThemeToggle } from "./ThemeToggle";
import Wordmark from "./brand/wordmark";

export default function AppHeader() {
  const { isMobile } = useSidebar();

  return (
    <div className="w-full p-4 flex items-center justify gap-2">
      {isMobile && <SidebarTrigger />}
      {isMobile &&
        <Link href="/" className="ms-auto flex gap-1 items-center">
          <Wordmark className="w-20"/>
        </Link>
      }
      <ThemeToggle className="ms-auto" />
    </div>
  )
}
