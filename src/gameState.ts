import { evaluateGuess } from './evaluateGuess';

export type Settings = { length: number; base: number };
export type Attempt = { guess: string; bulls: number; cows: number };
export type Status = 'playing' | 'won';

export type GameState = {
  settings: Settings;
  secret: string;
  history: Attempt[];
  status: Status;
  startedAt: number;
};

export const startNewGame = (settings: Settings, secret: string): GameState => ({
  settings: { ...settings },
  secret,
  history: [],
  status: 'playing',
  startedAt: Date.now(),
});

export const addAttempt = (state: GameState, guess: string): GameState => {
  if (state.status !== 'playing') return state;

  const { bulls, cows } = evaluateGuess(state.secret, guess);
  const entry: Attempt = { guess, bulls, cows };

  return {
    ...state,
    history: [...state.history, entry],
    status: bulls === state.settings.length ? 'won' : 'playing',
  };
};

export const updateSettings = (
  state: GameState,
  settings: Settings,
  secret: string
): GameState => ({
  ...state,
  settings: { ...settings },
  secret,
  history: [],
  status: 'playing',
  startedAt: Date.now(),
});

export const getElapsedSeconds = (state: GameState): number =>
  Math.round((Date.now() - state.startedAt) / 1000);
