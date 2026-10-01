(() => {
  async function me() { try { const r = await fetch('/api/me', { credentials: 'same-origin' }); return r.ok ? (await r.json()).user : null; } catch { return null; } }
  async function syncNav() { const user = await me(); document.querySelectorAll('a[href="login.html"]').forEach(a => { if (user) { a.href = 'account.html'; a.textContent = 'CONTA'; } }); return user; }
  window.RageAuth = { me, syncNav };
  syncNav();
})();
