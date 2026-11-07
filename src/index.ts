import { createNavbar } from './app/components/navbar';
import { createFooter } from './app/components/footer';

const app = document.getElementById('app');

if (!app) {
  throw new Error('Element app not found in index.html');
}

app.appendChild(createNavbar());
app.appendChild(createFooter());
