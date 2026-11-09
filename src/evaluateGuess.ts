export type GuessResult = { bulls: number; cows: number };

export const evaluateGuess = (secret: string, guess: string): GuessResult => {
  const s = secret.toLowerCase().split('');
  const g = guess.toLowerCase().split('');

  const bulls = s.reduce((acc, ch, i) => acc + (ch === g[i] ? 1 : 0), 0);

  const secretRest = s.filter((ch, i) => ch !== g[i]);
  const guessRest = g.filter((ch, i) => ch !== s[i]);
  const secretFreq = secretRest.reduce<Record<string, number>>((acc, ch) => {
    acc[ch] = (acc[ch] ?? 0) + 1;
    return acc;
  }, {});
  const cows = guessRest.reduce((acc, ch) => {
    if (!secretFreq[ch]) return acc;
    secretFreq[ch] -= 1;
    return acc + 1;
  }, 0);

  return { bulls, cows };
};
