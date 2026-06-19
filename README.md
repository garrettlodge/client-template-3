# client-template-3 — the **Atelier** system

A premium, editorial, multi-theme website template for local businesses — built
to feel like an expensive physical space, not a web page. Config-driven,
Mission-Control editable, deploys on Netlify.

Inspired by Open Studio Venice: architectural, minimalist, cinematic. Luxury
from **negative space and typography**, never from cards, shadows, or rounded
boxes. See **[DESIGN.md](./DESIGN.md)** for the full design spec and rules.

## Themes

One engine, four skins (flip `template` in `site.content.json`):

| Key       | Status            | Look                                   |
| --------- | ----------------- | -------------------------------------- |
| `atelier` | ✅ **built**       | Warm ivory · near-black · bronze. The default. |
| `noir`    | reserved (re-skin) | Near-black cinematic                   |
| `linen`   | reserved (re-skin) | Warm, sand-toned, gallery-soft         |
| `gallery` | reserved (re-skin) | Stark near-white, white-cube           |

The reserved three are token re-skins of the atelier layout today — tasteful
starting points to be built into fully bespoke themes when briefed.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind · Cormorant Garamond (display) +
Geist / Geist Mono (body) via `next/font` + the `geist` package · IntersectionObserver
CSS reveals + Lenis smooth scroll. Deploys via `@netlify/plugin-nextjs` (never
set `output: "standalone"`).

## Develop

```bash
npm install        # if node_modules is missing
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build      # production build
```

> Machine note: if `npm install` fails on a cache permission error, use a
> scratch cache: `npm install --cache /tmp/npm-cache --legacy-peer-deps`.

## Launch a new client

1. **Use this template** on GitHub → new repo (Settings → "Template repository"
   must be on).
2. Edit only **`site.content.json`** — by hand or in **Mission Control**
   (auto-detected as a config-driven site). It's the single source of all copy,
   services, reviews, hours, theme, and `template`.
3. Drop real photos in `/public` and point `hero.video` / `hero.poster`,
   `about.photo`, and `portfolio.items[].src` at them. With no hero media the
   hero falls back to a crafted dark backdrop, so it's never broken.
4. Push → import on Netlify (`netlify.toml` is preconfigured) → add the domain.

Optional: paste a Google Business Profile into a JSON file and run
`npm run import:google` to scaffold `site.content.json`.

## Editing model

Every section reads content through `useContent()` (`components/ContentProvider`),
so Mission Control's preview (`?mcpreview=1`) streams a live draft over
`postMessage` and `[data-mc-field]` elements are click-to-edit. The
`site.content.json` contract is identical to the other client templates, so the
same CMS drives all of them.
