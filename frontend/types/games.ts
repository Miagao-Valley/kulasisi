export enum WordleGameStatus {
  Playing = 'playing',
  Win = 'win',
  Lose = 'lose',
}

/**
 * Represents a Wordle game.
 */
export interface WordleGame {
  id: number;
  player: string;
  lang: string;
  word_length: number;
  max_guesses: number;
  solution: string;
  guesses: string[];
  game_status: WordleGameStatus;
  date_start: string;
  date_end: string;
}

/**
 * Represents the statistics for a Wordle game.
 */
export interface WordleGameStats {
  total_games: number;
  games_won: number;
  games_lost: number;
  win_rate: number;
}
