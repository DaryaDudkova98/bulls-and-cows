import { createNavbar } from './app/components/navbar';

const app = document.getElementById('app');

if (!app) {
  throw new Error('Element app not found in index.html');
}

app.appendChild(createNavbar());
