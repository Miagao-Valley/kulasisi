import React from 'react';
import { Lang, LangProficiencyLevel } from '@/types';
import displayLangProficiency from '@/utils/displayLangProficiency';

interface Props {
  lang: Lang;
}

export default function StatsTab({ lang }: Props) {
  return (
    <>
      <div className="mb-5">
        <h3 className="text-base">{lang.user_count} Members</h3>
        <div className="flex flex-col gap-3">
          {lang?.users_by_proficiency &&
            Object.keys(lang.users_by_proficiency).map((l) => {
              const level = Number(l) as LangProficiencyLevel;
              const count: number = lang.users_by_proficiency[level];
              return (
                <div className="flex flex-col gap-2" key={level}>
                  <span className="w-fit">{displayLangProficiency(level)}</span>
                  <progress
                    className="progress progress-primary w-full"
                    value={count}
                    max={lang.user_count}
                  ></progress>
                </div>
              );
            })}
        </div>
      </div>
      <div>
        <h3 className="text-base">Contribution</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="font-semibold">{lang.phrase_count}</span>
            <span>Phrases</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">{lang.translation_count}</span>
            <span>Translations</span>
          </div>
        </div>
      </div>
    </>
  );
}
