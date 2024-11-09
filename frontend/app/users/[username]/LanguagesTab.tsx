import React from 'react';
import Link from 'next/link';
import { LangProficiencyLevel } from '@/types';
import getLang from '@/lib/langs/getLang';
import displayLangProficiency from '@/utils/displayLangProficiency';

interface Props {
  language_proficiencies: { lang: string; level: LangProficiencyLevel }[];
}

export default function LanguagesTab({ language_proficiencies }: Props) {
  return (
    <>
      {language_proficiencies && language_proficiencies.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5">
          {language_proficiencies.map(async (proficiency, index) => {
            const lang = await getLang(proficiency.lang);
            return (
              <li key={index} className={`flex flex-col`}>
                <Link
                  className="hover:text-primary flex gap-2 mb-2"
                  href={`/languages/${lang.code}/`}
                >
                  <span className="badge badge-primary badge-outline">
                    {lang.code}
                  </span>
                  <span className="font-semibold">{lang.name}</span>
                </Link>
                <span className="text-sm">
                  {displayLangProficiency(proficiency.level)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
