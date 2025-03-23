import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalSearch } from './GlobalSearch';
import { Lang } from '@/types/languages';
import { getLangs } from '@/lib/langs/getLangs';
import { CommandGroup, CommandItem } from '../ui/command';

export function LangsSearch() {
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
