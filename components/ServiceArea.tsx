"use client";

import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { useContent } from "@/components/ContentProvider";

/** Service area as an editorial wrap of place names — no map, no pills. */
export default function ServiceArea() {
  const { serviceArea } = useContent();
  if (!serviceArea?.length) return null;

  return (
    <section id="service-area" className="u-section">
      <div className="u-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <Eyebrow>Service area</Eyebrow>
          <h2 className="text-h2 mt-7" style={{ maxWidth: "12ch" }}>
            Where we work.
          </h2>
        </Reveal>
        <Reveal className="min-w-0">
          <ul className="flex flex-wrap gap-x-8 gap-y-4">
            {serviceArea.map((c, i) => (
              <li
                key={i}
                className="text-display text-[clamp(1.25rem,2.2vw,1.8rem)]"
                style={{ fontWeight: 300 }}
              >
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
