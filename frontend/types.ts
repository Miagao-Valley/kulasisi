import { JWTPayload } from 'jose';

export interface Payload extends JWTPayload {
  username: string;
}

export interface AuthType {
  isAuthenticated: boolean;
  id: number | null;
  username: string;
}

export type Gender = 'M' | 'F' | 'O' | '';

export type LangProficiencyLevel = 1 | 2 | 3 | 4 | 5;

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  last_login: Date;
  date_joined: Date;
  phone_number?: string;
  date_of_birth?: Date;
  location?: string;
  gender?: Gender;
  bio?: string;
  website?: string;
  language_proficiencies?: { lang: string; level: LangProficiencyLevel }[];
}

export interface Lang {
  id: number;
  code: string;
  name: string;
}

export interface TextEntry {
  id: number;
  content: string;
  author: string;
  lang: string;
  created_at: Date;
  updated_at: Date;
}

export interface TextEntryRevision {
  history_id: number;
  content: string;
  history_user: string;
  history_date: string;
}

export interface Translation {
  id: number;
  text_entry: number;
  content: string;
  author: string;
  lang: string;
  created_at: Date;
  updated_at: Date;
}

export interface TranslationRevision {
  history_id: number;
  content: string;
  history_user: string;
  history_date: string;
}

export interface PaginationDetails {
  num_pages: number;
  current_page: number;
  count: number;
  limit: number;
  next: {
    offset: number;
    link: string;
  };
  previous: {
    offset: number;
    link: string;
  };
}
