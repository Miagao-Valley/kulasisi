import { LangProficiencyLevel } from '@/types/languages';

/**
 * Returns a human-readable language proficiency level based on the provided level code.
 *
 * @param level - The proficiency level code (1 to 5) to convert to a readable string.
 * @returns The human-readable proficiency level string, or 'Unknown' if the level code is not recognized.
 */
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
