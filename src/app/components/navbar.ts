import '../../styles/components/navbar.css';

import logoImage from '../../img/bulls-and-cows.png';
import themeLight from '../../img/sun.svg?raw';

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

  btnTheme.insertAdjacentHTML('beforeend', themeLight);

  const svgIcon = btnTheme.querySelector('svg');
  if (svgIcon) {
    svgIcon.classList.add('navbar__icon');
  }

  const btnLeaderboard = document.createElement('button');
  btnLeaderboard.className = 'navbar__button navbar__buttons-leaderboard';
  btnLeaderboard.textContent = 'leaderboard';

  const btnNewGame = document.createElement('button');
  btnNewGame.className = 'navbar__button navbar__buttons-newGame';
  btnNewGame.textContent = 'new game';

  listButtons.appendChild(btnTheme);
  listButtons.appendChild(btnLeaderboard);
  listButtons.appendChild(btnNewGame);

  nav.appendChild(logoBlock);
  nav.appendChild(listButtons);

  return nav;
}
