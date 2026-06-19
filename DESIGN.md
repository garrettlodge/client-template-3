# client-template-3 — Design System

> Inspired by **Open Studio Venice**. The feeling: **a physical space, not a web
> page.** Architectural, minimalist, cinematic, luxury, spiritual-but-modern,
> Apple-like restraint. Luxury comes from **negative space and typography**, not
> decoration.

This is the source-of-truth spec. Four carefully-crafted themes share one engine;
**`atelier` is the default and the only fully-built theme today.** `noir`,
`linen`, and `gallery` are reserved palette variants (token re-skins of the
atelier layout) to be built out when each is briefed.

---

## Hard rules (non-negotiable)

These are contracts, not suggestions. They're what makes the template read as
expensive — and what fixes template-2's mistakes.

- **No cards. No `box-shadow`. No blanket `border-radius`.** Only buttons are
  pills (`999px`); everything else is hard-edged (`--radius: 0`).
- **Space is the design.** Sections breathe at `--section-pad`
  (`clamp(7rem, 14vw, 16rem)` ≈ 180–260px on desktop). Hero is 100vh.
- **Nothing bleeds, clips, or collides.** `body { overflow-x: hidden }`, every
  flex/grid text child gets `min-w-0`, headlines use `overflow-wrap: break-word`
  + `text-wrap: balance`, no fixed-height text boxes. Huge `clamp()` headlines
  are stress-tested at every breakpoint.
- **Calm motion only.** 0.8–1.4s fades / reveals / parallax. No bounce, no
  scale, no flash. Reveals are CSS-transition + IntersectionObserver (never
  Framer `whileInView`, which freezes under the preview server's rAF throttle).
- **Editorial, not UI.** Services are rows with hairline dividers (not cards),
  testimonials are pull-quotes, the gallery is asymmetric, About is two-column.

## Color

| Token       | Value     | Use                         |
| ----------- | --------- | --------------------------- |
| `--bg`      | `#F5F2EB` | warm ivory (not white)      |
| `--fg`      | `#111111` | near-black text             |
| `--accent`  | `#B89D74` | muted bronze                |
| `--dark`    | `#151515` | dark sections (hero, reviews, footer) |

Only three colors define a theme; everything else (`--fg-dim`, hairlines,
accent-soft) derives from them via `color-mix`. A client can recolor the whole
site from `theme.accent` (+ optional `theme.bg`/`theme.fg`) in `site.content.json`.

## Type

- **Display:** Cormorant Garamond — light (300), high-contrast editorial serif
  (the free analog to Canela / Editorial New).
- **Body / mono:** Geist / Geist Mono (self-hosted via the `geist` package).
- **Scale:** hero `clamp(2.75rem, 8.5vw, 8.75rem)` weight 300, line-height 0.9;
  section headings `clamp(2.25rem, 5vw, 4.5rem)`; body 18–22px (`.lead`); labels
  12px uppercase, `0.15em` tracking (`.text-eyebrow`).
  > Note: the hero floor is tuned below the brief's literal 72px so it can't
  > overflow on phones — it still reaches 140px on desktop.

## Sections (atelier default layout)

`hero → services → about → work → reviews(dark) → faq → contact`, then a dark
footer. Mirrors the nav (Home / About / Services / Work / Reviews / Contact).

- **Nav** — floats transparent over the dark hero (light text); on scroll gains
  glass blur + a hairline and flips to ink.
- **Hero** — 100vh; cinematic looping video → poster still → a crafted dark
  backdrop (never a flat ivory box). `rgba(0,0,0,0.15)` overlay, huge centered
  headline (`*word*` = bronze italic accent), ≤30-word paragraph.
- **Services** — numbered editorial rows + hairline dividers + `→`.
- **About** — two columns: big headline left, story (≤650px) right, owner signature.
- **Work** — asymmetric alternating gallery (large / small / full-width rhythm),
  placeholders when photos are absent.
- **Reviews** — rotating magazine pull-quote on a dark band, name underneath.
- **FAQ** — quiet native `<details>` rows, bronze `+` → `×`.
- **Contact** — statement + CTAs left, details (phone/email/address/hours) right.

## Architecture — one engine, four skins

```
site.content.json   ← all editable content (Mission Control reads/writes this)
site.config.ts      ← types only (SiteConfig, TemplateKey)
app/globals.css     ← atelier tokens + editorial type + buttons + reveals  (= the default theme)
app/templates.css   ← :root[data-template="noir|linen|gallery"] palette re-skins
lib/templates.ts    ← TEMPLATES registry metadata (4 keys, atelier default)
lib/fonts.ts        ← Cormorant + Geist, mapped per template
components/templates/registry.tsx  ← section/chrome resolution + default layout
components/*         ← the atelier section components (the base set)
```

`layout.tsx` sets `data-template` + the font vars on `<html>`. `PageSections`
renders the layout (Mission Control's `sections[]` when present, else the
template default). `getSectionComponent(template, type)` resolves a template's
component, falling back to the atelier base — so the reserved themes render a
complete site from tokens alone.

### Adding a bespoke theme

1. Add its palette block in `app/templates.css` (`:root[data-template="x"]`).
2. (Optional) Build bespoke sections under `components/templates/x/` and register
   them in `SECTION_OVERRIDES` in `registry.tsx`. Unregistered sections inherit
   the atelier base.
3. (Optional) Give it its own fonts in `lib/fonts.ts` and a custom layout in
   `LAYOUT_OVERRIDES`.

## New-client spin-up

Same flow as the other templates (see RECS-Client-Pitch-Playbook): "Use this
template" → edit only `site.content.json` (or do it in Mission Control) → drop
photos in `/public` and point `hero.video`/`hero.poster`, `about.photo`, and
`portfolio.items[].src` at them → deploy on Netlify. The visual language stays
identical across industries; only photos, colors, copy, and services change.
