/**
 * ═══════════════════════════════════════════════════════════════════════
 *  site.config.ts — TYPES + WIRING.  ✦ EDIT CONTENT IN site.content.json ✦
 * ═══════════════════════════════════════════════════════════════════════
 *  Every editable value — copy, services, reviews, hours, theme, template —
 *  lives in site.content.json. This file declares the SHAPE and re-exports the
 *  JSON as a typed object, so the site stays fully type-checked and Mission
 *  Control can read/write the same file.
 *
 *  To launch a new client:
 *    1. Edit site.content.json (by hand or in Mission Control).
 *    2. Drop real photos in /public; point about.photo, the hero media, and
 *       portfolio item src's at them.
 *  Convention: wrap a word in *asterisks* inside business.tagline to render it
 *  as an italic serif accent in the hero headline.
 */

import content from "./site.content.json";

export type Industry =
  | "plumber"
  | "electrician"
  | "hvac"
  | "roofer"
  | "contractor"
  | "handyman"
  | "painter"
  | "landscaper"
  | "detailer"
  | "dentist"
  | "chiropractor"
  | "restaurant"
  | "realestate"
  | "attorney"
  | "accountant"
  | "insurance"
  | "salon"
  | "other";

/**
 * Visual template (the design system that renders the site). Each key maps to
 * a token theme in app/templates.css (+ optional bespoke section components in
 * components/templates/<key>/). ABSENT → "atelier" (the default Open-Studio
 * editorial look), so a site that doesn't set this still renders correctly.
 * The business CONTENT is identical across every template — flip this one key
 * to re-skin the whole site. See lib/templates.ts.
 */
export type TemplateKey = "atelier" | "noir" | "linen" | "gallery";

export interface SiteConfig {
  business: {
    name: string;
    tagline: string; // hero headline; *word* = italic serif accent
    description: string; // hero paragraph + meta description
    industry: Industry;
    foundedYear: number;
    license: string; // e.g. "Licensed & insured · TN #12345"
    domain: string; // bare domain, no protocol — e.g. "monolith.studio"
  };
  contact: {
    phone: string; // display format, e.g. "(615) 555-0142"
    phoneTel: string; // tel: href, e.g. "+16155550142"
    email: string;
    address: { street: string; city: string; state: string; zip: string };
    hours: { days: string; time: string }[];
    mapsUrl: string; // Google Maps link to the business
    geo?: { lat: number; lng: number }; // optional → schema.org GeoCoordinates
  };
  serviceArea: string[]; // cities/areas served (drives ServiceArea + schema areaServed)
  services: { slug: string; title: string; blurb: string }[];
  reviews: {
    rating: number; // e.g. 4.9
    count: number; // e.g. 312
    source: string; // e.g. "Google"
    sourceUrl: string; // link to the public reviews
    items: { author: string; rating: number; date: string; body: string }[];
  };
  process: { n: string; title: string; body: string }[];
  faq: { q: string; a: string }[];
  about: {
    owner: string;
    ownerRole: string;
    headline?: string; // optional big left-column headline; falls back to a default
    photo: string | null; // /public path (e.g. "/owner.jpg") or null → portrait omitted
    paragraphs: string[];
  };
  social: {
    google?: string;
    facebook?: string;
    instagram?: string;
    yelp?: string;
  };
  /** Optional work gallery (asymmetric editorial layout + lightbox). Items with
   *  no `src` render a labelled placeholder, so the section is photo-ready. */
  portfolio?: {
    title?: string;
    intro?: string;
    items: {
      src?: string | null;
      alt?: string;
      category?: string;
      caption?: string;
    }[];
  };
  /** Optional before/after drag sliders. */
  beforeAfter?: {
    title?: string;
    intro?: string;
    items: {
      before?: string | null;
      after?: string | null;
      label?: string;
      caption?: string;
    }[];
  };
  /** Optional closing call-to-action band copy. Falls back to phone CTA. */
  cta?: {
    heading: string;
    body?: string;
    primary?: string;
    secondary?: string;
  };
  /** Optional cinematic hero media. Degrades gracefully — video → poster still
   *  → quiet typographic hero — so the hero is never broken when a client has
   *  no footage (most won't). */
  hero?: {
    video?: string | null; // /public path or URL to a looping mp4/webm
    poster?: string | null; // still image shown before/instead of video
    overlayOpacity?: number; // 0–1 dark overlay over the media (default 0.15)
  };
  theme: {
    mode: "light" | "dark"; // base palette; bg/fg below override it if set
    accent: string; // hex — single accent color used site-wide
    bg?: string; // optional custom background (hex) — overrides the mode default
    fg?: string; // optional custom text color (hex) — overrides the mode default
  };
  /** Which visual template renders this site. Omit → "atelier" (default). */
  template?: TemplateKey;
  /** Optional page layout — section order, visibility, background tone, and
   *  user-added blocks (id + inline data). Absent = the template's default. */
  sections?: {
    id?: string;
    type: string;
    visible: boolean;
    tone?: string;
    data?: Record<string, unknown>;
  }[];
}

// site.content.json holds the values; the cast applies the precise types.
// Cast through `unknown` because JSON widens unions (industry/theme.mode →
// string) and the optional `sections[]` Mission Control writes infers a shape
// TS won't directly overlap with SiteConfig. The JSON is authored to match.
export const siteConfig: SiteConfig = content as unknown as SiteConfig;

export default siteConfig;
