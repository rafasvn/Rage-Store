(async () => {
  const existing = await RageAuth.me(); if (existing) { location.href = 'account.html'; return; }
  const form = document.getElementById('registerForm'), msg = document.getElementById('registerMessage'), btn = form.querySelector('button[type=submit]');
  form.addEventListener('submit', async e => {
    e.preventDefault(); const name = form.elements.name.value.trim(), email = form.elements.email.value.trim(), password = form.elements.password.value, confirm = form.elements.confirmPassword.value;
    if (password !== confirm) { msg.textContent = 'AS SENHAS NÃO COINCIDEM.'; return; }
    msg.textContent = 'CRIANDO CONTA...'; btn.disabled = true;
    try { const r = await fetch('/api/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) }); const d = await r.json(); if (!r.ok) throw new Error(d.error || 'Não foi possível criar a conta.'); msg.textContent = 'CONTA CRIADA.'; location.href = 'account.html'; }
    catch (err) { msg.textContent = String(err.message).toUpperCase(); btn.disabled = false; }
  });
})();
