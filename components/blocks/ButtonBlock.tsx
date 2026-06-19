"use client";

import Reveal from "@/components/Reveal";
import type { SectionProps } from "@/components/templates/registry";

export default function ButtonBlock({ section }: SectionProps) {
  const d = (section?.data ?? {}) as Record<string, unknown>;
  const label = typeof d.label === "string" ? d.label : "";
  const href = typeof d.href === "string" ? d.href : "#contact";
  if (!label) return null;

  return (
    <section className="u-section-half">
      <div className="u-container flex justify-center">
        <Reveal>
          <a href={href} className="btn-primary">
            {label}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
