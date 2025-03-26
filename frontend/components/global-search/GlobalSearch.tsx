'use client';

import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Kbd, Keys, useKbd } from '../ui/kbd';
import {
  Command,
  CommandList,
  CommandInput,
  CommandEmpty,
} from '@/components/ui/command';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { Spinner } from '../ui/spinner';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { SearchIcon } from 'lucide-react';
import { HomeSearch } from './HomeSearch';
import { LangsSearch } from './LangsSearch';

interface GlobalSearchContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  inputValue: string;
  setInputValue: (inputValue: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const GlobalSearchContext = createContext<GlobalSearchContextType | undefined>(
  undefined
);

export const GlobalSearchProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <GlobalSearchContext.Provider
      value={{ open, setOpen, inputValue, setInputValue, loading, setLoading }}
    >
      {children}
    </GlobalSearchContext.Provider>
  );
};

export const useGlobalSearch = () => {
  const context = React.useContext(GlobalSearchContext);
  if (context === undefined) {
    throw new Error(
      'useGlobalSearch must be used within a GlobalSearchProvider'
    );
  }
  return context;
};

export function GlobalSearch() {
  const { open, setOpen, inputValue, setInputValue, loading } =
    useGlobalSearch();
  const isMobile = useIsMobile();
  const { os } = useKbd();

  const ref = useRef<HTMLDivElement | null>(null);
  const [pages, setPages] = React.useState<string[]>(['home']);
  const activePage = pages[pages.length - 1];
  const isHome = activePage === 'home';

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === '/' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, setOpen]);

  const popPage = useCallback(() => {
    setPages((pages) => {
      const x = [...pages];
      x.splice(-1, 1);
      return x;
    });
  }, []);

  function bounce() {
    if (ref.current) {
      ref.current.style.transform = 'scale(0.96)';
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.transform = '';
        }
      }, 100);

      setInputValue('');
    }
  }

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size={isMobile ? 'icon' : 'default'}
            onClick={() => setOpen(true)}
          >
            {!isMobile && (
              <div className="flex items-center gap-[2px]">
                <Kbd keyName={os === 'mac' ? Keys.Command : Keys.Control} />
                <Kbd keyName="/" />
              </div>
            )}
            <SearchIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Search</TooltipContent>
      </Tooltip>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0">
          <DialogTitle className="sr-only">Search</DialogTitle>
          <Command
            ref={ref}
            className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === 'Enter') {
                bounce();
              }

              if (isHome || inputValue.length) {
                return;
              }

              if (e.key === 'Backspace') {
                e.preventDefault();
                popPage();
                bounce();
              }
            }}
          >
            <CommandInput
              autoFocus
              placeholder="Search kulasisi..."
              value={inputValue}
              onValueChange={(value) => {
                setInputValue(value);
              }}
            />

            <CommandList>
              {loading ? (
                <div className="text-center">
                  <Spinner className="m-2" />
                </div>
              ) : (
                <CommandEmpty>No results found.</CommandEmpty>
              )}

              {activePage === 'home' && (
                <HomeSearch searchLangs={() => setPages([...pages, 'langs'])} />
              )}
              {activePage === 'langs' && <LangsSearch />}
            </CommandList>

            {!isMobile && (
              <div className="flex items-center gap-2 p-2">
                <div className="flex items-center gap-1 text-muted-foreground text-xs">
                  <Kbd keyName="ArrowUp" />
                  <Kbd keyName="ArrowDown" />
                  to navigate
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-xs">
                  <Kbd keyName="Enter" />
                  to select
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-xs">
                  <Kbd keyName="Backspace" />
                  move to parent
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-xs">
                  <Kbd keyName="Escape" />
                  to close
                </div>
              </div>
            )}
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
