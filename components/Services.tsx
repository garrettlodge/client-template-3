"use client";

import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { useContent } from "@/components/ContentProvider";

/** Services as editorial rows — a numbered index, a large serif title, the
 *  blurb, and an arrow, separated by full-width hairlines. No cards. */
export default function Services() {
  const { services } = useContent();
  if (!services?.length) return null;

  return (
    <section id="services" className="u-section">
      <div className="u-container">
        <Reveal className="max-w-3xl">
          <Eyebrow>Services</Eyebrow>
          <h2 className="text-h2 mt-7">Considered work, start to finish.</h2>
        </Reveal>

        <div className="mt-16 border-t hairline">
          {services.map((s, i) => (
            <Reveal key={s.slug || i} delay={Math.min(i * 0.06, 0.36)}>
              <a
                href="#contact"
                className="group grid items-baseline gap-x-10 gap-y-3 border-b hairline py-9 md:grid-cols-[auto_1fr_1.1fr_auto]"
              >
                <span className="text-eyebrow md:pt-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-display min-w-0 text-[clamp(1.75rem,3.6vw,2.9rem)] leading-[1.05] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2">
                  {s.title}
                </h3>
                <p className="text-dim min-w-0 max-w-xl md:pt-2">{s.blurb}</p>
                <span
                  aria-hidden
                  className="hidden text-2xl text-accent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 md:block md:pt-2"
                >
                  →
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
