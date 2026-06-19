"use client";

import Reveal from "@/components/Reveal";
import type { SectionProps } from "@/components/templates/registry";

export default function TextImageBlock({ section }: SectionProps) {
  const d = (section?.data ?? {}) as Record<string, unknown>;
  const heading = typeof d.heading === "string" ? d.heading : "";
  const body = typeof d.body === "string" ? d.body : "";
  const src = typeof d.src === "string" ? d.src : "";
  const imageRight = d.imageRight !== false;

  return (
    <section className="u-section-half">
      <div className="u-container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className={`min-w-0 ${imageRight ? "" : "lg:order-2"}`}>
          {heading && <h2 className="text-h2">{heading}</h2>}
          {body && <p className="lead mt-6 whitespace-pre-line">{body}</p>}
        </Reveal>
        {src && (
          <Reveal variant="img" className={imageRight ? "" : "lg:order-1"}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={heading}
              className="w-full object-cover"
              style={{ aspectRatio: "4 / 3" }}
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
