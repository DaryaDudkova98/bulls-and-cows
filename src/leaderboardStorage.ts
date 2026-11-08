export type ScoreEntry = {
  name: string;
  attempts: number;
  time: number;
  date: string;
};

export type Leaderboard = Record<number, ScoreEntry[]>;

const STORAGE_KEY = 'bulls-and-cows-leaderboard';

const EMPTY: Leaderboard = {};

export function loadLeaderboard(): Leaderboard {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY };
    const parsed = JSON.parse(raw) as Leaderboard;
    if (typeof parsed !== 'object' || parsed === null) return { ...EMPTY };
    return parsed;
  } catch {
    return { ...EMPTY };
  }
}

export function saveLeaderboard(data: Leaderboard): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* localStorage may be unavailable (private mode, quota) — ignore */
  }
}

function sortScores(list: ScoreEntry[]): ScoreEntry[] {
  return [...list].sort((a, b) => {
    if (a.attempts !== b.attempts) return a.attempts - b.attempts;
    return a.time - b.time;
  });
}

export function addScore(base: number, entry: Omit<ScoreEntry, 'date'>): Leaderboard {
  const data = loadLeaderboard();
  const list = data[base] ? [...data[base]] : [];

  list.push({ ...entry, date: new Date().toISOString() });

  data[base] = sortScores(list).slice(0, 10);

  saveLeaderboard(data);
  return data;
}

export function getTop(base: number, n = 10): ScoreEntry[] {
  const data = loadLeaderboard();
  const list = data[base] ?? [];
  return sortScores(list).slice(0, n);
}
