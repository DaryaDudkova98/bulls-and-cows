import { describe, test, expect } from 'vitest';
import { startNewGame, addAttempt, updateSettings } from '../src/gameState';

const baseSettings = { length: 4, base: 10 };

describe('game state (immutability)', () => {
  test('startNewGame returns fresh state', () => {
    const s = startNewGame(baseSettings, '1234', 10);
    expect(s.history).toEqual([]);
    expect(s.status).toBe('playing');
    expect(s.attemptsLeft).toBe(10);
    expect(s.secret).toBe('1234');
  });

  test('startNewGame does not mutate input settings', () => {
    const settings = { length: 4, base: 10 };
    const s = startNewGame(settings, '1234', 10);
    s.settings.length = 99;
    expect(settings.length).toBe(4);
  });

  test('addAttempt returns a NEW state object', () => {
    const s1 = startNewGame(baseSettings, '1234', 10);
    const s2 = addAttempt(s1, '5678');
    expect(s2).not.toBe(s1);
  });

  test('addAttempt returns a NEW history array', () => {
    const s1 = startNewGame(baseSettings, '1234', 10);
    const s2 = addAttempt(s1, '5678');
    expect(s2.history).not.toBe(s1.history);
    expect(s1.history).toEqual([]);
    expect(s2.history).toHaveLength(1);
  });

  test('addAttempt does not mutate previous history', () => {
    const s1 = startNewGame(baseSettings, '1234', 10);
    const s2 = addAttempt(s1, '5678');
    const s3 = addAttempt(s2, '1234');

    expect(s1.history).toHaveLength(0);
    expect(s2.history).toHaveLength(1);
    expect(s3.history).toHaveLength(2);
    expect(s1.history).not.toBe(s2.history);
    expect(s2.history).not.toBe(s3.history);
  });

  test('addAttempt appends correct entry', () => {
    const s1 = startNewGame(baseSettings, '1234', 10);
    const s2 = addAttempt(s1, '1324');
    expect(s2.history[0]).toEqual({ guess: '1324', bulls: 2, cows: 2 });
  });

  test('addAttempt sets status to won when bulls === length', () => {
    const s1 = startNewGame(baseSettings, '1234', 10);
    const s2 = addAttempt(s1, '1234');
    expect(s2.status).toBe('won');
  });

  test('addAttempt sets status to lost when attempts run out', () => {
    let s = startNewGame(baseSettings, '1234', 1);
    s = addAttempt(s, '5678');
    expect(s.status).toBe('lost');
  });

  test('addAttempt is a no-op when status is not playing', () => {
    let s = startNewGame(baseSettings, '1234', 10);
    s = addAttempt(s, '1234');
    const before = s;
    s = addAttempt(s, '5678');
    expect(s).toBe(before);
    expect(s.history).toHaveLength(1);
  });

  test('updateSettings resets history and status immutably', () => {
    let s = startNewGame(baseSettings, '1234', 10);
    s = addAttempt(s, '5678');

    const next = updateSettings(s, { length: 3, base: 8 }, '012', 8);

    expect(next).not.toBe(s);
    expect(next.history).toEqual([]);
    expect(next.settings).toEqual({ length: 3, base: 8 });
    expect(next.status).toBe('playing');
    expect(s.history).toHaveLength(1);
    expect(s.settings).toEqual(baseSettings);
  });
});
