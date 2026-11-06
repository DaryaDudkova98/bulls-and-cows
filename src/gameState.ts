import { evaluateGuess } from './evaluateGuess';

export type Settings = { length: number; base: number };
export type Attempt = { guess: string; bulls: number; cows: number };
export type Status = 'playing' | 'won' | 'lost';

export type GameState = {
  settings: Settings;
  secret: string;
  history: Attempt[];
  status: Status;
  attemptsLeft: number;
};

export const startNewGame = (
  settings: Settings,
  secret: string,
  maxAttempts: number
): GameState => ({
  settings: { ...settings },
  secret,
  history: [],
  status: 'playing',
  attemptsLeft: maxAttempts,
});

export const addAttempt = (state: GameState, guess: string): GameState => {
  if (state.status !== 'playing') return state;

  const { bulls, cows } = evaluateGuess(state.secret, guess);
  const entry: Attempt = { guess, bulls, cows };

  const newHistory = [...state.history, entry];
  const newAttemptsLeft = state.attemptsLeft - 1;

  const isWin = bulls === state.settings.length;
  const isLose = !isWin && newAttemptsLeft === 0;
  const newStatus: Status = isWin ? 'won' : isLose ? 'lost' : 'playing';

  return {
    ...state,
    history: newHistory,
    attemptsLeft: newAttemptsLeft,
    status: newStatus,
  };
};

export const updateSettings = (
  state: GameState,
  settings: Settings,
  secret: string,
  maxAttempts: number
): GameState => ({
  ...state,
  settings: { ...settings },
  secret,
  history: [],
  status: 'playing',
  attemptsLeft: maxAttempts,
});
