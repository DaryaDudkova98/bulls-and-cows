import '../../styles/components/attemptHistory.css';

import type { Attempt } from '../../gameState';

export function createAttemptHistory(initial: Attempt[]): {
  root: HTMLElement;
  update: (attempts: Attempt[]) => void;
} {
  const root = document.createElement('ul');
  root.className = 'attempt-history';

  const render = (attempts: Attempt[]) => {
    const fragment = document.createDocumentFragment();

    for (let i = attempts.length - 1; i >= 0; i--) {
      const attempt = attempts[i];
      if (!attempt) continue;

      const li = document.createElement('li');
      li.className = 'attempt-history__item';

      const number = document.createElement('span');
      number.className = 'attempt-history__number';
      number.textContent = `${i + 1}.`;

      const guess = document.createElement('span');
      guess.className = 'attempt-history__guess';
      guess.textContent = attempt.guess.toUpperCase();

      const result = document.createElement('span');
      result.className = 'attempt-history__result';
      result.textContent = `${attempt.bulls} bulls, ${attempt.cows} cows`;

      li.appendChild(number);
      li.appendChild(guess);
      li.appendChild(result);
      fragment.appendChild(li);
    }

    root.replaceChildren(fragment);
  };

  render(initial);

  return { root, update: render };
}
