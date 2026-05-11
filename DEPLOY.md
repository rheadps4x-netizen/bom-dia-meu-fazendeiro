# Deploy do Projeto Alpha na Vercel

## Requisitos

- Node.js 18 ou superior
- Conta no GitHub
- Conta na Vercel
- Link do checkout PIX da Cakto

## Variável obrigatória

Configure em produção:

```env
NEXT_PUBLIC_CHECKOUT_URL=https://seu-link-da-cakto-aqui
```

Essa URL é usada no botão final do checkout. O quiz adiciona parâmetros de rastreamento na URL, como idade, objetivo e dados preenchidos.

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse:

```txt
http://localhost:3000
```

## Build de produção

```bash
npm run build
```

## Deploy na Vercel

1. Suba o projeto para um repositório no GitHub.
2. Acesse https://vercel.com.
3. Clique em `Add New...` e depois `Project`.
4. Selecione o repositório do Projeto Alpha.
5. Framework: `Next.js`.
6. Build Command: `npm run build`.
7. Install Command: `npm install`.
8. Em `Environment Variables`, adicione:

```env
NEXT_PUBLIC_CHECKOUT_URL=https://seu-link-da-cakto-aqui
```

9. Clique em `Deploy`.

## Atualizar depois

1. Edite os arquivos localmente.
2. Rode:

```bash
npm run build
```

3. Envie para o GitHub:

```bash
git add .
git commit -m "Atualiza Projeto Alpha"
git push
```

A Vercel fará um novo deploy automaticamente.
