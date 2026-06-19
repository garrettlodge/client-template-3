"use client";

import Reveal from "@/components/Reveal";
import type { SectionProps } from "@/components/templates/registry";

export default function GalleryBlock({ section }: SectionProps) {
  const d = (section?.data ?? {}) as Record<string, unknown>;
  const imgs = (Array.isArray(d.images) ? d.images : [])
    .map((x) => {
      if (typeof x === "string") return { src: x, alt: "" };
      if (x && typeof x === "object") {
        const o = x as Record<string, unknown>;
        return {
          src: typeof o.src === "string" ? o.src : "",
          alt: typeof o.alt === "string" ? o.alt : "",
        };
      }
      return { src: "", alt: "" };
    })
    .filter((i) => i.src);
  if (!imgs.length) return null;

  return (
    <section className="u-section-half">
      <div className="u-container grid grid-cols-2 gap-4 md:grid-cols-3">
        {imgs.map((im, i) => (
          <Reveal key={i} variant="img" className="min-w-0">
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={im.src}
                alt={im.alt}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
