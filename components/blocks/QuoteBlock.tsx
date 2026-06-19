"use client";

import Reveal from "@/components/Reveal";
import type { SectionProps } from "@/components/templates/registry";

export default function QuoteBlock({ section }: SectionProps) {
  const d = (section?.data ?? {}) as Record<string, unknown>;
  const quote = typeof d.quote === "string" ? d.quote : "";
  const author = typeof d.author === "string" ? d.author : "";
  if (!quote) return null;

  return (
    <section className="u-section">
      <div className="u-container">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p
            className="text-display"
            style={{ fontSize: "clamp(1.6rem,3.4vw,2.8rem)", lineHeight: 1.3, fontWeight: 300 }}
          >
            &ldquo;{quote}&rdquo;
          </p>
          {author && <p className="text-eyebrow mt-8">{author}</p>}
        </Reveal>
      </div>
    </section>
  );
}
