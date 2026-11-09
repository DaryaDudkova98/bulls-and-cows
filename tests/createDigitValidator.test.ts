import { describe, test, expect } from 'vitest';
import { createDigitValidator } from '../src/createDigitValidator';

describe('createDigitValidator', () => {
  test('accepts digits 0-9 for base 10', () => {
    const isValid = createDigitValidator(10);
    '0123456789'.split('').forEach((ch) => {
      expect(isValid(ch)).toBe(true);
    });
  });

  test('rejects "a" for base 10', () => {
    const isValid = createDigitValidator(10);
    expect(isValid('a')).toBe(false);
  });

  test('accepts hex digits in both cases for base 16', () => {
    const isValid = createDigitValidator(16);
    '0123456789abcdef'.split('').forEach((ch) => {
      expect(isValid(ch)).toBe(true);
      expect(isValid(ch.toUpperCase())).toBe(true);
    });
  });

  test('rejects "g" for base 16', () => {
    const isValid = createDigitValidator(16);
    expect(isValid('g')).toBe(false);
  });

  test('accepts only 0 and 1 for base 2', () => {
    const isValid = createDigitValidator(2);
    expect(isValid('0')).toBe(true);
    expect(isValid('1')).toBe(true);
    expect(isValid('2')).toBe(false);
  });

  test('rejects multi-character strings', () => {
    const isValid = createDigitValidator(10);
    expect(isValid('12')).toBe(false);
  });

  test('rejects empty string', () => {
    const isValid = createDigitValidator(10);
    expect(isValid('')).toBe(false);
  });

  test('throws for invalid base', () => {
    expect(() => createDigitValidator(1)).toThrow();
    expect(() => createDigitValidator(37)).toThrow();
    expect(() => createDigitValidator(2.5)).toThrow();
  });
});
