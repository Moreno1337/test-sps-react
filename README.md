# SPS Users - Front-end React (SPA)

Cliente React para o desafio: login com JWT e CRUD de usuários consumindo a API Node/Express. Foco em UX simples, rotas protegidas e padrões de código.

## ✨ Principais recursos

Autenticação: página de login (React Hook Form + Zod) salvando token no localStorage.

Rotas protegidas: RequireAuth com checagem de expiração do JWT.

CRUD de usuários:

Lista com MUI DataGrid.

Criar e Editar (formularios com validação).

Excluir com Dialog de confirmação.

Layout com AppBar.

HTTP padronizado com Axios:

Interceptor adiciona Authorization: Bearer <token>.

Interceptor “desembrulha” res.data.

Em 401, limpa token e redireciona para /login (exceto no login).

Integração com Swagger da API via atalho.

Rotas:

Pública: /login

Protegidas (filhas do layout): / (Home), /users, /users/new, /users/:userId

## 🧰 Stack

React, React Router

MUI (Material UI) + ícones + DataGrid

Axios (interceptors)

React Hook Form + Zod (validação)

## ⚙️ Configuração & Execução

### 1) Pré-requisitos

Node.js LTS

API rodando em http://localhost:3000 (ou ajuste o .env abaixo)

### 2) Instalar deps

npm install

### 3) Rodar em desenvolvimento
   
npm start

→ abre http://localhost:3001

## 🔐 Autenticação (como funciona)

Login (/login):

Envia POST /auth/login (sem header Authorization) usando api.post(..., { auth:false }).

Salva token no localStorage e redireciona para a rota original ou /users.

Rotas protegidas:

RequireAuth verifica existência e expiração do token (decodificando exp).

Axios adiciona Bearer automaticamente em todas as requisições protegidas.

Em 401, Axios limpa token e redireciona para /login.

## 👩‍💻 Páginas

SignIn

Form com MUI + RHF + Zod (email, password).

Mostra erros de validação e servidor (Alert com Collapse).

Em sucesso: salva token e navega.

Users (lista)

DataGrid com colunas name, email, type e ações (Editar/Excluir).

Recarregar (ícone), estados de loading e erro.

Excluir com Dialog de confirmação.

UserCreate

Form com name, email, type (admin/user) e password.

Em sucesso: retorna para /users.

UserEdit

Carrega o usuário (via loader + filtro por id; pronto para trocar por GET /users/:id quando disponível).

type normalizado ("admin"/"user") e controlado via Controller.

password opcional: em branco = manter a atual.

Em sucesso: retorna para /users.

## 🧪 Teste manual rápido

Acesse /login, entre com admin@sps.com / admin123.

Vá para Usuários:

Crie um novo usuário.

Edite nome/tipo/senha (teste re-login com a nova senha).

Exclua e confirme que some da lista.

Remova o token do localStorage e tente abrir /users → deve ir para /login.

Tente criar um usuário com e-mail duplicado → alerta de erro.

## 🧱 Padrões e decisões

Axios com interceptors para evitar repetir baseURL/headers/401 handling.

Formulários com RHF+Zod (menos boilerplate, validação declarativa).

RequireAuth faz pré-cheque local de expiração para evitar “flash” de 401.

Services em src/services/* (API coesa, separada dos componentes).

## 🔮 Melhorias sugeridas

Busca e paginação na lista (server-side).

Toasts globais (sucesso/erro) com Snackbar provider.

RBAC visual (esconder ações para não-admin).

GET /users/:id no back e ajuste do userLoader.

Testes (RTL/Cypress).

Qualquer dúvida, abra uma issue ou me chame. Bom review! 🚀
