import { JWTPayload } from 'jose';
import { LangProficiencyLevel } from './languages';

export interface Payload extends JWTPayload {
  username: string;
}

export interface AuthType {
  isAuthenticated: boolean;
  id: number | null;
  username: string;
}

export type Gender = 'M' | 'F' | 'O' | 'N';

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
  word_count: number;
  definition_count: number;
  vote_count: number;
  language_proficiencies?: { lang: string; level: LangProficiencyLevel }[];
  last_login: Date;
  date_joined: Date;
}
