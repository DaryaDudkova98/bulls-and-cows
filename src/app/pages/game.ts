import '../../styles/pages/game.css';

import type { GameState } from '../../gameState';
import { createGameBoard } from '../components/gameBoard';

export function createGame(initialState: GameState, onBack: () => void): HTMLElement {
  const game = document.createElement('section');
  game.className = 'game';

  const title = document.createElement('h1');
  title.className = 'game__title';
  title.textContent = 'Game';

  const stats = document.createElement('div');
  stats.className = 'game__stats';

  const guessBox = document.createElement('div');
  guessBox.className = 'game__stat';
  const guessLabel = document.createElement('span');
  guessLabel.className = 'game__stat-label';
  guessLabel.textContent = 'Guess';
  const guessValue = document.createElement('span');
  guessValue.className = 'game__stat-value';
  guessBox.appendChild(guessLabel);
  guessBox.appendChild(guessValue);

  const bullsBox = document.createElement('div');
  bullsBox.className = 'game__stat';
  const bullsLabel = document.createElement('span');
  bullsLabel.className = 'game__stat-label';
  bullsLabel.textContent = 'Bulls';
  const bullsValue = document.createElement('span');
  bullsValue.className = 'game__stat-value game__stat-value--bulls';
  bullsBox.appendChild(bullsLabel);
  bullsBox.appendChild(bullsValue);

  const cowsBox = document.createElement('div');
  cowsBox.className = 'game__stat';
  const cowsLabel = document.createElement('span');
  cowsLabel.className = 'game__stat-label';
  cowsLabel.textContent = 'Cows';
  const cowsValue = document.createElement('span');
  cowsValue.className = 'game__stat-value game__stat-value--cows';
  cowsBox.appendChild(cowsLabel);
  cowsBox.appendChild(cowsValue);

  stats.appendChild(guessBox);
  stats.appendChild(bullsBox);
  stats.appendChild(cowsBox);

  const updateStats = (state: GameState) => {
    const guessNumber = state.history.length;
    const lastAttempt = state.history[state.history.length - 1];
    const bulls = lastAttempt?.bulls ?? 0;
    const cows = lastAttempt?.cows ?? 0;

    guessValue.textContent = String(guessNumber);
    bullsValue.textContent = String(bulls);
    cowsValue.textContent = String(cows);
  };

  updateStats(initialState);

  const boardWrapper = document.createElement('div');
  boardWrapper.className = 'game__board-wrapper';

  let currentState = initialState;

  const handleStateChange = (newState: GameState) => {
    currentState = newState;
    updateStats(currentState);

    if (currentState.status !== 'playing') {
      boardWrapper.replaceChildren();
      boardWrapper.appendChild(createGameBoard(currentState, handleStateChange, onBack));
    }
  };

  boardWrapper.appendChild(createGameBoard(currentState, handleStateChange, onBack));

  game.appendChild(title);
  game.appendChild(stats);
  game.appendChild(boardWrapper);

  return game;
}
