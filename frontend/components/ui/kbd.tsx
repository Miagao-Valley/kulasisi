'use client';

import { HTMLProps, ReactNode, createContext, useContext } from 'react';
import defaultsDeep from 'lodash.defaultsdeep';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

/*
Example Usage:

<KbdProvider os="mac">
  <h3 className="font-semibold">Keyboard Kbd</h3>
  <div className="flex justify-between">
    <p>Undo</p>
    <Kbds keyNames={[Keys.Command, "z"]} />
  </div>
  <div className="flex justify-between">
    <p>Redo</p>
    <Kbds keyNames={[Keys.Command, Keys.Shift, "z"]} />
  </div>
  <div className="flex justify-between">
    <p>Clear Selection</p>
    <Kbd keyName={Keys.Escape} />
  </div>
</KbdProvider>;
*/

interface KeyData {
  symbols: {
    mac?: string;
    windows?: string;
    default: string;
  };
  label: string;
}

export enum Keys {
  Enter = 'Enter',
  Space = 'Space',
  Control = 'Control',
  Shift = 'Shift',
  Alt = 'Alt',
  Escape = 'Escape',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  Backspace = 'Backspace',
  Tab = 'Tab',
  CapsLock = 'CapsLock',
  Fn = 'Fn',
  Command = 'Command',
  Insert = 'Insert',
  Delete = 'Delete',
  Home = 'Home',
  End = 'End',
  PageUp = 'PageUp',
  PageDown = 'PageDown',
  PrintScreen = 'PrintScreen',
  Pause = 'Pause',
}

export const DEFAULT_KEY_MAPPINGS = {
  [Keys.Enter]: {
    symbols: { mac: '↩', default: '↵' },
    label: 'Enter',
  },
  [Keys.Space]: {
    symbols: { default: '␣' },
    label: 'Space',
  },
  [Keys.Control]: {
    symbols: { mac: '⌃', default: 'Ctrl' },
    label: 'Control',
  },
  [Keys.Shift]: {
    symbols: { mac: '⇧', default: 'Shift' },
    label: 'Shift',
  },
  [Keys.Alt]: {
    symbols: { mac: '⌥', default: 'Alt' },
    label: 'Alt/Option',
  },
  [Keys.Escape]: {
    symbols: { mac: '⎋', default: 'Esc' },
    label: 'Escape',
  },
  [Keys.ArrowUp]: {
    symbols: { default: '↑' },
    label: 'Arrow Up',
  },
  [Keys.ArrowDown]: {
    symbols: { default: '↓' },
    label: 'Arrow Down',
  },
  [Keys.ArrowLeft]: {
    symbols: { default: '←' },
    label: 'Arrow Left',
  },
  [Keys.ArrowRight]: {
    symbols: { default: '→' },
    label: 'Arrow Right',
  },
  [Keys.Backspace]: {
    symbols: { mac: '⌫', default: '⟵' },
    label: 'Backspace',
  },
  [Keys.Tab]: {
    symbols: { mac: '⇥', default: '⭾' },
    label: 'Tab',
  },
  [Keys.CapsLock]: {
    symbols: { default: '⇪' },
    label: 'Caps Lock',
  },
  [Keys.Fn]: {
    symbols: { default: 'Fn' }, // mac symbol for Fn not universally recognized
    label: 'Fn',
  },
  [Keys.Command]: {
    symbols: { mac: '⌘', windows: '⊞ Win', default: 'Command' },
    label: 'Command',
  },
  [Keys.Insert]: {
    symbols: { default: 'Ins' },
    label: 'Insert',
  },
  [Keys.Delete]: {
    symbols: { mac: '⌦', default: 'Del' },
    label: 'Delete',
  },
  [Keys.Home]: {
    symbols: { mac: '↖', default: 'Home' },
    label: 'Home',
  },
  [Keys.End]: {
    symbols: { mac: '↘', default: 'End' },
    label: 'End',
  },
  [Keys.PageUp]: {
    symbols: { mac: '⇞', default: 'PgUp' },
    label: 'Page Up',
  },
  [Keys.PageDown]: {
    symbols: { mac: '⇟', default: 'PgDn' },
    label: 'Page Down',
  },
  [Keys.PrintScreen]: {
    symbols: { default: 'PrtSc' },
    label: 'Print Screen',
  },
  [Keys.Pause]: {
    symbols: { mac: '⎉', default: 'Pause' },
    label: 'Pause/Break',
  },
};

interface KbdContextData {
  keyMappings: Record<string, KeyData>;
  os: 'mac' | 'windows';
}

const KbdContext = createContext<KbdContextData>({
  keyMappings: DEFAULT_KEY_MAPPINGS,
  os: 'mac',
});

export const useKbd = () => {
  return useContext(KbdContext);
};

interface KbdProviderProps {
  children: ReactNode;
  keyMappings?: Record<
    string,
    {
      symbols?: {
        mac?: string;
        windows?: string;
        default?: string;
      };
      label?: string;
    }
  >;
  OS?: string | null;
}

export const KbdProvider = ({
  children,
  keyMappings = {},
  OS = 'mac',
}: KbdProviderProps) => {
  const keyMappingsWithDefaults = defaultsDeep(
    {},
    keyMappings,
    DEFAULT_KEY_MAPPINGS
  );

  let os: KbdContextData['os'] = 'mac';
  if (['mac', 'ios'].includes(OS || '')) {
    os = 'mac';
  } else if (['windows', 'linux', 'android'].includes(OS || '')) {
    os = 'windows';
  }

  return (
    <KbdContext.Provider value={{ keyMappings: keyMappingsWithDefaults, os }}>
      {children}
    </KbdContext.Provider>
  );
};

const kbdVariants = cva(
  'text-muted-foreground text-xs font-mono font-medium rounded px-1 inline-flex items-center justify-center gap-1 pointer-events-none select-none',
  {
    variants: {
      variant: {
        default: 'bg-muted',
        outline: 'bg-transparent border border-muted-foreground',
        ghost: 'bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface KbdProps
  extends HTMLProps<HTMLDivElement>,
    VariantProps<typeof kbdVariants> {
  keyName: string;
}

export const Kbd = ({ keyName, variant, className, ...props }: KbdProps) => {
  const context = useKbd();
  const os = context.os || 'default';
  const keyMappings = context.keyMappings;
  const keyData = keyMappings[keyName];
  const symbol = keyData?.symbols?.[os] ?? keyData?.symbols?.default ?? keyName;

  return (
    <kbd className={cn(kbdVariants({ variant, className }))} {...props}>
      {symbol}
    </kbd>
  );
};
