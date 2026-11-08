import '../../styles/components/gameBoard.css';

import type { GameState } from '../../gameState';
import { isValidGuess } from '../../isValidGuess';
import { addAttempt } from '../../gameState';
import { createHint } from './hint';
import { createAttemptHistory } from './attemptHistory';

export function createGameBoard(
  initialState: GameState,
  onStateChange: (newState: GameState) => void,
  onBack: () => void
): HTMLElement {
  const board = document.createElement('div');
  board.className = 'game-board';

  let state = initialState;

  const playColumn = document.createElement('div');
  playColumn.className = 'game-board__play';

  const hint = createHint({
    length: state.settings.length,
    base: state.settings.base,
  });

  const inputRow = document.createElement('div');
  inputRow.className = 'game-board__input-row';

  const input = document.createElement('input');
  input.className = 'game-board__input';
  input.type = 'text';
  input.maxLength = state.settings.length;
  input.placeholder = `Enter ${state.settings.length} digits`;
  input.autocomplete = 'off';

  const checkBtn = document.createElement('button');
  checkBtn.className = 'game-board__check';
  checkBtn.type = 'button';
  checkBtn.textContent = 'Check';

  inputRow.appendChild(input);
  inputRow.appendChild(checkBtn);

  const message = document.createElement('p');
  message.className = 'game-board__message';
  message.hidden = true;

  const backBtn = document.createElement('button');
  backBtn.className = 'game-board__back';
  backBtn.type = 'button';
  backBtn.textContent = 'Back to SetUp';
  backBtn.addEventListener('click', onBack);

  playColumn.appendChild(hint.root);
  playColumn.appendChild(inputRow);
  playColumn.appendChild(message);
  playColumn.appendChild(backBtn);

  const historyColumn = document.createElement('div');
  historyColumn.className = 'game-board__history-column';

  const historyTitle = document.createElement('h2');
  historyTitle.className = 'game-board__history-title';
  historyTitle.textContent = 'History guess';

  const historyScroll = document.createElement('div');
  historyScroll.className = 'game-board__history-scroll';

  const history = createAttemptHistory(state.history);
  historyScroll.appendChild(history.root);

  historyColumn.appendChild(historyTitle);
  historyColumn.appendChild(historyScroll);

  const handleCheck = () => {
    const guess = input.value.trim().toLowerCase();

    if (!isValidGuess(guess, state.settings.length, state.settings.base)) {
      message.textContent = `Enter ${state.settings.length} unique valid digits`;
      message.classList.add('game-board__message--error');
      message.classList.remove('game-board__message--success');
      message.hidden = false;
      input.focus();
      return;
    }

    message.hidden = true;
    message.classList.remove('game-board__message--error', 'game-board__message--success');

    const newState = addAttempt(state, guess);
    state = newState;

    input.value = '';
    history.update(newState.history);
    onStateChange(newState);

    if (newState.status === 'won') {
      message.textContent = `You won in ${newState.history.length} attempts!`;
      message.classList.add('game-board__message--success');
      message.hidden = false;
      input.disabled = true;
      checkBtn.disabled = true;
    } else if (newState.status === 'lost') {
      message.textContent = `You lost. The secret was: ${newState.secret}`;
      message.classList.add('game-board__message--error');
      message.hidden = false;
      input.disabled = true;
      checkBtn.disabled = true;
    }
  };

  checkBtn.addEventListener('click', handleCheck);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCheck();
    }
  });

  board.appendChild(playColumn);
  board.appendChild(historyColumn);

  return board;
}
