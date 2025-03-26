import Link from 'next/link';
import { AppLogo } from '../brand/app-logo';
import { ExternalLinkIcon } from 'lucide-react';

const items = [
  {
    name: 'About',
    url: '/about',
  },
  {
    name: 'Source',
    url: 'https://github.com/Miagao-Valley/kulasisi',
    external: true,
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="w-full p-3 py-5 text-sm text-muted-foreground flex items-center justify-center gap-4">
      <div className="flex items-center gap-2">
        <Link href="/">
          <AppLogo className="size-6" />
        </Link>
        © {year} Kulasisi
      </div>
      {items.map((item) => (
        <Link
          key={item.name}
          href={item.url}
          target={item.external ? '_blank' : ''}
          className="inline-flex items-center gap-1 transition-all hover:underline"
        >
          {item.name}
          {item.external && <ExternalLinkIcon className="size-4" />}
        </Link>
      ))}
    </div>
  );
}
