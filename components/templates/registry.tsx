"use client";

import type { ComponentType } from "react";
import type { TemplateKey } from "@/site.config";

// ── base (atelier) chrome + sections — also the fallback for every theme ──
import Nav from "../Nav";
import Footer from "../Footer";
import Hero from "../Hero";
import Services from "../Services";
import About from "../About";
import Portfolio from "../Portfolio";
import Reviews from "../Reviews";
import FAQ from "../FAQ";
import Contact from "../Contact";
import Process from "../Process";
import ServiceArea from "../ServiceArea";
import BeforeAfter from "../BeforeAfter";
import CTA from "../CTA";
import TrustBar from "../TrustBar";

// ── user-content blocks (theme-agnostic; always available) ──
import TextBlock from "../blocks/TextBlock";
import ImageBlock from "../blocks/ImageBlock";
import TextImageBlock from "../blocks/TextImageBlock";
import ButtonBlock from "../blocks/ButtonBlock";
import ColumnsBlock from "../blocks/ColumnsBlock";
import GalleryBlock from "../blocks/GalleryBlock";
import VideoBlock from "../blocks/VideoBlock";
import QuoteBlock from "../blocks/QuoteBlock";

/**
 * ═══════════════════════════════════════════════════════════════════════
 *  SECTION + CHROME REGISTRY  (one engine, four skins)
 * ═══════════════════════════════════════════════════════════════════════
 *  getSectionComponent / getChrome resolve a section type to a component.
 *  Atelier IS the base set, so noir / linen / gallery (token re-skins) inherit
 *  every section automatically. When a theme earns a bespoke section, build it
 *  under components/templates/<key>/ and register it in SECTION_OVERRIDES.
 */

export type SectionProps = {
  section?: { id?: string; type?: string; data?: Record<string, unknown> };
  index?: number;
};
export type SectionMap = Record<string, ComponentType<SectionProps>>;
export type Chrome = { Nav: ComponentType; Footer: ComponentType };

const BLOCKS: SectionMap = {
  textBlock: TextBlock,
  imageBlock: ImageBlock,
  textImageBlock: TextImageBlock,
  buttonBlock: ButtonBlock,
  columnsBlock: ColumnsBlock,
  galleryBlock: GalleryBlock,
  videoBlock: VideoBlock,
  quoteBlock: QuoteBlock,
};

const BASE_SECTIONS: SectionMap = {
  hero: Hero,
  services: Services,
  about: About,
  portfolio: Portfolio,
  reviews: Reviews,
  faq: FAQ,
  contact: Contact,
  process: Process,
  serviceArea: ServiceArea,
  beforeAfter: BeforeAfter,
  cta: CTA,
  trustbar: TrustBar,
};

const BASE_CHROME: Chrome = { Nav, Footer };

// Empty for now — atelier is the base; the 3 reserved themes inherit it whole.
const SECTION_OVERRIDES: Partial<Record<TemplateKey, SectionMap>> = {};
const CHROME_OVERRIDES: Partial<Record<TemplateKey, Partial<Chrome>>> = {};

export function getSectionComponent(
  template: TemplateKey,
  type: string
): ComponentType<SectionProps> | null {
  const overrides = SECTION_OVERRIDES[template] ?? {};
  return overrides[type] ?? BASE_SECTIONS[type] ?? BLOCKS[type] ?? null;
}

export function getChrome(template: TemplateKey): Chrome {
  const o = CHROME_OVERRIDES[template] ?? {};
  return { Nav: o.Nav ?? BASE_CHROME.Nav, Footer: o.Footer ?? BASE_CHROME.Footer };
}

// ── Default page layout (section order + background tones) ──
export type LayoutItem = {
  type: string;
  visible: boolean;
  tone?: string;
  data?: Record<string, unknown>;
};

/** Atelier editorial flow — mirrors the nav (About / Services / Work /
 *  Reviews / Contact). One dark band (reviews) for cinematic contrast. */
export const BASE_LAYOUT: LayoutItem[] = [
  { type: "hero", visible: true },
  { type: "services", visible: true },
  { type: "about", visible: true },
  { type: "portfolio", visible: true },
  { type: "reviews", visible: true, tone: "dark" },
  { type: "faq", visible: true },
  { type: "contact", visible: true },
];

const LAYOUT_OVERRIDES: Partial<Record<TemplateKey, LayoutItem[]>> = {};

export function defaultLayoutFor(template: TemplateKey): LayoutItem[] {
  return LAYOUT_OVERRIDES[template] ?? BASE_LAYOUT;
}
