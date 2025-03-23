import { Phrase, Translation } from './phrases';
import { Word, Definition } from './dictionary';

export type Entry = Phrase | Translation | Word | Definition;

export enum VoteValue {
  Upvote = 1,
  Unvote = 0,
  Downvote = -1,
}

export interface Vote {
  user: string;
  value: VoteValue;
  voted_at: Date;
}

export interface PaginationDetails {
  num_pages: number;
  current_page: number;
  count: number;
  next: string | null;
  previous: string | null;
}

export interface Paginated<T> {
  pagination: PaginationDetails;
  results: T;
}
