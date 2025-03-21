/**
 * Represents the proficiency levels for a language.
 * The levels range from 1 (Elementary Proficiency) to 5 (Native / Bilingual Proficiency).
 */
export enum LangProficiencyLevel {
  Elementary = 1,
  LimitedWorking = 2,
  ProfessionalWorking = 3,
  FullProfessional = 4,
  NativeBilingual = 5,
}

/**
 * Represents a language.
 */
export interface Lang {
  id: number;
  code: string;
  name: string;
  user_count: number;
  phrase_count: number;
  translation_count: number;
  word_count: number;
  definition_count: number;
  users_by_proficiency: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}
