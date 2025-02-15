export type FlaggedTokenLevel = 'error' | 'warning' | 'info';

export interface FlaggedToken {
  offset: number;
  token: string;
  rule_id: string;
  message: string;
  level: FlaggedTokenLevel;
  suggestions: string[];
}

export interface ProofreaderStats {
  token_count: number;
  flagged_count: number;
  correctness: number;
}
