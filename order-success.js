const id=new URLSearchParams(location.search).get('id');
if(id)document.getElementById('orderText').textContent='Pedido #'+id+' registrado com sucesso no banco de dados.';
