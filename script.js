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

  // Skill bar animation au scroll
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.sk-bar').forEach(bar => {
          bar.style.width = bar.getAttribute('data-width');
        });
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.skill-category').forEach(el => barObserver.observe(el));

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
