const products = [
  {
    id:'silence-polo', name:'SILENCE POLO — OFF WHITE', price:189.90, order:1,
    defaultColor:'off-white',
    front:'assets/products/silence/silence-front.png',
    back:'assets/products/silence/silence-back.png',
    lookbook:'assets/products/silence/silence-lookbook.png',
    details:[
      {label:'GOLA',src:'assets/products/silence/silence-collar.png'},
      {label:'EMBLEMA',src:'assets/products/silence/silence-logo.png'},
      {label:'ARTE FRONTAL',src:'assets/products/silence/silence-front-detail.png'},
      {label:'ARTE COSTAS',src:'assets/products/silence/silence-back-detail.png'},
      {label:'MANGA',src:'assets/products/silence/silence-sleeve.png'}
    ]
  }
];
const $=id=>document.getElementById(id), money=v=>new Intl.NumberFormat('pt-PT',{style:'currency',currency:'EUR'}).format(v);
let current=null, view='front', size='M';
function render(list=products){
  $('grid').innerHTML=list.map((p,i)=>`<article class="card silenceCard reveal" data-id="${p.id}" style="--delay:${i*80}ms"><div class="photo"><span class="index">DROP 01</span><img src="${p.front}" alt="${p.name}"><span class="quick">EXPLORAR A PEÇA ↗</span><span class="dropBadge">SILENCE</span></div><div class="cardMeta"><div><small>RAGE® / SILENCE DROP</small><h3>${p.name}</h3></div><p>${money(p.price)}</p></div></article>`).join('');
  document.querySelectorAll('.card').forEach(c=>c.onclick=()=>openProduct(c.dataset.id));
}
function setView(next){view=next;$('mainImg').src=current[next];$('viewLabel').textContent=next==='front'?'FRENTE':'COSTAS';$('frontBtn').classList.toggle('active',next==='front');$('backBtn').classList.toggle('active',next==='back')}
function openProduct(id){
  current=products.find(p=>p.id===id); if(!current)return; size='M';
  $('productName').textContent=current.name;$('price').textContent=money(current.price);setView('front');
  $('detailGrid').innerHTML=current.details.map(d=>`<button class="detailTile" type="button" data-src="${d.src}" data-label="${d.label}"><img src="${d.src}" alt="${d.label}"><span>${d.label}</span></button>`).join('');
  $('lookbookImg').src=current.lookbook;
  document.querySelectorAll('.sizes button').forEach(b=>b.classList.toggle('selected',b.textContent==='M'));
  $('modal').classList.add('open');document.body.classList.add('locked');$('productScroll').scrollTop=0;
  document.querySelectorAll('.detailTile').forEach(b=>b.onclick=()=>{ $('detailLightboxImg').src=b.dataset.src;$('detailLightboxLabel').textContent=b.dataset.label;$('detailLightbox').classList.add('open') });
}
$('frontBtn').onclick=()=>setView('front');$('backBtn').onclick=()=>setView('back');
$('close').onclick=()=>{$('modal').classList.remove('open');document.body.classList.remove('locked')};
$('detailLightboxClose').onclick=()=> $('detailLightbox').classList.remove('open');
$('detailLightbox').onclick=e=>{if(e.target===$('detailLightbox'))$('detailLightbox').classList.remove('open')};
document.querySelectorAll('.sizes button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.sizes button').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');size=b.textContent});
let cart=JSON.parse(localStorage.rageCart||'[]');
function cartRender(){
  $('cartCount').textContent=cart.reduce((n,x)=>n+(x.quantity||1),0);
  $('cartItems').innerHTML=cart.length?cart.map((x,i)=>`<div class="cartRow"><span>${x.name}<small>${[x.color?String(x.color).toUpperCase():'',x.size||''].filter(Boolean).join(' · ')}</small></span><div class="cartActions"><b>${money(x.price*(x.quantity||1))}</b><button class="removeItem" data-index="${i}">REMOVER</button></div></div>`).join(''):'<p class="empty">Seu carrinho está vazio.</p>';
  $('total').textContent=money(cart.reduce((a,b)=>a+b.price*(b.quantity||1),0));localStorage.rageCart=JSON.stringify(cart);
  document.querySelectorAll('.removeItem').forEach(btn=>btn.onclick=()=>{cart.splice(Number(btn.dataset.index),1);cartRender()});
}
$('add').onclick=()=>{cart.push({id:current.id,name:current.name,price:current.price,color:'off-white',size,quantity:1});cartRender();$('drawer').classList.add('open')};
$('cartBtn').onclick=()=>$('drawer').classList.add('open');$('drawerClose').onclick=()=>$('drawer').classList.remove('open');
$('continueShopping').onclick=()=>$('drawer').classList.remove('open');
$('sort').onchange=()=>render(products);
render();cartRender();
(async function syncStoreCatalog(){
 try{const r=await fetch('/api/products',{cache:'no-store'});if(!r.ok)return;const d=await r.json(),active=new Map((d.products||[]).map(p=>[p.id,p]));for(const p of products){const db=active.get(p.id);if(db){p.name=db.name;p.price=Number(db.price)}}const visible=products.filter(p=>active.has(p.id));cart=cart.filter(x=>active.has(x.id));render(visible);cartRender();if(!visible.length)$('grid').innerHTML='<div class="catalogEmpty"><b>SILENCE DROP INDISPONÍVEL</b><span>O drop está temporariamente desativado.</span></div>'}catch{}
})();
