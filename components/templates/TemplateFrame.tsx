"use client";

import { resolveTemplate } from "@/lib/templates";
import { useContent } from "@/components/ContentProvider";
import PageSections from "@/components/PageSections";
import { getChrome } from "./registry";

/**
 * Resolves the active template's chrome (Nav / Footer) and wraps the
 * content-driven page body. Rendered by app/page.tsx; the section body itself
 * is built by PageSections from the layout in registry.tsx (or the
 * Mission-Control-authored `sections` array when present).
 */
export default function TemplateFrame() {
  const content = useContent();
  const template = resolveTemplate(content.template);
  const { Nav, Footer } = getChrome(template);

  return (
    <>
      <Nav />
      <main>
        <PageSections />
      </main>
      <Footer />
    </>
  );
}
