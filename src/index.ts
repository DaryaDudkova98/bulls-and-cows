import './styles/style.css';

import { createNavbar } from './app/components/navbar';
import { createFooter } from './app/components/footer';
import { createLeaderboard } from './app/components/leaderboard';
import { createSetUp } from './app/pages/setUp';
import { createGame } from './app/pages/game';
import { generateSecret } from './generateSecret';
import { startNewGame, type GameState } from './gameState';

const app = document.getElementById('app')!;

const leaderboard = createLeaderboard();

const nav = createNavbar(
  () => leaderboard.open(),
  () => {
    leaderboard.close();
    showSetUp();
  }
);

const main = document.createElement('main');
main.className = 'main';
const footer = createFooter();

app.appendChild(nav);
app.appendChild(main);
app.appendChild(footer);

app.appendChild(leaderboard.root);

let currentGame: GameState | null = null;

function showSetUp() {
  currentGame = null;
  main.replaceChildren();
  main.appendChild(
    createSetUp((config) => {
      const secret = generateSecret(config.length, config.base);
      currentGame = startNewGame({ length: config.length, base: config.base }, secret, 10);
      showGame();
    })
  );
}

function showGame() {
  if (!currentGame) {
    showSetUp();
    return;
  }

  main.replaceChildren();
  main.appendChild(
    createGame(currentGame, () => {
      currentGame = null;
      showSetUp();
    })
  );
}

showSetUp();
