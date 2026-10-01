# RAGE Store + MySQL

## 1. Instalar dependências
`npm.cmd install`

## 2. Criar o banco
Entre no MySQL:
`mysql -u root -p`

Depois execute:
`CREATE DATABASE rage CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
`EXIT;`

## 3. Configurar
Copie `.env.example` para `.env` e informe a senha do MySQL.

## 4. Iniciar
`npm.cmd start`

Teste: http://localhost:3000/api/health
Resposta esperada: {"ok":true,"database":"mysql"}

As tabelas users, sessions, products, orders e order_items são criadas automaticamente.
