(async()=>{
  const existing=await RageAuth.me(); if(existing){ const next=new URLSearchParams(location.search).get('next'); location.href=(next && /^[a-z0-9._-]+\.html$/i.test(next))?next:'account.html'; return; }
  const form=document.getElementById('loginForm'), msg=document.getElementById('loginMessage'), btn=form.querySelector('button[type=submit]');
  form.addEventListener('submit',async e=>{ e.preventDefault(); msg.textContent='ENTRANDO...'; btn.disabled=true;
    const email=form.elements.email.value.trim(), password=form.elements.password.value;
    try{ const r=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})}); const d=await r.json(); if(!r.ok) throw new Error(d.error||'Não foi possível entrar.'); msg.textContent='LOGIN CONCLUÍDO.'; const next=new URLSearchParams(location.search).get('next'); location.href=(next && /^[a-z0-9._-]+\.html$/i.test(next))?next:'account.html'; }
    catch(err){ msg.textContent=String(err.message).toUpperCase(); btn.disabled=false; }
  });
})();
