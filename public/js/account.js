const money = n => '€ ' + Number(n).toFixed(2).replace('.', ',');
(async () => {
  const user = await RageAuth.me(); if (!user) { location.href = 'login.html'; return; }
  document.getElementById('welcome').textContent = `OLÁ, ${user.name.split(' ')[0].toUpperCase()}.`;
  document.getElementById('accountName').textContent = user.name; document.getElementById('accountEmail').textContent = user.email;
  const d = new Date(user.created_at); document.getElementById('accountSince').textContent = Number.isNaN(d.getTime()) ? '—' : d.toLocaleDateString('pt-PT');
  const box = document.querySelector('.loginBox'); const block = document.createElement('div'); block.className = 'ordersBlock'; block.innerHTML = '<small>MEUS PEDIDOS</small><div id="ordersList"><p class="demoNote">CARREGANDO...</p></div>'; box.insertBefore(block, document.getElementById('logoutBtn'));
  try { const r = await fetch('/api/orders'); const data = await r.json(); const el = document.getElementById('ordersList'); if (!r.ok) throw new Error(data.error || 'Erro ao carregar pedidos.'); el.innerHTML = data.orders.length ? data.orders.map(o => `<article class="orderCard"><div><b>PEDIDO #${o.id}</b><span>${new Date(o.created_at).toLocaleDateString('pt-PT')}</span></div><strong>${o.status}</strong><p>${(o.items || []).map(i => `${i.quantity}× ${i.name}`).join('<br>')}</p><b>${money(o.total)}</b></article>`).join('') : '<p class="demoNote">AINDA NÃO EXISTEM PEDIDOS.</p>'; } catch (e) { document.getElementById('ordersList').innerHTML = `<p class="demoNote">${e.message}</p>`; }
  document.getElementById('logoutBtn').onclick = async () => { await fetch('/api/logout', { method: 'POST' }); location.href = 'login.html'; };
})();
