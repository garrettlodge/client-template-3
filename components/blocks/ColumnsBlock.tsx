"use client";

import Reveal from "@/components/Reveal";
import type { SectionProps } from "@/components/templates/registry";

export default function ColumnsBlock({ section }: SectionProps) {
  const d = (section?.data ?? {}) as Record<string, unknown>;
  const raw = Array.isArray(d.columns) ? (d.columns as unknown[]) : [];
  const items = raw
    .map((c) => (c && typeof c === "object" ? (c as Record<string, unknown>) : {}))
    .map((c) => ({
      heading: typeof c.heading === "string" ? c.heading : "",
      body: typeof c.body === "string" ? c.body : "",
    }))
    .filter((c) => c.heading || c.body);
  if (!items.length) return null;

  return (
    <section className="u-section-half">
      <div className="u-container grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c, i) => (
          <Reveal
            key={i}
            delay={Math.min(i * 0.08, 0.4)}
            className="min-w-0 border-t hairline pt-6"
          >
            {c.heading && <h3 className="text-display text-xl">{c.heading}</h3>}
            {c.body && <p className="text-dim mt-3 whitespace-pre-line">{c.body}</p>}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
