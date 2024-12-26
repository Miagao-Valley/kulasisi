import { LangProficiencyLevel } from '@/types/languages';

const displayLangProficiency = (level: LangProficiencyLevel): string => {
  const proficiencyLookup: Record<LangProficiencyLevel, string> = {
    1: 'Elementary Proficiency',
    2: 'Limited Working Proficiency',
    3: 'Professional Working Proficiency',
    4: 'Full Professional Proficiency',
    5: 'Native / Bilingual Proficiency',
  };

  return proficiencyLookup[level] || 'Unknown';
};

export default displayLangProficiency;
