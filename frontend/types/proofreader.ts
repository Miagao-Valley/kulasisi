export enum FlaggedTokenLevel {
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}

export const flaggedTokenLevelValue: Record<FlaggedTokenLevel, number> = {
  [FlaggedTokenLevel.Error]: 1,
  [FlaggedTokenLevel.Warning]: 2,
  [FlaggedTokenLevel.Info]: 3,
};

/**
 * Represents a flagged token in a proofreader report.
 */
export interface FlaggedToken {
  offset: number;
  token: string;
  rule_id: string;
  message: string;
  level: FlaggedTokenLevel;
  suggestions: string[];
}

/**
 * Represents a proofreader report.
 */
export interface ProofreaderStats {
  token_count: number;
  flagged_count: number;
  correctness: number;
}
