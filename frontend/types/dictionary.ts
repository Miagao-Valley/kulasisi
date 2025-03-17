import { Vote } from './core';

/**
 * Represents a word entry.
 */
export interface Word {
  id: number;
  word: string;
  lang: string;
  contributor: string;
  contributor_reputation: number;
  parts_of_speech: string[];
  source_title?: string;
  source_link?: string;
  created_at: Date;
  updated_at: Date;
  vote_count: number;
  user_vote: Vote['value'];
  best_definitions: { [key: string]: string };
  definition_count: number;
}

/**
 * Type guard to check if an object is a Word.
 *
 * @param obj - The object to check.
 * @returns True if the object is a Word, false otherwise.
 */
export function isWord(obj: any): obj is Word {
  return (
    typeof obj.id === 'number' &&
    typeof obj.word === 'string' &&
    typeof obj.lang === 'string' &&
    typeof obj.contributor === 'string' &&
    typeof obj.contributor_reputation === 'number' &&
    obj.created_at instanceof Date &&
    obj.updated_at instanceof Date &&
    typeof obj.vote_count === 'number'
  );
}

/**
 * Represents a revision of a word entry.
 */
export interface WordRevision {
  history_id: number;
  word: string;
  history_user: string;
  history_date: Date;
}

/**
 * Represents a definition of a word.
 */
export interface Definition {
  id: number;
  word: { word: string; lang: string };
  description: string;
  lang: string;
  contributor: string;
  contributor_reputation: number;
  pos?: string;
  synonyms?: string[];
  antonyms?: string[];
  usage_note?: string;
  source_title?: string;
  source_link?: string;
  created_at: Date;
  updated_at: Date;
  vote_count: number;
  user_vote: Vote['value'];
}

/**
 * Type guard to check if an object is a Definition.
 *
 * @param obj - The object to check.
 * @returns True if the object is a Definition, false otherwise.
 */
export function isDefinition(obj: any): obj is Definition {
  return (
    typeof obj.id === 'number' &&
    typeof obj.description === 'string' &&
    typeof obj.lang === 'string' &&
    typeof obj.contributor === 'string' &&
    typeof obj.contributor_reputation === 'number' &&
    obj.created_at instanceof Date &&
    obj.updated_at instanceof Date &&
    typeof obj.vote_count === 'number'
  );
}

/**
 * Represents a revision of a definition entry.
 */
export interface DefinitionRevision {
  history_id: number;
  description: string;
  history_user: string;
  history_date: Date;
}

/**
 * Represents a part of speech for a word.
 */
export interface PartOfSpeech {
  abbr: string;
  name: string;
  description: string;
}
