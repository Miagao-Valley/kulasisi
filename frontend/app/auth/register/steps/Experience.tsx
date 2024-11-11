import React from 'react';
import { LangProficiencyLevel } from '@/types';
import LanguageProficienciesForm from './LanguageProficienciesForm';

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
      <LanguageProficienciesForm
        langs={langs}
        selectedLanguages={selectedLanguages}
        handleLanguageSelection={handleLanguageSelection}
        handleRangeChange={handleRangeChange}
      />
    </>
  );
}
