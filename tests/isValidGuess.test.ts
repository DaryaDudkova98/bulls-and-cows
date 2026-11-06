import { describe, test, expect } from 'vitest';
import { isValidGuess } from '../src/isValidGuess';

describe('isValidGuess', () => {
  test('accepts a valid guess with correct length, digits and uniqueness', () => {
    expect(isValidGuess('1234', 4, 10)).toBe(true);
  });

  test('rejects guess with wrong length (too short)', () => {
    expect(isValidGuess('123', 4, 10)).toBe(false);
  });

  test('rejects guess with wrong length (too long)', () => {
    expect(isValidGuess('12345', 4, 10)).toBe(false);
  });

  test('rejects guess with digits outside base', () => {
    expect(isValidGuess('12a4', 4, 10)).toBe(false);
  });

  test('rejects guess with digit >= base', () => {
    expect(isValidGuess('1239', 4, 8)).toBe(false);
  });

  test('rejects guess with repeated digits', () => {
    expect(isValidGuess('1123', 4, 10)).toBe(false);
  });

  test('rejects guess where digits repeat only after lowercasing', () => {
    expect(isValidGuess('A1a2', 4, 16)).toBe(false);
  });

  test('accepts hex guess in lowercase', () => {
    expect(isValidGuess('a1b2', 4, 16)).toBe(true);
  });

  test('accepts hex guess in uppercase', () => {
    expect(isValidGuess('A1B2', 4, 16)).toBe(true);
  });

  test('accepts hex guess in mixed case', () => {
    expect(isValidGuess('a1B2', 4, 16)).toBe(true);
  });

  test('accepts hex guess with digit f (max for base 16)', () => {
    expect(isValidGuess('f123', 4, 16)).toBe(true);
  });

  test('rejects hex guess with digit g (not a hex digit)', () => {
    expect(isValidGuess('g123', 4, 16)).toBe(false);
  });

  test('accepts guess with leading zeros', () => {
    expect(isValidGuess('0123', 4, 10)).toBe(true);
  });

  test('accepts guess with zero as first char', () => {
    expect(isValidGuess('0', 1, 10)).toBe(true);
  });

  test('accepts binary guess with unique digits for base 2', () => {
    expect(isValidGuess('10', 2, 2)).toBe(true);
    expect(isValidGuess('01', 2, 2)).toBe(true);
  });

  test('rejects binary guess containing 2', () => {
    expect(isValidGuess('1201', 4, 2)).toBe(false);
  });

  test('rejects empty string when length > 0', () => {
    expect(isValidGuess('', 4, 10)).toBe(false);
  });

  test('rejects non-string input', () => {
    const asUnknown = (v: unknown) => v;
    expect(isValidGuess(asUnknown(null) as string, 4, 10)).toBe(false);
    expect(isValidGuess(asUnknown(1234) as string, 4, 10)).toBe(false);
  });

  test('rejects guess containing spaces', () => {
    expect(isValidGuess('12 4', 4, 10)).toBe(false);
  });

  test('rejects guess containing symbols', () => {
    expect(isValidGuess('12-4', 4, 10)).toBe(false);
  });
});
