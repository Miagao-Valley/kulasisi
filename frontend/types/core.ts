import { Phrase, Translation } from "./phrases";
import { Word, Definition } from "./dictionary";

export type Entry = Phrase | Translation | Word | Definition;

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
