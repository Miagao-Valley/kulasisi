export interface WordleGame {
  id: number;
  player: string;
  lang: string;
  word_length: number;
  max_guesses: number;
  solution: string;
  guesses: string[];
  game_status: 'playing' | 'win' | 'lose';
  date_start: string;
  date_end: string;
}
