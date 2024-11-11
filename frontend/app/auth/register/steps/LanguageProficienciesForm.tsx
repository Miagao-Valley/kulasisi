import React from 'react';
import Link from 'next/link';
import { LangProficiencyLevel } from '@/types';
import displayLangProficiency from '@/utils/displayLangProficiency';

interface Props {
  langs: any[];
  selectedLanguages: { lang: string; level: LangProficiencyLevel }[];
  handleLanguageSelection: (
    e: React.ChangeEvent<HTMLInputElement>,
    lang: string
  ) => void;
  handleRangeChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    lang: string
  ) => void;
  disabled?: boolean;
}

export default function LanguageProficienciesForm({
  langs,
  selectedLanguages,
  handleLanguageSelection,
  handleRangeChange,
  disabled = false,
}: Props) {
  return (
    <div>
      <div className="mb-3 flex justify-between items-center">
        <h3 className="text-base">Language Proficiency</h3>
        {!disabled && (
          <div className="dropdown dropdown-hover dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-outline btn-sm">
              Select Languages
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              {langs.map((lang) => (
                <li key={lang.code}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value={lang.code}
                      onChange={(e) => handleLanguageSelection(e, lang.code)}
                      defaultChecked={selectedLanguages.some(
                        (langObj) => langObj.lang === lang.code
                      )}
                      className="checkbox checkbox-sm mr-2"
                    />
                    {lang.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mb-3 flex w-full justify-between px-2 text-xs">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
      </div>

      <div className="mb-3 flex flex-col items-center gap-4">
        {selectedLanguages.map((langProf, index) => (
          <div className="w-full" key={index}>
            <div className="flex items-center gap-2 mb-2">
              <Link
                href={`/languages/${langProf.lang}/`}
                onClick={(e) => e.stopPropagation()}
              >
                <span className="badge badge-primary [&:not(:hover)]:badge-outline">
                  {langProf.lang}
                </span>
              </Link>
              <div className="text-sm text-gray-600">
                {displayLangProficiency(langProf.level)}
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              value={langProf.level}
              step={1}
              className="range range-sm w-full"
              onChange={(e) => handleRangeChange(e, langProf.lang)}
              disabled={disabled}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
