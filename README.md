# Bom Dia, Meu Fazendeiro

Mensagens automatizadas de bom dia para fazendeiros via WhatsApp (UltraMsg),
armazenadas no Supabase, agendadas via Vercel Cron.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Supabase (Postgres + Auth)
- UltraMsg (WhatsApp)
- Vercel Cron

## Setup local

```bash
cp .env.example .env.local
# preencha as variáveis
npm install
npm run dev
```

A aplicação fica em http://localhost:3000.

## Cron

Configurado em `vercel.json` para rodar diariamente às 09:00 UTC
(`/api/cron/bom-dia`). A rota exige o header
`Authorization: Bearer $CRON_SECRET`, definido automaticamente pela Vercel.

## Estrutura

```
src/
  app/                     # App Router (UI + API routes)
    api/
      cron/bom-dia/        # job diário
      webhook/ultramsg/    # recebe mensagens do WhatsApp
  lib/
    supabase/              # client / server / admin
    ultramsg/              # envio de mensagens
  types/database.ts        # tipos do schema Supabase
```
