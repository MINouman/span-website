# SPAN website

Website for SPAN Engineering and Construction Ltd. The build spec is `span-website-design-system.md`; read it first.

Stack: Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Payload CMS 3 (inside the same app), PostgreSQL.

## Run locally

Requires Node 22 (`nvm use` reads `.nvmrc`) and PostgreSQL.

```sh
createdb span
cp .env.example .env        # then set PAYLOAD_SECRET (openssl rand -hex 32)
npm install
npm run dev                 # site on http://localhost:3000, admin on /admin
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm run generate:types` | Regenerate `src/payload-types.ts` after changing collections or globals |
| `npm run generate:importmap` | Regenerate the admin import map after adding custom admin components |

## Where things live

- `src/styles/tokens.css`: design tokens (colors, type sizes, radius, layout). Mapped into Tailwind in `src/app/(frontend)/globals.css`.
- `src/app/(frontend)/[locale]/`: public pages. English URLs have no prefix; Bangla URLs start with `/bn`. Routing is in `src/proxy.ts`.
- `src/app/(payload)/`: Payload admin and API. Files marked "generated" are owned by Payload.
- `src/collections/`, `src/globals/`: CMS content model.
- `src/components/`: UI, grouped by layout, ui, project, gallery, forms, sections, seo.
- `src/lib/site.ts`: **placeholder** contact details, replaced by the SiteSettings global in step 2.

## Content rule

Anything marked `[CLIENT]` is a placeholder for real content from the client. Never invent numbers, names, approvals or testimonials.
