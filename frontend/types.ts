import { JWTPayload } from 'jose';

export interface FetchError extends Error {
  info?: any;
  status?: number;
}

export interface Payload extends JWTPayload {
  username: string;
}

export interface AuthType {
  isAuthenticated: boolean;
  id: number | null;
  username: string;
}

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  last_login: Date;
  date_joined: Date;
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
