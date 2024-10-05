export interface FetchError extends Error {
  info?: any;
  status?: number;
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
  lang: string;
  created_at: Date;
  updated_at: Date;
}
