"use client";

import Reveal from "@/components/Reveal";
import type { SectionProps } from "@/components/templates/registry";

export default function VideoBlock({ section }: SectionProps) {
  const d = (section?.data ?? {}) as Record<string, unknown>;
  const src = typeof d.src === "string" ? d.src : "";
  const embed = typeof d.embed === "string" ? d.embed : "";
  if (!src && !embed) return null;

  return (
    <section className="u-section-half">
      <div className="u-container">
        <Reveal>
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "16 / 9", background: "#000" }}
          >
            {embed ? (
              <iframe
                src={embed}
                title="Video"
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={src}
                controls
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
