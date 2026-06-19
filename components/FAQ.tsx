"use client";

import Reveal from "@/components/Reveal";
import { useContent } from "@/components/ContentProvider";

/** Quiet FAQ: native <details> rows separated by hairlines. A bronze "+"
 *  rotates on open. No boxes, smooth answer fade. */
export default function FAQ() {
  const { faq } = useContent();
  if (!faq?.length) return null;

  return (
    <section id="faq" className="u-section">
      <div className="u-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <h2 className="text-h2" style={{ maxWidth: "12ch" }}>
            Questions, answered.
          </h2>
        </Reveal>

        <div className="min-w-0 border-t hairline">
          {faq.map((f, i) => (
            <Reveal key={i} delay={Math.min(i * 0.05, 0.3)}>
              <details className="faq-item group border-b hairline">
                <summary className="flex cursor-pointer items-start justify-between gap-6 py-6">
                  <span className="text-display min-w-0 text-[clamp(1.2rem,2vw,1.6rem)] leading-snug">
                    {f.q}
                  </span>
                  <span className="faq-mark text-accent shrink-0" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="lead -mt-1 pb-7 pr-10">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
