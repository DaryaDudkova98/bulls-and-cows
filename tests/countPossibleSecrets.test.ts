import { describe, test, expect } from 'vitest';
import { countPossibleSecrets } from '../src/countPossibleSecrets';

describe('countPossibleSecrets', () => {
  test('P(0, b) = 1 for any base', () => {
    expect(countPossibleSecrets(0, 2)).toBe(1);
    expect(countPossibleSecrets(0, 10)).toBe(1);
    expect(countPossibleSecrets(0, 16)).toBe(1);
  });

  test('P(1, b) = b', () => {
    expect(countPossibleSecrets(1, 10)).toBe(10);
    expect(countPossibleSecrets(1, 16)).toBe(16);
  });

  test('P(l, b) = b! / (b-l)!', () => {
    expect(countPossibleSecrets(4, 10)).toBe(5040);
    expect(countPossibleSecrets(2, 10)).toBe(90);
    expect(countPossibleSecrets(4, 16)).toBe(43680);
  });

  test('P(l, b) = P(l, l) = l! when length equals base', () => {
    expect(countPossibleSecrets(2, 2)).toBe(2);
    expect(countPossibleSecrets(3, 3)).toBe(6);
    expect(countPossibleSecrets(4, 4)).toBe(24);
    expect(countPossibleSecrets(5, 5)).toBe(120);
  });

  test('secret may start with zero (no extra subtraction)', () => {
    expect(countPossibleSecrets(2, 10)).toBe(90);
    expect(countPossibleSecrets(1, 10)).toBe(10);
  });

  test('throws when length > base', () => {
    expect(() => countPossibleSecrets(5, 4)).toThrow();
    expect(() => countPossibleSecrets(11, 10)).toThrow();
  });

  test('throws for negative length or base', () => {
    expect(() => countPossibleSecrets(-1, 10)).toThrow();
    expect(() => countPossibleSecrets(2, -10)).toThrow();
  });

  test('throws for non-integer length or base', () => {
    expect(() => countPossibleSecrets(2.5, 10)).toThrow();
    expect(() => countPossibleSecrets(2, 10.5)).toThrow();
  });

  test('memoizes results (second call is served from cache)', () => {
    const a = countPossibleSecrets(4, 10);
    const b = countPossibleSecrets(4, 10);
    expect(a).toBe(b);
    expect(a).toBe(5040);
  });
});
