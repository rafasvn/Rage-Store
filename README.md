# RAGE® Store — SILENCE DROP

Loja em Node.js + MySQL com frontend HTML/CSS/JavaScript.

## Estrutura

- `public/pages/`: páginas HTML (URLs públicas continuam `/index.html`, `/login.html`, etc.)
- `public/css/`: folhas de estilo
- `public/js/`: scripts do frontend
- `public/assets/products/`: fotografias e detalhes de produtos
- `public/assets/models/`: modelo 3D da pulseira
- `server.js`: API, autenticação, base de dados e servidor estático
- `.env.example`: modelo de configuração, **sem segredos**

## Executar localmente

1. Instalar Node.js 22.5+ e MySQL.
2. Copiar `.env.example` para `.env` e preencher credenciais locais.
3. `npm install`
4. `npm start`
5. Abrir `http://localhost:3000`.

## Publicar no Railway

Mantém `npm start` como comando de arranque e as variáveis `DB_*`, `ADMIN_EMAIL` e `NODE_ENV=production` no serviço. A estrutura da API e das URLs das páginas foi preservada. Faz backup do MySQL antes de qualquer migração.

## Segurança

Nunca enviar `.env`, passwords, chaves privadas ou a pasta `.git` num ZIP público. Este pacote não inclui esses ficheiros. **Atenção:** se alguma credencial já foi partilhada num ZIP, altera-a no Railway e no MySQL.

## Verificação

Testar páginas, SILENCE DROP (frente/costas/detalhes), joias 3D, login, registo, carrinho, checkout, Admin e API `/api/health` com o MySQL configurado. Não foi realizado teste de integração com base de dados real neste pacote.
