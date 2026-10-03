(() => {
  const showSplash = document.body?.dataset?.rageSplash === 'true';
  if (!showSplash) return;

  const splash = document.createElement('div');
  splash.className = 'rageSplash';
  splash.setAttribute('aria-hidden', 'true');
  splash.innerHTML = '<div class="rageSplashInner"><span class="rageSplashR">R</span><span class="rageSplashWord">RAGE®</span></div>';
  document.body.prepend(splash);

  requestAnimationFrame(() => splash.classList.add('is-in'));
  window.setTimeout(() => splash.classList.add('is-out'), 720);
  window.setTimeout(() => splash.remove(), 1250);
})();
