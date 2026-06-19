"use client";

import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { useContent } from "@/components/ContentProvider";

/** Numbered process steps — big bronze numerals over a top hairline. No cards. */
export default function Process() {
  const { process } = useContent();
  if (!process?.length) return null;

  return (
    <section id="process" className="u-section">
      <div className="u-container">
        <Reveal className="max-w-3xl">
          <Eyebrow>Process</Eyebrow>
          <h2 className="text-h2 mt-7">How it works.</h2>
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <Reveal key={i} delay={Math.min(i * 0.08, 0.4)} className="min-w-0">
              <div className="border-t hairline pt-6">
                <span
                  className="text-display block text-accent text-[clamp(2.5rem,4vw,3.5rem)]"
                  style={{ fontWeight: 300 }}
                >
                  {p.n}
                </span>
                <h3 className="text-display mt-4 text-xl">{p.title}</h3>
                <p className="text-dim mt-3">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
