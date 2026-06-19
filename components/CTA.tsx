"use client";

import Reveal from "@/components/Reveal";
import { useContent, useEditable } from "@/components/ContentProvider";

/** Centered closing call-to-action band. Falls back to a phone CTA. */
export default function CTA() {
  const { cta, contact } = useContent();
  const ed = useEditable();
  const heading = cta?.heading || "Ready when you are.";

  return (
    <section className="u-section">
      <div className="u-container text-center">
        <Reveal>
          <h2 className="text-h2 mx-auto" style={{ maxWidth: "18ch" }} {...ed("cta.heading")}>
            {heading}
          </h2>
        </Reveal>
        {cta?.body && (
          <Reveal delay={0.1}>
            <p className="lead mx-auto mt-6 max-w-xl" {...ed("cta.body")}>
              {cta.body}
            </p>
          </Reveal>
        )}
        <Reveal delay={0.15} className="mt-10 flex flex-wrap justify-center gap-4">
          <a href={`tel:${contact.phoneTel}`} className="btn-primary">
            {cta?.primary || `Call ${contact.phone}`}
          </a>
          <a href="#contact" className="btn-ghost">
            {cta?.secondary || "Get in touch"}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
