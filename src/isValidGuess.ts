import { createDigitValidator } from './createDigitValidator';

export const isValidGuess = (guess: string, length: number, base: number): boolean => {
  if (typeof guess !== 'string') return false;
  if (guess.length !== length) return false;

  const digitValidator = createDigitValidator(base);
  const chars = guess.toLowerCase().split('');
  if (!chars.every(digitValidator)) return false;
  if (new Set(chars).size !== chars.length) return false;

  return true;
};
