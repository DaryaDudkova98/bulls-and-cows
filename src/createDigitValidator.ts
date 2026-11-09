export const createDigitValidator = (base: number) => {
  if (!Number.isInteger(base) || base < 2 || base > 36) {
    throw new Error('Base must be an integer between 2 and 36');
  }

  const alphabet = Array.from({ length: base }, (_, i) => i.toString(base).toLowerCase());
  const allowed = new Set(alphabet);

  return (char: string): boolean =>
    typeof char === 'string' && char.length === 1 && allowed.has(char.toLowerCase());
};
