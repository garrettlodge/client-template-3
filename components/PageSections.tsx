"use client";

import { useContent } from "./ContentProvider";
import { resolveTemplate } from "@/lib/templates";
import {
  getSectionComponent,
  defaultLayoutFor,
  BASE_LAYOUT,
} from "./templates/registry";

// Re-export for any existing importer (Mission Control, tests).
export { BASE_LAYOUT as DEFAULT_SECTIONS };

const toneClass = (tone?: string) =>
  tone && tone !== "default" ? `sec-tone-${tone}` : "";

/**
 * Renders the page body. Reads the active template from content, then resolves
 * each section type to that template's component (with base fallback). The
 * content-driven `sections` array (Mission Control's layout) wins when present;
 * otherwise the template's default layout is used.
 */
export default function PageSections() {
  const content = useContent();
  const template = resolveTemplate(content.template);
  const layout =
    content.sections && content.sections.length
      ? content.sections
      : defaultLayoutFor(template);

  return (
    <>
      {layout.map((s, i) => {
        if (s.visible === false) return null;
        const Cmp = getSectionComponent(template, s.type);
        if (!Cmp) return null;
        const cls = toneClass(s.tone);
        const key = (s as { id?: string }).id || `${s.type}-${i}`;
        return cls ? (
          <div key={key} className={cls}>
            <Cmp section={s} index={i} />
          </div>
        ) : (
          <Cmp key={key} section={s} index={i} />
        );
      })}
    </>
  );
}
