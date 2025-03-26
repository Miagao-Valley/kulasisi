import { useRouter } from 'next/navigation';
import { useAuth } from '../providers/AuthProvider';
import { useGlobalSearch } from './GlobalSearch';
import { logout } from '@/lib/auth/logout';
import { CommandGroup, CommandItem } from '../ui/command';
import {
  BookAIcon,
  BrushIcon,
  CodeIcon,
  FeatherIcon,
  Gamepad2Icon,
  Grid2X2Icon,
  HashIcon,
  LanguagesIcon,
  LogInIcon,
  LogOutIcon,
  MessageSquareQuoteIcon,
  PenIcon,
  PlusCircleIcon,
  SearchIcon,
  SettingsIcon,
  SpellCheckIcon,
  TagsIcon,
  UserRoundIcon,
  UsersRoundIcon,
  WrenchIcon,
} from 'lucide-react';
import { AppLogo } from '../brand/app-logo';

export function HomeSearch({ searchLangs }: { searchLangs: () => void }) {
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

  const ResourceItems = [
    {
      name: 'About Kulasisi',
      command: () => router.push('/about/'),
      icon: AppLogo,
    },
    {
      name: 'Design',
      keywords: ['styles'],
      command: () => router.push('/design/'),
      icon: BrushIcon,
    },
    {
      name: 'Source',
      keywords: ['code'],
      command: () =>
        window.open('https://github.com/Miagao-Valley/kulasisi', '_blank'),
      icon: CodeIcon,
    },
  ];

  const AuthItems = [
    {
      name: 'Settings',
      command: () => router.push('/settings/'),
      icon: SettingsIcon,
      disabled: !auth.isAuthenticated,
    },
    {
      name: 'View Profile',
      command: () => router.push(`/users/${auth.user?.username}/`),
      icon: UserRoundIcon,
      disabled: !auth.isAuthenticated,
    },
    {
      name: 'Edit Profile',
      command: () => router.push('/settings?tab=profile'),
      icon: PenIcon,
      disabled: !auth.isAuthenticated,
    },
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

      <CommandGroup heading="Resources">
        {ResourceItems.map((item) => (
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
