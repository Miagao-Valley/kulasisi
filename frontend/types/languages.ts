export type LangProficiencyLevel = 1 | 2 | 3 | 4 | 5;

export interface Lang {
  id: number;
  code: string;
  name: string;
  user_count: string;
  users_by_proficiency: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  phrase_count: number;
  translation_count: number;
  word_count: number;
  definition_count: number;
}
