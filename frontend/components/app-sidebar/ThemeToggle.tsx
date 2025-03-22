'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon, SunMoonIcon } from 'lucide-react';
import { Spinner } from '../ui/spinner';

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {!mounted ? (
            <Spinner />
          ) : theme === 'light' ? (
            <SunIcon className="motion-scale-in-[0.2] motion-rotate-in-[360deg] motion-duration-500" />
          ) : theme === 'dark' ? (
            <MoonIcon className="motion-scale-in-[0.2] motion-rotate-in-[360deg] motion-duration-500" />
          ) : (
            <SunMoonIcon className="motion-scale-in-[0.2] motion-rotate-in-[360deg] motion-duration-500" />
          )}
          <span className="sr-only">Switch Theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        {theme && theme[0].toUpperCase() + theme.slice(1)} Theme
      </TooltipContent>
    </Tooltip>
  );
}
