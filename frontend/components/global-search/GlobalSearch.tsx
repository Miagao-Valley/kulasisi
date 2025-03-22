'use client';

import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../providers/AuthProvider';
import { useIsMobile } from '@/hooks/use-mobile';
import logout from '@/lib/auth/logout';
import { Lang } from '@/types/languages';
import getLangs from '@/lib/langs/getLangs';
import { Kbd, Keys, useKbd } from '../ui/kbd';
import {
  Command,
  CommandList,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandEmpty,
} from '@/components/ui/command';
import { Dialog, DialogContent } from '../ui/dialog';
import { Spinner } from '../ui/spinner';
import { Button } from '../ui/button';
import {
  BookAIcon,
  FeatherIcon,
  Gamepad2Icon,
  Grid2X2Icon,
  HashIcon,
  LanguagesIcon,
  LogInIcon,
  LogOutIcon,
  MessageSquareQuoteIcon,
  PlusCircleIcon,
  SearchIcon,
  SpellCheckIcon,
  TagsIcon,
  UsersRoundIcon,
  WrenchIcon,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

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

export default function GlobalSearch() {
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
                <Home searchLangs={() => setPages([...pages, 'langs'])} />
              )}
              {activePage === 'langs' && <Langs />}
            </CommandList>

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
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Home({ searchLangs }: { searchLangs: () => void }) {
  const { setOpen, setLoading } = useGlobalSearch();
  const router = useRouter();
  const auth = useAuth();

  const PageItems = [
    {
      name: 'Phrases',
      keywords: ['Phrasebook', 'Translations'],
      command: () => router.push('/phrases/'),
      icon: MessageSquareQuoteIcon,
    },
    {
      name: 'Categories',
      keywords: ['Topics'],
      command: () => router.push('/phrases/categories/'),
      icon: HashIcon,
    },
    {
      name: 'Dictionary',
      keywords: ['Words', 'Definitions'],
      command: () => router.push('/dictionary/'),
      icon: BookAIcon,
    },
    {
      name: 'Parts of Speech',
      keywords: ['POS'],
      command: () => router.push('/dictionary/parts-of-speech/'),
      icon: TagsIcon,
    },
    {
      name: 'Users',
      keywords: ['Contributors', 'Persons', 'Community'],
      command: () => router.push('/users/'),
      icon: UsersRoundIcon,
    },
  ];

  const ContributeItems = [
    {
      name: 'Contribute',
      keywords: ['Add', 'Submit'],
      command: () => router.push('/contribute/'),
      icon: FeatherIcon,
    },
    {
      name: 'Add a phrase',
      keywords: ['Contribute', 'Submit', 'Phrasebook'],
      command: () => router.push('/contribute?tab=phrase'),
      icon: PlusCircleIcon,
    },
    {
      name: 'Add a word',
      keywords: ['Contribute', 'Submit', 'Dictionary'],
      command: () => router.push('/contribute?tab=word'),
      icon: PlusCircleIcon,
    },
  ];

  const LangItems = [
    {
      name: 'All languages',
      keywords: ['English', 'Tagalog'],
      command: () => {
        router.push('/languages/');
        setOpen(false);
      },
      icon: LanguagesIcon,
    },
    {
      name: 'Search a language',
      keywords: ['English', 'Tagalog'],
      command: searchLangs,
      icon: SearchIcon,
    },
  ];

  const ToolItems = [
    {
      name: 'All tools',
      keywords: [],
      command: () => router.push('/tools/'),
      icon: WrenchIcon,
    },
    {
      name: 'Proofreader',
      keywords: ['spelling'],
      command: () => router.push('/tools/proofreader/'),
      icon: SpellCheckIcon,
    },
  ];

  const GameItems = [
    {
      name: 'All games',
      keywords: ['play'],
      command: () => router.push('/games/'),
      icon: Gamepad2Icon,
    },
    {
      name: 'Wordle',
      keywords: ['games', 'play', 'puzzle'],
      command: () => router.push('/games/wordle/'),
      icon: Grid2X2Icon,
    },
  ];

  const AuthItems = [
    {
      name: 'Sign In',
      keywords: ['login'],
      command: () => router.push('/login/'),
      icon: LogInIcon,
      disabled: auth.isAuthenticated,
    },
    {
      name: 'Sign Up',
      keywords: ['register'],
      command: () => router.push('/register/'),
      icon: LogInIcon,
      disabled: auth.isAuthenticated,
    },
    {
      name: 'Sign Out',
      keywords: ['logout'],
      command: async () => {
        setLoading(true);
        try {
          await logout();
          auth.updateAuth();
          auth.updateUser();
          router.push('/login/');
        } catch (error) {
          console.error('Error logging out:', error);
        } finally {
          setLoading(false);
        }
      },
      icon: LogOutIcon,
      disabled: !auth.isAuthenticated,
    },
  ];

  return (
    <>
      <CommandGroup heading="Pages">
        {PageItems.map((item) => (
          <CommandItem
            key={item.name}
            keywords={item.keywords}
            onSelect={() => {
              item.command();
              setOpen(false);
            }}
          >
            <item.icon />
            <span>{item.name}</span>
          </CommandItem>
        ))}
      </CommandGroup>

      <CommandGroup heading="Contribute">
        {ContributeItems.map((item) => (
          <CommandItem
            key={item.name}
            keywords={item.keywords}
            onSelect={() => {
              item.command();
              setOpen(false);
            }}
          >
            <item.icon />
            <span>{item.name}</span>
          </CommandItem>
        ))}
      </CommandGroup>

      <CommandGroup heading="Languages">
        {LangItems.map((item) => (
          <CommandItem
            key={item.name}
            keywords={item.keywords}
            onSelect={() => {
              item.command();
            }}
          >
            <item.icon />
            <span>{item.name}</span>
          </CommandItem>
        ))}
      </CommandGroup>

      <CommandGroup heading="Tools">
        {ToolItems.map((item) => (
          <CommandItem
            key={item.name}
            keywords={item.keywords}
            onSelect={() => {
              item.command();
              setOpen(false);
            }}
          >
            <item.icon />
            <span>{item.name}</span>
          </CommandItem>
        ))}
      </CommandGroup>

      <CommandGroup heading="Games">
        {GameItems.map((item) => (
          <CommandItem
            key={item.name}
            keywords={item.keywords}
            onSelect={() => {
              item.command();
              setOpen(false);
            }}
          >
            <item.icon />
            <span>{item.name}</span>
          </CommandItem>
        ))}
      </CommandGroup>

      <CommandGroup heading="Auth">
        {AuthItems.map((item) => {
          if (item.disabled) return null;

          return (
            <CommandItem
              key={item.name}
              keywords={item.keywords}
              onSelect={async () => {
                item.command();
                setOpen(false);
              }}
            >
              <item.icon />
              <span>{item.name}</span>
            </CommandItem>
          );
        })}
      </CommandGroup>
    </>
  );
}

function Langs() {
  const { setOpen, setLoading } = useGlobalSearch();
  const router = useRouter();

  const [langs, setLangs] = useState<Lang[]>([]);

  useEffect(() => {
    const fetchLangs = async () => {
      setLoading(true);
      try {
        const { results } = await getLangs();
        setLangs(results);
      } catch (error) {
        console.error('Failed to fetch languages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLangs();
  }, [setLoading]);

  return (
    <CommandGroup heading="Languages">
      {langs.map((lang) => (
        <CommandItem
          key={lang.code}
          keywords={[lang.code]}
          onSelect={() => {
            router.push(`/languages/${lang.code}/`);
            setOpen(false);
          }}
        >
          <span>{lang.name}</span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
