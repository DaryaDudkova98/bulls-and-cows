import './styles/style.css';
import { createNavbar } from './app/components/navbar';
import { createFooter } from './app/components/footer';
import { createSetUp } from './app/pages/setUp';

const app = document.getElementById('app')!;

const nav = createNavbar();
const main = document.createElement('main');
main.className = 'main';
const footer = createFooter();

app.appendChild(nav);
app.appendChild(main);
app.appendChild(footer);

function showSetUp() {
  main.innerHTML = '';
  main.appendChild(
    createSetUp((config) => {
      console.log('Игра началась с настройками:', config);
      // TODO: показать игровой экран
    })
  );
}

showSetUp();
