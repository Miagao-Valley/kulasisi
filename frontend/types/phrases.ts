import { Vote } from './core';

/**
 * Represents a phrase entry.
 */
export interface Phrase {
  id: number;
  content: string;
  lang: string;
  contributor: string;
  contributor_reputation: number;
  categories: string[];
  usage_note?: string;
  source_title?: string;
  source_link?: string;
  created_at: Date;
  updated_at: Date;
  vote_count: number;
  user_vote: Vote['value'];
  best_translations: { [key: string]: string };
  translation_count: number;
}

/**
 * Type guard to check if an object is a Phrase.
 *
 * @param obj - The object to check.
 * @returns True if the object is a Phrase, false otherwise.
 */
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

/**
 * Represents a revision of a phrase entry.
 */
export interface PhraseRevision {
  history_id: number;
  content: string;
  history_user: string;
  history_date: Date;
}

/**
 * Represents a translation of a phrase entry.
 */
export interface Translation {
  id: number;
  phrase: number;
  content: string;
  lang: string;
  contributor: string;
  contributor_reputation: number;
  source_title?: string;
  source_link?: string;
  created_at: Date;
  updated_at: Date;
  vote_count: number;
  user_vote: Vote['value'];
}

/**
 * Type guard to check if an object is a Translation.
 *
 * @param obj - The object to check.
 * @returns True if the object is a Translation, false otherwise.
 */
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

/**
 * Represents a revision of a translation entry.
 */
export interface TranslationRevision {
  history_id: number;
  content: string;
  history_user: string;
  history_date: Date;
}

/**
 * Represents a category for phrases or translations.
 */
export interface Category {
  name: string;
  description: string;
}
