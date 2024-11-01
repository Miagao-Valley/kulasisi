import Link from 'next/link';
import { Lang, PaginationDetails } from '@/types';

interface Props {
  langs?: PaginationDetails & { results: Lang[] };
  className?: string;
}

export default function LangsList({ langs, className = '' }: Props) {
  return (
    <ul
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ${className}`}
    >
      {langs && langs.results && langs.results.length > 0 ? (
        langs.results.map((lang) => (
          <li key={lang.code}>
            <Link
              className="hover:text-primary flex gap-2"
              href={`/languages/${lang.code}/`}
            >
              <span className="badge badge-primary badge-outline">
                {lang.code}
              </span>
              <span className="font-semibold">{lang.name}</span>
            </Link>
          </li>
        ))
      ) : (
        <li className="w-full col-span-full text-center p-3">
          <div>No languages found</div>
        </li>
      )}
    </ul>
  );
}

interface SkeletonProps {
  className?: string;
}

export function LangsListSkeleton({ className = '' }: SkeletonProps) {
  return (
    <ul
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ${className}`}
    >
      {Array.from({ length: 40 }, (_, i) => (
        <li key={i} className="skeleton w-full h-8"></li>
      ))}
    </ul>
  );
}
