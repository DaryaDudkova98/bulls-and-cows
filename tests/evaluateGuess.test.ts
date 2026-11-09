import { describe, test, expect } from 'vitest';
import { evaluateGuess } from '../src/evaluateGuess';

describe('evaluateGuess', () => {
  test('returns all bulls when guess equals secret', () => {
    expect(evaluateGuess('1234', '1234')).toEqual({ bulls: 4, cows: 0 });
  });

  test('returns all cows when digits are correct but in wrong positions', () => {
    expect(evaluateGuess('1234', '4321')).toEqual({ bulls: 0, cows: 4 });
  });

  test('returns zeros when nothing matches', () => {
    expect(evaluateGuess('1234', '5678')).toEqual({ bulls: 0, cows: 0 });
  });

  test('counts mixed bulls and cows', () => {
    expect(evaluateGuess('1234', '1324')).toEqual({ bulls: 2, cows: 2 });
  });

  test('does not double-count cows for duplicated digits in guess', () => {
    expect(evaluateGuess('1234', '1111')).toEqual({ bulls: 1, cows: 0 });
  });

  test('does not double-count cows for duplicated digits in secret', () => {
    expect(evaluateGuess('1123', '1444')).toEqual({ bulls: 1, cows: 0 });
  });

  test('counts cows limited by secret multiplicity', () => {
    expect(evaluateGuess('1234', '4444')).toEqual({ bulls: 1, cows: 0 });
  });

  test('is case-insensitive for hex digits', () => {
    expect(evaluateGuess('a1b2', 'A1B2')).toEqual({ bulls: 4, cows: 0 });
    expect(evaluateGuess('a1b2', 'b2a1')).toEqual({ bulls: 0, cows: 4 });
  });

  test('handles secrets with leading zeros', () => {
    expect(evaluateGuess('0123', '0123')).toEqual({ bulls: 4, cows: 0 });
    expect(evaluateGuess('0123', '3210')).toEqual({ bulls: 0, cows: 4 });
  });

  test('handles single-digit secret', () => {
    expect(evaluateGuess('5', '5')).toEqual({ bulls: 1, cows: 0 });
    expect(evaluateGuess('5', '3')).toEqual({ bulls: 0, cows: 0 });
  });

  test('returns a plain object with only bulls and cows keys', () => {
    const result = evaluateGuess('1234', '1234');
    expect(Object.keys(result).sort()).toEqual(['bulls', 'cows']);
  });
});
