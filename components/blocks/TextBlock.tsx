"use client";

import Reveal from "@/components/Reveal";
import type { SectionProps } from "@/components/templates/registry";

export default function TextBlock({ section }: SectionProps) {
  const d = (section?.data ?? {}) as Record<string, unknown>;
  const heading = typeof d.heading === "string" ? d.heading : "";
  const body = typeof d.body === "string" ? d.body : "";
  if (!heading && !body) return null;

  return (
    <section className="u-section-half">
      <div className="u-container">
        <Reveal className="u-narrow">
          {heading && <h2 className="text-h2">{heading}</h2>}
          {body && <p className="lead mt-6 whitespace-pre-line">{body}</p>}
        </Reveal>
      </div>
    </section>
  );
}
