import { JWTPayload } from 'jose';
import { LangProficiencyLevel } from './languages';

/**
 * Represents the JWT payload structure.
 */
export interface Payload extends JWTPayload {
  username: string;
}

/**
 * Represents the authentication status of a user.
 */
export interface AuthType {
  isAuthenticated: boolean;
  id: number | null;
  username: string;
}

/**
 * Represents the possible gender values for a user.
 */
export type Gender = 'M' | 'F' | 'O' | 'N';

/**
 * Represents a user.
 */
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
