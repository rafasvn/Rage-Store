const money = n => 'R$ ' + Number(n).toFixed(2).replace('.', ',');
const catalogByName = {
  'RAGE T-SHIRT — BLACK':'tee-black', 'RAGE T-SHIRT — WHITE':'tee-white', 'PULSEIRA RAGE R':'bracelet-r001'
};
let cart = [];
try { cart = JSON.parse(localStorage.getItem('rageCart') || '[]'); if (!Array.isArray(cart)) cart = []; } catch { cart = []; }
const itemsEl=document.getElementById('checkoutItems'),totalEl=document.getElementById('checkoutTotal'),form=document.getElementById('checkoutForm'),msg=document.getElementById('checkoutMessage'),buy=document.getElementById('buyBtn');
function render(){
  if(!cart.length){itemsEl.innerHTML='<p class="empty">Seu carrinho está vazio.</p>';totalEl.textContent=money(0);buy.disabled=true;return;}
  itemsEl.innerHTML=cart.map((x,i)=>`<div class="checkoutRow"><span>${x.name}<small>${[x.color?String(x.color).toUpperCase():'',x.size||''].filter(Boolean).join(' · ')}</small></span><b>${money(x.price)}</b></div>`).join('');
  totalEl.textContent=money(cart.reduce((s,x)=>s+Number(x.price||0),0));
}
(async()=>{try{const r=await fetch('/api/me');if(!r.ok){location.href='login.html?next=checkout.html';return}const d=await r.json();document.getElementById('customerName').value=d.user.name||''}catch{msg.textContent='Não foi possível verificar sua sessão.'}})();
form.addEventListener('submit',async e=>{e.preventDefault();if(!cart.length)return;msg.textContent='A REGISTRAR PEDIDO...';buy.disabled=true;
  const items=cart.map(x=>({productId:x.id||catalogByName[x.name],quantity:1,color:x.color||null,size:x.size||null}));
  try{const r=await fetch('/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({customerName:document.getElementById('customerName').value,address:document.getElementById('address').value,city:document.getElementById('city').value,postalCode:document.getElementById('postalCode').value,items})});const d=await r.json();if(r.status===401){location.href='login.html?next=checkout.html';return}if(!r.ok)throw new Error(d.error||'Não foi possível finalizar o pedido.');localStorage.removeItem('rageCart');location.href=`order-success.html?id=${encodeURIComponent(d.order.id)}`;}catch(err){msg.textContent=err.message;buy.disabled=false;}
});
render();
