# nymiria-web

Marketing site and read-only web client for [Nymiria](https://github.com/adaline-hub/Nymiria), shipped on `nymiria.com`.

## Stack

- Next.js 15 App Router, React 19
- Tailwind CSS v4
- Vercel (hosting, preview URLs per PR)

## Local dev

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Structure

- `app/(marketing)/` — landing, download, security, docs
- `app/(webapp)/` — login, channels (read-only, talks to a running Nymiria desktop over Server Mode API on 127.0.0.1:7878)
- `components/marketing/` — hero, install block, feature grid, footer
- `lib/platform.ts` — UA → OS detection for the install CTA

## Phase

This repo is scaffolded inside the Nymiria monorepo under `nymiria-web/` for Phase 12 bring-up. It will be extracted to its own repo (`nymiria-web`) before the first production deploy. See `../PHASE_12_NYMIRIA_WEB.md`.
