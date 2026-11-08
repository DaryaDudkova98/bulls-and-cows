import '../../styles/pages/setUp.css';

import arrowDown from '../../img/dashicons--arrow-down.svg?raw';
import { createHint } from '../components/hint';

const LENGTH_OPTIONS = [2, 3, 4, 5, 6];

const SYSTEMS: Array<{ value: number; label: string }> = [
  { value: 2, label: 'Binary (2)' },
  { value: 8, label: 'Octal (8)' },
  { value: 10, label: 'Decimal (10)' },
  { value: 16, label: 'Hexadecimal (16)' },
];

export function createSetUp(
  onStart?: (config: { length: number; base: number }) => void
): HTMLElement {
  const setUp = document.createElement('section');
  setUp.className = 'setUp';

  const title = document.createElement('h1');
  title.className = 'setUp__title';
  title.textContent = 'Pre-Game SetUp';

  const subTitle = document.createElement('h2');
  subTitle.className = 'setUp__subtitle';
  subTitle.textContent = 'Unique number guessing game.';

  const formSetUp = document.createElement('form');
  formSetUp.className = 'setUp__form';
  formSetUp.noValidate = true;

  const fieldsRow = document.createElement('div');
  fieldsRow.className = 'setUp__fields-row';

  const lengthField = document.createElement('div');
  lengthField.className = 'setUp__field';

  const lengthLabel = document.createElement('label');
  lengthLabel.className = 'setUp__label';
  lengthLabel.htmlFor = 'setUpLength';
  lengthLabel.textContent = 'Number length';

  const lengthWrapper = document.createElement('div');
  lengthWrapper.className = 'setUp__select-wrapper';

  const setUpLength = document.createElement('select');
  setUpLength.className = 'setUp__input setUp__select';
  setUpLength.id = 'setUpLength';
  setUpLength.name = 'length';

  const lengthOptions: HTMLOptionElement[] = LENGTH_OPTIONS.map((value) => {
    const option = document.createElement('option');
    option.value = String(value);
    option.textContent = String(value);
    if (value === 2) option.selected = true;
    setUpLength.appendChild(option);
    return option;
  });

  const lengthArrow = document.createElement('span');
  lengthArrow.className = 'setUp__select-arrow';
  lengthArrow.insertAdjacentHTML('beforeend', arrowDown);

  lengthWrapper.appendChild(setUpLength);
  lengthWrapper.appendChild(lengthArrow);

  lengthField.appendChild(lengthLabel);
  lengthField.appendChild(lengthWrapper);

  const systemField = document.createElement('div');
  systemField.className = 'setUp__field';

  const systemLabel = document.createElement('label');
  systemLabel.className = 'setUp__label';
  systemLabel.htmlFor = 'setUpSystem';
  systemLabel.textContent = 'Numeral system';

  const selectWrapper = document.createElement('div');
  selectWrapper.className = 'setUp__select-wrapper';

  const setUpSystem = document.createElement('select');
  setUpSystem.className = 'setUp__input setUp__select';
  setUpSystem.id = 'setUpSystem';
  setUpSystem.name = 'system';

  SYSTEMS.forEach(({ value, label }) => {
    const option = document.createElement('option');
    option.value = String(value);
    option.textContent = label;
    if (value === 2) option.selected = true;
    setUpSystem.appendChild(option);
  });

  const arrowEl = document.createElement('span');
  arrowEl.className = 'setUp__select-arrow';
  arrowEl.insertAdjacentHTML('beforeend', arrowDown);

  selectWrapper.appendChild(setUpSystem);
  selectWrapper.appendChild(arrowEl);

  systemField.appendChild(systemLabel);
  systemField.appendChild(selectWrapper);

  fieldsRow.appendChild(lengthField);
  fieldsRow.appendChild(systemField);

  const hint = createHint({ length: 2, base: 2 });

  const updateUI = () => {
    const base = parseInt(setUpSystem.value, 10);

    lengthOptions.forEach((option) => {
      const value = parseInt(option.value, 10);
      option.disabled = value > base;
    });

    let length = parseInt(setUpLength.value, 10);
    if (length > base) {
      length = base;
      setUpLength.value = String(length);
    }

    hint.update({ length, base });
  };

  setUpLength.addEventListener('change', updateUI);
  setUpSystem.addEventListener('change', updateUI);
  updateUI();

  const btnStartGame = document.createElement('button');
  btnStartGame.className = 'setUp__submit';
  btnStartGame.type = 'submit';
  btnStartGame.textContent = 'Start Game';

  formSetUp.appendChild(fieldsRow);
  formSetUp.appendChild(hint.root);
  formSetUp.appendChild(btnStartGame);

  formSetUp.addEventListener('submit', (event) => {
    event.preventDefault();

    const length = parseInt(setUpLength.value, 10);
    const base = parseInt(setUpSystem.value, 10);

    if (length < 2 || length > 6) return;
    if (length > base) return;

    onStart?.({ length, base });
  });

  setUp.appendChild(title);
  setUp.appendChild(subTitle);
  setUp.appendChild(formSetUp);

  return setUp;
}
