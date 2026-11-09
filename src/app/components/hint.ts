import '../../styles/components/hint.css';

import questionIcon from '../../img/question.jpg';

export interface HintConfig {
  length: number;
  base: number;
}

export function createHint(initial: HintConfig): {
  root: HTMLElement;
  update: (config: HintConfig) => void;
} {
  const root = document.createElement('div');
  root.className = 'hint';

  const content = document.createElement('div');
  content.className = 'hint__content';

  const cards = document.createElement('div');
  cards.className = 'hint__cards';

  const text = document.createElement('p');
  text.className = 'hint__text';

  content.appendChild(cards);
  content.appendChild(text);

  root.appendChild(content);

  const render = (config: HintConfig) => {
    const { length, base } = config;

    let rangeText = '';
    if (base === 2) rangeText = '0 to 1';
    else if (base === 8) rangeText = '0 to 7';
    else if (base === 10) rangeText = '0 to 9';
    else if (base === 16) rangeText = '0 to 9 and A to F';

    text.textContent = `The number consists of ${length} unique digits from ${rangeText}.`;

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < length; i++) {
      const card = document.createElement('div');
      card.className = 'hint__card';

      const cardBack = document.createElement('img');
      cardBack.className = 'hint__card-back';
      cardBack.src = questionIcon;
      cardBack.alt = 'question card';

      card.appendChild(cardBack);
      fragment.appendChild(card);
    }

    cards.replaceChildren(fragment);
  };

  render(initial);

  return {
    root,
    update: render,
  };
}
