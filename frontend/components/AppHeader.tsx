'use client';

import { ThemeToggle } from "./ThemeToggle";

export default function AppHeader() {
  return (
    <div className="w-full p-4 flex items-center justify gap-2">
      <ThemeToggle className="ms-auto" />
    </div>
  )
}
