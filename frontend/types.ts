export interface FetchError extends Error {
  info?: any;
  status?: number;
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
