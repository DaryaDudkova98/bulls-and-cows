import '../../styles/components/footer.css';

import rsSchoolLogo from '../../img/rs_school_js.png';
import githubIcon from '../../img/github.svg?raw';
import discordIcon from '../../img/discord.svg?raw';

export function createFooter(): HTMLElement {
  const footer = document.createElement('footer');
  footer.className = 'footer';

  const footerLogo = document.createElement('a');
  footerLogo.className = 'footer__logo';
  footerLogo.href = 'https://rs.school/';
  footerLogo.target = '_blank';
  footerLogo.rel = 'noopener noreferrer';

  const logoImg = document.createElement('img');
  logoImg.src = rsSchoolLogo;
  logoImg.alt = 'RS School';
  logoImg.className = 'footer__logo-img';

  footerLogo.appendChild(logoImg);

  const copyright = document.createElement('span');
  copyright.className = 'footer__copyright';
  copyright.textContent = '© 2026 Bulls & Cows';

  const socials = document.createElement('div');
  socials.className = 'footer__socials';

  const githubLink = document.createElement('a');
  githubLink.className = 'footer__link footer__link--github';
  githubLink.href = 'https://github.com/DaryaDudkova98';
  githubLink.target = '_blank';
  githubLink.rel = 'noopener noreferrer';
  githubLink.setAttribute('aria-label', 'GitHub');
  githubLink.insertAdjacentHTML('beforeend', githubIcon);

  const discordLink = document.createElement('a');
  discordLink.className = 'footer__link footer__link--discord';
  discordLink.href = 'https://discord.com/users/DaryaDudkova98';
  discordLink.target = '_blank';
  discordLink.rel = 'noopener noreferrer';
  discordLink.setAttribute('aria-label', 'Discord');
  discordLink.insertAdjacentHTML('beforeend', discordIcon);

  socials.appendChild(githubLink);
  socials.appendChild(discordLink);

  footer.appendChild(footerLogo);
  footer.appendChild(copyright);
  footer.appendChild(socials);

  return footer;
}
