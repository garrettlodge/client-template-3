import type { Industry, TemplateKey } from "@/site.config";

/**
 * ═══════════════════════════════════════════════════════════════════════
 *  TEMPLATE REGISTRY (metadata only — no React, safe to import anywhere)
 * ═══════════════════════════════════════════════════════════════════════
 *  One engine, four carefully-crafted skins. Every template consumes the SAME
 *  site.content.json; only the look changes. Switch `template` in
 *  site.content.json to re-skin the whole site. Section COMPONENTS live in
 *  components/templates/registry.tsx; token THEMES live in app/templates.css
 *  (atelier is the :root default in app/globals.css). This file is the
 *  human-facing index used by docs, the gallery, and font/layout resolution.
 *
 *  STATUS: `atelier` is fully built (the Open-Studio-Venice editorial system).
 *  `noir` / `linen` / `gallery` are reserved palette variants that re-skin the
 *  atelier layout via tokens — tasteful starting points, to be crafted into
 *  fully bespoke themes when each is briefed.
 */

export type TemplateMeta = {
  key: TemplateKey;
  name: string;
  /** One-line positioning for the gallery / sales deck. */
  tagline: string;
  description: string;
  /** Best-fit industries (drives the "recommended template" hint per client). */
  industries: Industry[];
  /** Three preview swatches for the gallery chip: [surface, accent, ink]. */
  swatches: [string, string, string];
  /** Human-readable font pairing (actual loading is in lib/fonts.ts). */
  fonts: { display: string; body: string };
};

export const DEFAULT_TEMPLATE: TemplateKey = "atelier";

export const TEMPLATES: Record<TemplateKey, TemplateMeta> = {
  atelier: {
    key: "atelier",
    name: "Atelier",
    tagline: "Architectural, editorial, cinematic.",
    description:
      "Warm ivory, near-black ink, and muted bronze. A light, huge serif over enormous negative space — the site reads like a physical room, not a web page. Built for premium operators who want to feel expensive and calm.",
    industries: [
      "detailer",
      "painter",
      "contractor",
      "landscaper",
      "realestate",
      "salon",
      "attorney",
      "restaurant",
      "other",
    ],
    swatches: ["#f5f2eb", "#b89d74", "#111111"],
    fonts: { display: "Cormorant Garamond", body: "Geist" },
  },
  noir: {
    key: "noir",
    name: "Noir",
    tagline: "The atelier system, after dark.",
    description:
      "RESERVED — a near-black cinematic canvas with the same editorial bones. Currently a token re-skin of atelier; slated for a bespoke pass (dramatic full-bleed media, gold-on-black type).",
    industries: [],
    swatches: ["#151515", "#b89d74", "#f5f2eb"],
    fonts: { display: "Cormorant Garamond", body: "Geist" },
  },
  linen: {
    key: "linen",
    name: "Linen",
    tagline: "Warm, tactile, gallery-soft.",
    description:
      "RESERVED — a warmer, sand-toned variant for hospitality and wellness. Currently a token re-skin of atelier; slated for a bespoke pass.",
    industries: [],
    swatches: ["#efe7d8", "#a9885f", "#1a1714"],
    fonts: { display: "Cormorant Garamond", body: "Geist" },
  },
  gallery: {
    key: "gallery",
    name: "Gallery",
    tagline: "Stark museum white-cube.",
    description:
      "RESERVED — a crisp near-white, high-contrast variant for creative agencies and studios. Currently a token re-skin of atelier; slated for a bespoke pass.",
    industries: [],
    swatches: ["#fbfaf8", "#b89d74", "#0d0d0d"],
    fonts: { display: "Cormorant Garamond", body: "Geist" },
  },
};

export const TEMPLATE_LIST: TemplateMeta[] = Object.values(TEMPLATES);
export const TEMPLATE_KEYS: TemplateKey[] = Object.keys(TEMPLATES) as TemplateKey[];

/** Normalize an unknown/legacy value to a valid template key. */
export function resolveTemplate(key?: string | null): TemplateKey {
  return key && key in TEMPLATES ? (key as TemplateKey) : DEFAULT_TEMPLATE;
}

/** Suggest the best-fit template for an industry (used by the import tooling). */
export function recommendTemplate(industry: Industry): TemplateKey {
  const match = TEMPLATE_LIST.find(
    (t) => t.key !== DEFAULT_TEMPLATE && t.industries.includes(industry)
  );
  return match?.key ?? DEFAULT_TEMPLATE;
}
