// ── LANGUAGE TOGGLE ──
function setLang(lang) {
  // Mettre à jour les boutons
  document.getElementById('btnFr').classList.toggle('active', lang === 'fr');
  document.getElementById('btnEn').classList.toggle('active', lang === 'en');

  // Montrer/cacher tous les éléments .fr et .en
  document.querySelectorAll('.fr').forEach(el => {
    el.style.display = 'none';
  });
  document.querySelectorAll('.en').forEach(el => {
    el.style.display = 'none';
  });

  // Afficher la bonne langue
  document.querySelectorAll('.' + lang).forEach(el => {
    // Détecter le display naturel selon le tag
    const tag = el.tagName.toLowerCase();
    const inlineTags = ['span', 'strong', 'em', 'b', 'i', 'label'];
    const inlineBlockTags = ['a'];
    if (inlineTags.includes(tag)) el.style.display = 'inline';
    else if (inlineBlockTags.includes(tag)) el.style.display = 'inline-block';
    else el.style.display = 'block';
  });
}

// ── INIT AU CHARGEMENT ──
document.addEventListener('DOMContentLoaded', () => {

  // Appliquer la langue française par défaut
  setLang('fr');

  // Forcer l'affichage de tous les éléments .reveal
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.add('visible');
  });

  // Email de contact — obfusqué (anti-scraper) et décodé côté client,
  // indépendant de tout hébergeur (ne dépend plus de Cloudflare Email Protection)
  const emailLink = document.getElementById('emailLink');
  if (emailLink) {
    const email = emailLink.dataset.emailRev.split('').reverse().join('');
    emailLink.href = 'mailto:' + email;
    document.getElementById('emailText').textContent = email;
  }

  // Menu burger mobile
  const navBurger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');

  if (navBurger && navLinks) {
    navBurger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navBurger.classList.toggle('active', isOpen);
      navBurger.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navBurger.classList.remove('active');
        navBurger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Formulaire de contact → ouvre le client mail avec le message pré-rempli
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const messageFr = document.getElementById('contactMessageFr');
      const messageEn = document.getElementById('contactMessageEn');
      const activeMessage = getComputedStyle(messageFr).display !== 'none' ? messageFr : messageEn;
      const message = activeMessage.value.trim();

      if (!message) {
        activeMessage.focus();
        return;
      }

      const subject = `Contact portfolio — ${name}`;
      const body = `${message}\n\n—\n${name}\n${email}`;
      window.location.href = `mailto:lucas@les-z.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  // Onglets projets
  const tabs = document.querySelectorAll('.project-tab');
  const panels = document.querySelectorAll('.project-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      panels.forEach(p => p.classList.remove('active'));
      const activePanel = document.querySelector(`.project-panel[data-panel="${target}"]`);
      if (activePanel) activePanel.classList.add('active');
    });
  });

});
