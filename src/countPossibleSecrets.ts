const cache = new Map<string, number>();

const compute = (length: number, base: number): number => {
  const key = `${length}:${base}`;
  if (cache.has(key)) return cache.get(key)!;

  const result = length === 0 ? 1 : base * compute(length - 1, base - 1);
  cache.set(key, result);
  return result;
};

export const countPossibleSecrets = (length: number, base: number): number => {
  if (!Number.isInteger(length) || !Number.isInteger(base)) {
    throw new Error('length and base must be integers');
  }
  if (length < 0) throw new Error('length cannot be negative');
  if (base < 2) throw new Error('base must be at least 2');
  if (length > base) throw new Error('length cannot be greater than base');

  return compute(length, base);
};
