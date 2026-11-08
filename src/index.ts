import './styles/style.css';
import { createNavbar } from './app/components/navbar';
import { createFooter } from './app/components/footer';
import { createSetUp } from './app/pages/setUp';
import { createGame } from './app/pages/game';
import { generateSecret } from './generateSecret';
import { startNewGame, type GameState } from './gameState';

const app = document.getElementById('app')!;

const nav = createNavbar();
const main = document.createElement('main');
main.className = 'main';
const footer = createFooter();

app.appendChild(nav);
app.appendChild(main);
app.appendChild(footer);

// --- Состояние текущей игры (одно на всё приложение) ---
let currentGame: GameState | null = null;

// --- Экран настроек ---
function showSetUp() {
  main.innerHTML = '';
  main.appendChild(
    createSetUp((config) => {
      const secret = generateSecret(config.length, config.base);
      currentGame = startNewGame(
        { length: config.length, base: config.base },
        secret,
        10 // maxAttempts — можно вынести в константу
      );
      showGame();
    })
  );
}

// --- Экран игры ---
function showGame() {
  if (!currentGame) {
    showSetUp();
    return;
  }

  main.innerHTML = '';
  main.appendChild(
    createGame(currentGame, () => {
      // Кнопка "Back to SetUp" — возврат в настройки
      currentGame = null;
      showSetUp();
    })
  );
}

// --- Старт приложения ---
showSetUp();
