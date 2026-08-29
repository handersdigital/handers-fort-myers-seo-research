(function () {
  const body = document.body;
  const toggle = document.querySelector('.hamburger');
  const panel = document.querySelector('.mobile-panel');
  const closeControls = document.querySelectorAll('[data-nav-close]');
  const panelLinks = panel ? panel.querySelectorAll('a, button') : [];

  if (!toggle || !panel) return;

  function setPanelTabState(isOpen) {
    panelLinks.forEach(function (element) {
      element.tabIndex = isOpen ? 0 : -1;
    });
  }

  function openPanel() {
    body.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation');
    panel.setAttribute('aria-hidden', 'false');
    setPanelTabState(true);
    const firstLink = panel.querySelector('a, button');
    if (firstLink) firstLink.focus();
  }

  function closePanel() {
    body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    panel.setAttribute('aria-hidden', 'true');
    setPanelTabState(false);
    toggle.focus();
  }

  toggle.addEventListener('click', function () {
    if (body.classList.contains('nav-open')) {
      closePanel();
    } else {
      openPanel();
    }
  });

  closeControls.forEach(function (control) {
    control.addEventListener('click', closePanel);
  });

  panel.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (body.classList.contains('nav-open')) closePanel();
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && body.classList.contains('nav-open')) {
      closePanel();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 1024 && body.classList.contains('nav-open')) {
      closePanel();
    }
  });

  setPanelTabState(false);
})();
