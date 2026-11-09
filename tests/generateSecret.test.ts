import { describe, test, expect } from 'vitest';
import { generateSecret } from '../src/generateSecret';

describe('generateSecret', () => {
  test('should generate a secret of the specified length', () => {
    const secret = generateSecret(4, 10, Math.random);
    expect(secret).toHaveLength(4);
  });

  test('should contain only unique digits from the specified base', () => {
    const secret = generateSecret(4, 10, Math.random);
    const uniqueDigits = new Set(secret.split(''));
    expect(uniqueDigits.size).toBe(secret.length);
  });

  test('should support bases greater than 10 (e.g., hexadecimal)', () => {
    const secret = generateSecret(4, 16, Math.random);
    const isValidHex = secret.split('').every((char: string) => /^[0-9A-F]$/.test(char));
    expect(isValidHex).toBe(true);
  });

  test('should be deterministic when a mocked random function is provided', () => {
    const mockRandom = (() => {
      const values = [0.99, 0.89, 0.79, 0.69];
      let i = 0;
      return () => values[i++];
    })();

    const secret = generateSecret(4, 10, mockRandom);
    expect(secret).toBe('9876');
  });

  test('should preserve leading zeros', () => {
    const mockRandom = (() => {
      const values = [0.0, 0.1];
      let i = 0;
      return () => values[i++];
    })();

    const secret = generateSecret(2, 10, mockRandom);
    expect(secret).toBe('01');
  });

  test('should throw an error if length is greater than base', () => {
    expect(() => generateSecret(11, 10, Math.random)).toThrow();
  });
});
