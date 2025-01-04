export interface Phrase {
  id: number;
  content: string;
  lang: string;
  contributor: string;
  contributor_reputation: number;
  categories: string[];
  created_at: Date;
  updated_at: Date;
  vote_count: number;
  translation_count: number;
}

export function isPhrase(obj: any): obj is Phrase {
  return (
    typeof obj.id === 'number' &&
    typeof obj.content === 'string' &&
    typeof obj.lang === 'string' &&
    typeof obj.contributor === 'string' &&
    typeof obj.contributor_reputation === 'number' &&
    obj.created_at instanceof Date &&
    obj.updated_at instanceof Date &&
    typeof obj.vote_count === 'number' &&
    typeof obj.translation_count === 'number'
  );
}

export interface PhraseRevision {
  history_id: number;
  content: string;
  history_user: string;
  history_date: Date;
}

export interface Translation {
  id: number;
  phrase: number;
  content: string;
  lang: string;
  contributor: string;
  contributor_reputation: number;
  created_at: Date;
  updated_at: Date;
  vote_count: number;
}

export function isTranslation(obj: any): obj is Translation {
  return (
    typeof obj.id === 'number' &&
    typeof obj.phrase === 'number' &&
    typeof obj.content === 'string' &&
    typeof obj.lang === 'string' &&
    typeof obj.contributor === 'string' &&
    typeof obj.contributor_reputation === 'number' &&
    obj.created_at instanceof Date &&
    obj.updated_at instanceof Date &&
    typeof obj.vote_count === 'number'
  );
}

export interface TranslationRevision {
  history_id: number;
  content: string;
  history_user: string;
  history_date: Date;
}

export interface Category {
  name: string;
  description: string;
}