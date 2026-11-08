import '../../styles/components/navbar.css';

import logoImage from '../../img/bulls-and-cows.png';
import themeLight from '../../img/sun.svg?raw';
import themeDark from '../../img/basil--moon-solid.svg?raw';

const THEME_KEY = 'bulls-and-cows-theme';

export function createNavbar(): HTMLElement {
  const nav = document.createElement('nav');
  nav.className = 'navbar';

  const logoBlock = document.createElement('div');
  logoBlock.className = 'navbar__logo';

  const logo = document.createElement('div');
  logo.className = 'navbar__logo-wrapper';

  const logoImg = document.createElement('img');
  logoImg.className = 'navbar__logo-img';
  logoImg.src = logoImage;
  logoImg.alt = 'Bulls and cows logo';

  const logoBG = document.createElement('div');
  logoBG.className = 'navbar__logo-bg';

  logo.appendChild(logoBG);
  logo.appendChild(logoImg);

  const logoText = document.createElement('span');
  logoText.className = 'navbar__logo-text';
  logoText.textContent = 'bulls & cows';

  logoBlock.appendChild(logo);
  logoBlock.appendChild(logoText);

  const listButtons = document.createElement('div');
  listButtons.className = 'navbar__buttons';

  const btnTheme = document.createElement('button');
  btnTheme.className = 'navbar__button navbar__buttons-theme';
  btnTheme.type = 'button';
  btnTheme.setAttribute('aria-label', 'Toggle theme');

  const isLight = () => document.documentElement.classList.contains('light');

  const updateThemeIcon = () => {
    const iconSvg = isLight() ? themeDark : themeLight;
    btnTheme.replaceChildren();
    btnTheme.insertAdjacentHTML('beforeend', iconSvg);

    const svg = btnTheme.querySelector('svg');
    if (svg) svg.classList.add('navbar__icon');
  };

  const applyTheme = (light: boolean) => {
    document.documentElement.classList.toggle('light', light);
    localStorage.setItem(THEME_KEY, light ? 'light' : 'dark');
    updateThemeIcon();
  };

  const savedTheme = localStorage.getItem(THEME_KEY);
  const startLight = savedTheme === 'light';
  document.documentElement.classList.toggle('light', startLight);
  updateThemeIcon();

  btnTheme.addEventListener('click', () => {
    applyTheme(!isLight());
  });

  const btnLeaderboard = document.createElement('button');
  btnLeaderboard.className = 'navbar__button navbar__buttons-leaderboard';
  btnLeaderboard.type = 'button';
  btnLeaderboard.textContent = 'leaderboard';

  const btnNewGame = document.createElement('button');
  btnNewGame.className = 'navbar__button navbar__buttons-newGame';
  btnNewGame.type = 'button';
  btnNewGame.textContent = 'new game';

  listButtons.appendChild(btnTheme);
  listButtons.appendChild(btnLeaderboard);
  listButtons.appendChild(btnNewGame);

  nav.appendChild(logoBlock);
  nav.appendChild(listButtons);

  return nav;
}
