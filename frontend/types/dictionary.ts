export interface Word {
  id: number;
  word: string;
  lang: string;
  contributor: string;
  contributor_reputation: number;
  parts_of_speech: string[];
  best_definition: string;
  source_title?: string;
  source_link?: string;
  created_at: Date;
  updated_at: Date;
  vote_count: number;
}

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

export interface WordRevision {
  history_id: number;
  word: string;
  history_user: string;
  history_date: Date;
}

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
}

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

export interface DefinitionRevision {
  history_id: number;
  description: string;
  history_user: string;
  history_date: Date;
}

export interface PartOfSpeech {
  abbr: string;
  name: string;
  description: string;
}
