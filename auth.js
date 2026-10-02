(() => {
  async function me(){try{const r=await fetch('/api/me',{credentials:'same-origin'});return r.ok?(await r.json()).user:null}catch{return null}}
  async function syncNav(){
    const user=await me();
    document.querySelectorAll('a[href="login.html"]').forEach(a=>{if(user){a.href='account.html';a.textContent='CONTA'}});
    if(user?.role==='admin'){
      document.querySelectorAll('.top nav').forEach(nav=>{if(!nav.querySelector('a[href="admin.html"]')){const a=document.createElement('a');a.href='admin.html';a.textContent='ADMIN';a.className='adminOnly visible';nav.appendChild(a)}})
    }
    return user;
  }
  window.RageAuth={me,syncNav};syncNav();
})();
