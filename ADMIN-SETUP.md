# RAGE Admin + Tema

## Tornar uma conta administrador
1. Crie/tenha uma conta normal no site com o e-mail que será do administrador.
2. No Railway > Rage-Store > Variables, adicione:
   ADMIN_EMAIL=seu-email-da-conta
3. Faça Redeploy. Ao iniciar, o servidor promove essa conta para `admin`.
4. Entre novamente na conta e abra `/admin.html` (o link ADMIN também aparece na navegação para admins).

No ambiente local, coloque `ADMIN_EMAIL` no `.env`.

## Painel
- Dashboard: utilizadores, produtos ativos, pedidos e faturação registada.
- Produtos: editar nome, preço, tipo e ativar/desativar.
- Pedidos: alterar status.
- Utilizadores: consultar contas e função.

## Tema
O botão CLARO/ESCURO aparece no cabeçalho. A preferência fica guardada em `localStorage`.

## Produção
Nunca envie `.env` ao GitHub. O Railway deve continuar com as credenciais em Variables.
