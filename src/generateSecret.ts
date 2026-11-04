export const generateSecret = (
  length: number,
  base: number,
  random: () => number = Math.random
): string => {
  if (length > base) {
    throw new Error('Length cannot be greater than base');
  }

  const alphabet = Array.from({ length: base }, (_, i) => i.toString(base).toUpperCase());

  const digits = new Set<string>();

  while (digits.size < length) {
    const randomIndex = Math.floor(random() * base);
    const char = alphabet[randomIndex];

    if (char !== undefined) {
      digits.add(char);
    }
  }

  return Array.from(digits).join('');
};
