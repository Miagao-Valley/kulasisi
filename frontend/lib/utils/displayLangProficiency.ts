import { LangProficiencyLevel } from '@/types/languages';

/**
 * Converts a proficiency level code to a human-readable string.
 *
 * @param level - The proficiency level code (1 to 5).
 * @returns The corresponding proficiency level as a string, or 'Unknown' if the code is invalid.
 */
export function displayLangProficiency(level: LangProficiencyLevel): string {
  const proficiencyLookup = {
    [LangProficiencyLevel.Elementary]: 'Elementary',
    [LangProficiencyLevel.LimitedWorking]: 'Limited Working',
    [LangProficiencyLevel.ProfessionalWorking]: 'Professional Working',
    [LangProficiencyLevel.FullProfessional]: 'Full Professional',
    [LangProficiencyLevel.NativeBilingual]: 'Native / Bilingual',
  };

  return proficiencyLookup[level] ?? 'Unknown';
}
