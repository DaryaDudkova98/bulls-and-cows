import '../../styles/components/leaderboard.css';

import { getTop, type ScoreEntry } from '../../leaderboardStorage';

const SYSTEMS: Array<{ value: number; label: string }> = [
  { value: 2, label: 'Binary' },
  { value: 8, label: 'Octal' },
  { value: 10, label: 'Decimal' },
  { value: 16, label: 'Hexadecimal' },
];

export function createLeaderboard(): {
  root: HTMLElement;
  open: () => void;
  close: () => void;
} {
  const root = document.createElement('div');
  root.className = 'leaderboard';
  root.hidden = true;

  const overlay = document.createElement('div');
  overlay.className = 'leaderboard__overlay';

  const modal = document.createElement('div');
  modal.className = 'leaderboard__modal';

  const header = document.createElement('div');
  header.className = 'leaderboard__header';

  const title = document.createElement('h2');
  title.className = 'leaderboard__title';
  title.textContent = 'Leaderboard';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'leaderboard__close';
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.textContent = '×';

  header.appendChild(title);
  header.appendChild(closeBtn);

  const tabs = document.createElement('div');
  tabs.className = 'leaderboard__tabs';

  const list = document.createElement('ul');
  list.className = 'leaderboard__list';

  const renderList = (base: number) => {
    const entries: ScoreEntry[] = getTop(base, 10);
    const fragment = document.createDocumentFragment();

    if (entries.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'leaderboard__empty';
      empty.textContent = 'No records yet. Play a round to set a record!';
      fragment.appendChild(empty);
    } else {
      const headerRow = document.createElement('li');
      headerRow.className = 'leaderboard__row leaderboard__row--header';
      ['#', 'Name', 'Attempts', 'Time'].forEach((text) => {
        const span = document.createElement('span');
        span.textContent = text;
        headerRow.appendChild(span);
      });
      fragment.appendChild(headerRow);

      entries.forEach((entry, idx) => {
        const row = document.createElement('li');
        row.className = 'leaderboard__row';

        const place = document.createElement('span');
        place.className = 'leaderboard__cell leaderboard__cell--place';
        place.textContent = String(idx + 1);

        const name = document.createElement('span');
        name.className = 'leaderboard__cell leaderboard__cell--name';
        name.textContent = entry.name;

        const attempts = document.createElement('span');
        attempts.className = 'leaderboard__cell';
        attempts.textContent = String(entry.attempts);

        const time = document.createElement('span');
        time.className = 'leaderboard__cell';
        time.textContent = `${entry.time}s`;

        row.appendChild(place);
        row.appendChild(name);
        row.appendChild(attempts);
        row.appendChild(time);
        fragment.appendChild(row);
      });
    }

    list.replaceChildren(fragment);
  };

  let activeBase = 2;
  const tabButtons: HTMLButtonElement[] = SYSTEMS.map((sys) => {
    const btn = document.createElement('button');
    btn.className = 'leaderboard__tab';
    btn.type = 'button';
    btn.textContent = sys.label;
    if (sys.value === activeBase) btn.classList.add('leaderboard__tab--active');

    btn.addEventListener('click', () => {
      activeBase = sys.value;
      tabButtons.forEach((b) => b.classList.remove('leaderboard__tab--active'));
      btn.classList.add('leaderboard__tab--active');
      renderList(activeBase);
    });

    tabs.appendChild(btn);
    return btn;
  });

  const open = () => {
    renderList(activeBase);
    root.hidden = false;
    document.body.classList.add('body--no-scroll');
  };

  const close = () => {
    root.hidden = true;
    document.body.classList.remove('body--no-scroll');
  };

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !root.hidden) close();
  });

  modal.appendChild(header);
  modal.appendChild(tabs);
  modal.appendChild(list);

  root.appendChild(overlay);
  root.appendChild(modal);

  return { root, open, close };
}
