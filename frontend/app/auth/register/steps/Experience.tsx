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
}

export default function Experience({
  langs,
  selectedLanguages,
  handleLanguageSelection,
  handleRangeChange,
}: Props) {
  return (
    <>
      <div>
        <div className="mb-3 flex justify-between items-center">
          <span>Languages You Know</span>
          <div className="dropdown dropdown-hover">
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
                      defaultChecked={lang.code === 'tgl'}
                      className="checkbox checkbox-sm mr-2"
                    />
                    {lang.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-3 flex w-full justify-between px-2 text-xs">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>

        <div className="mb-3 flex flex-col items-center gap-5">
          {selectedLanguages.map((langProf, index) => (
            <div className="w-full" key={index}>
              <div className="w-full mb-1">
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={langProf.level}
                  step={1}
                  className="range w-full"
                  onChange={(e) => handleRangeChange(e, langProf.lang)}
                />
              </div>
              <div className="flex items-middle gap-2">
                <Link
                  href={`/languages/${langProf.lang}/`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="badge badge-primary [&:not(:hover)]:badge-outline">
                    {langProf.lang}
                  </span>
                </Link>
                <div className="mt-1 text-sm text-gray-600">
                  {displayLangProficiency(langProf.level)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
