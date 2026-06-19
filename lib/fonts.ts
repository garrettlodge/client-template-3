import { Cormorant_Garamond } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import type { TemplateKey } from "@/site.config";
import { DEFAULT_TEMPLATE } from "@/lib/templates";

/**
 * ═══════════════════════════════════════════════════════════════════════
 *  PER-TEMPLATE FONTS — client-template-3
 * ═══════════════════════════════════════════════════════════════════════
 *  Display serif: Cormorant Garamond — light, high-contrast, editorial; the
 *    closest free, next/font-hosted analog to Canela / Editorial New. Loaded
 *    at the weights the atelier system uses (300 for the huge hero, 400–600
 *    elsewhere) plus italics for the *accent* word in the tagline.
 *  Body + mono: Geist / Geist Mono (Vercel), self-hosted via the `geist`
 *    package — a clean neo-grotesque in the Suisse / Neue-Haas lane.
 *
 *  All four themes share this trio today. layout.tsx applies the active
 *  template's font classes to <html> and maps the generic
 *  --font-display / --font-sans / --font-mono tokens onto these families, so
 *  components keep one stable token contract. Bespoke per-theme pairings can
 *  layer on later exactly like the section overrides do.
 */

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

type Family = { cls: string; varName: string };
const F: Record<string, Family> = {
  cormorant: { cls: cormorant.variable, varName: "--font-cormorant" },
  geistSans: { cls: GeistSans.variable, varName: "--font-geist-sans" },
  geistMono: { cls: GeistMono.variable, varName: "--font-geist-mono" },
};

type Trio = { display: keyof typeof F; sans: keyof typeof F; mono: keyof typeof F };
const SHARED: Trio = { display: "cormorant", sans: "geistSans", mono: "geistMono" };

const TEMPLATE_FONTS: Record<TemplateKey, Trio> = {
  atelier: SHARED,
  noir: SHARED,
  linen: SHARED,
  gallery: SHARED,
};

/** Space-joined next/font className list to apply to <html> for a template. */
export function getTemplateFontClass(key: TemplateKey): string {
  const t = TEMPLATE_FONTS[key] ?? TEMPLATE_FONTS[DEFAULT_TEMPLATE];
  return [F[t.display].cls, F[t.sans].cls, F[t.mono].cls].join(" ");
}

/** Inline CSS-var map wiring the generic tokens to the template's families. */
export function getTemplateFontVars(key: TemplateKey): Record<string, string> {
  const t = TEMPLATE_FONTS[key] ?? TEMPLATE_FONTS[DEFAULT_TEMPLATE];
  return {
    "--font-display": `var(${F[t.display].varName})`,
    "--font-sans": `var(${F[t.sans].varName})`,
    "--font-mono": `var(${F[t.mono].varName})`,
  };
}
