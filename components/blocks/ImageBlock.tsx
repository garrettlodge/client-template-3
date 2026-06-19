"use client";

import Reveal from "@/components/Reveal";
import type { SectionProps } from "@/components/templates/registry";

export default function ImageBlock({ section }: SectionProps) {
  const d = (section?.data ?? {}) as Record<string, unknown>;
  const src = typeof d.src === "string" ? d.src : "";
  const alt = typeof d.alt === "string" ? d.alt : "";
  const caption = typeof d.caption === "string" ? d.caption : "";
  if (!src) return null;

  return (
    <section className="u-section-half">
      <div className="u-container">
        <Reveal variant="img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="w-full object-cover" />
        </Reveal>
        {caption && <p className="text-eyebrow mt-4">{caption}</p>}
      </div>
    </section>
  );
}
