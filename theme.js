(() => {
  const KEY='rageTheme';
  const saved=localStorage.getItem(KEY);
  const initial=saved || (matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  document.documentElement.dataset.theme=initial;
  function label(btn){btn.textContent=document.documentElement.dataset.theme==='dark'?'☀ CLARO':'☾ ESCURO';btn.setAttribute('aria-label','Alternar modo claro e escuro')}
  function mount(){
    if(document.querySelector('.themeToggle')) return;
    const header=document.querySelector('.top'); if(!header)return;
    const btn=document.createElement('button'); btn.className='themeToggle'; btn.type='button'; label(btn);
    btn.onclick=()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;localStorage.setItem(KEY,next);label(btn)};
    const right=header.querySelector('.cartLink'); right?right.before(btn):header.appendChild(btn);
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',mount):mount();
})();
