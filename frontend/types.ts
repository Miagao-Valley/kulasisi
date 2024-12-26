import { JWTPayload } from 'jose';

export interface Payload extends JWTPayload {
  username: string;
}

export interface AuthType {
  isAuthenticated: boolean;
  id: number | null;
  username: string;
}

export type Gender = 'M' | 'F' | 'O' | 'N';

export type LangProficiencyLevel = 1 | 2 | 3 | 4 | 5;

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  date_of_birth?: Date;
  location?: string;
  gender?: Gender;
  bio?: string;
  website?: string;
  reputation: number;
  phrase_count: number;
  translation_count: number;
  vote_count: number;
  language_proficiencies?: { lang: string; level: LangProficiencyLevel }[];
  last_login: Date;
  date_joined: Date;
}

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
  translation_count: number;
  phrase_count: number;
}

export interface Phrase {
  id: number;
  content: string;
  lang: string;
  contributor: string;
  contributor_reputation: number;
  created_at: Date;
  updated_at: Date;
  vote_count: number;
  translation_count: number;
}

export interface PhraseRevision {
  history_id: number;
  content: string;
  history_user: string;
  history_date: string;
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

export interface TranslationRevision {
  history_id: number;
  content: string;
  history_user: string;
  history_date: string;
}

export interface Word {
  id: number;
  word: string;
  lang: string;
  contributor: string;
  contributor_reputation: number;
  created_at: Date;
  updated_at: Date;
  vote_count: number;
}

export interface WordRevision {
  history_id: number;
  word: string;
  history_user: string;
  history_date: string;
}

export interface Definition {
  id: number;
  word: number;
  description: string;
  lang: string;
  contributor: string;
  contributor_reputation: number;
  created_at: Date;
  updated_at: Date;
  vote_count: number;
}

export interface DefinitionRevision {
  history_id: number;
  description: string;
  history_user: string;
  history_date: string;
}
export interface Vote {
  user: string;
  value: -1 | 0 | 1;
  voted_at: Date;
}
export interface PaginationDetails {
  num_pages: number;
  current_page: number;
  count: number;
  next: string;
  previous: string;
}
