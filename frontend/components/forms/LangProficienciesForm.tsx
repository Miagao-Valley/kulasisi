'use client';

import React, { useEffect, useState } from 'react';
import { Lang, LangProficiencyLevel } from '@/types/languages';
import displayLangProficiency from '@/lib/utils/displayLangProficiency';
import getLangs from '@/lib/langs/getLangs';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { Slider } from '@/components/ui/slider';
import { LangHoverCard } from '../cards/LangCard';

interface Props {
  selectedLangProficiencies: { lang: string; level: LangProficiencyLevel }[];
  setSelectedLangProficiencies: (
    values: {
      lang: string;
      level: LangProficiencyLevel;
    }[]
  ) => void;
  disabled?: boolean;
}

export default function LangProficienciesForm({
  selectedLangProficiencies,
  setSelectedLangProficiencies,
  disabled = false,
}: Props) {
  const [langs, setLangs] = useState<Lang[]>([]);
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    const fetchLangs = async () => {
      const { results } = await getLangs();
      setLangs(results);
    };

    fetchLangs();
  }, []);

  useEffect(() => {
    setOptions(
      langs.map((lang) => ({
        label: lang.name,
        value: lang.code,
      }))
    );
  }, [langs]);

  const handleLanguageSelection = (selectedOptions: Option[]) => {
    const selectedValues = selectedOptions.map((option) => option.value);

    const updatedLanguages = selectedLangProficiencies.filter((item) =>
      selectedValues.includes(item.lang)
    );

    selectedOptions.forEach((option) => {
      if (
        !selectedLangProficiencies.some((item) => item.lang === option.value)
      ) {
        updatedLanguages.push({
          lang: option.value,
          level: LangProficiencyLevel.Elementary,
        });
      }
    });

    setSelectedLangProficiencies(updatedLanguages);
  };

  const handleRangeChange = (level: LangProficiencyLevel, lang: string) => {
    setSelectedLangProficiencies(
      selectedLangProficiencies.map((item) =>
        item.lang === lang ? { ...item, level } : item
      )
    );
  };

  return (
    <>
      <div className="w-full flex items-center">
        {!disabled && options && (
          <MultipleSelector
            value={selectedLangProficiencies.map((item) => ({
              value: item.lang,
              label:
                langs.find((lang) => lang.code === item.lang)?.name ||
                item.lang,
            }))}
            onSearch={async (q) => {
              q = q.toLowerCase();
              return options.filter(
                (option) =>
                  option.value.toLowerCase().includes(q) ||
                  option.label.toLowerCase().includes(q)
              );
            }}
            triggerSearchOnFocus
            onChange={(options) => handleLanguageSelection(options)}
            placeholder="Select languages..."
            hidePlaceholderWhenSelected
            emptyIndicator={<p className="text-center">No results found</p>}
            className="mb-2"
          />
        )}
      </div>

      {!!selectedLangProficiencies.length ? (
        <div>
          <div className="w-full px-2 mb-2 flex justify-between text-xs">
            {Object.values(LangProficiencyLevel)
              .filter((value) => typeof value === 'number')
              .map((value) => (
                <span key={value}>{value}</span>
              ))}
          </div>

          <div className="mb-3 flex flex-col items-center gap-4">
            {selectedLangProficiencies.map((langProf, index) => (
              <div className="w-full" key={index}>
                <div className="flex items-center gap-2 mb-2">
                  <LangHoverCard code={langProf.lang} />
                  <div className="text-sm ">
                    {displayLangProficiency(langProf.level)} Proficiency
                  </div>
                </div>

                <Slider
                  min={LangProficiencyLevel.Elementary}
                  max={LangProficiencyLevel.NativeBilingual}
                  value={[langProf.level]}
                  step={1}
                  onValueChange={(value) =>
                    handleRangeChange(
                      value[0] as LangProficiencyLevel,
                      langProf.lang
                    )
                  }
                  disabled={disabled}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-2">No languages</div>
      )}
    </>
  );
}
