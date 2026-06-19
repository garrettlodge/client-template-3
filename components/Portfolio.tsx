"use client";

import Reveal from "@/components/Reveal";
import { useContent } from "@/components/ContentProvider";

/** Asymmetric, alternating work gallery (like an architecture portfolio).
 *  A repeating rhythm of large / small / full-width frames with vertical
 *  offsets. Items with no `src` render a labelled placeholder, so it's
 *  drop-your-photos-in ready. Edge-to-edge, no rounded corners, no shadows. */
const PATTERN = [
  { span: "md:col-span-7", ratio: "4 / 5" },
  { span: "md:col-span-5 md:mt-28", ratio: "4 / 5" },
  { span: "md:col-span-12", ratio: "16 / 7" },
  { span: "md:col-span-5", ratio: "4 / 5" },
  { span: "md:col-span-7 md:mt-28", ratio: "4 / 5" },
  { span: "md:col-span-12", ratio: "16 / 7" },
];

export default function Portfolio() {
  const { portfolio } = useContent();
  if (!portfolio || !portfolio.items?.length) return null;

  return (
    <section id="work" className="u-section">
      <div className="u-container">
        <Reveal className="max-w-3xl">
          <h2 className="text-h2">{portfolio.title || "Selected work"}</h2>
          {portfolio.intro && <p className="lead mt-6">{portfolio.intro}</p>}
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-12 md:gap-y-6">
          {portfolio.items.map((it, i) => {
            const p = PATTERN[i % PATTERN.length];
            return (
              <figure key={i} className={`min-w-0 ${p.span}`}>
                <Reveal variant="img">
                  <div
                    className="relative w-full overflow-hidden"
                    style={{
                      aspectRatio: p.ratio,
                      background: "color-mix(in srgb, var(--fg) 7%, var(--bg))",
                    }}
                  >
                    {it.src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={it.src}
                        alt={it.alt || it.caption || ""}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-eyebrow">
                        {it.category || "Image"}
                      </span>
                    )}
                  </div>
                </Reveal>
                {(it.category || it.caption) && (
                  <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                    {it.caption && (
                      <span className="min-w-0 text-[0.95rem] text-dim">{it.caption}</span>
                    )}
                    {it.category && (
                      <span className="text-eyebrow shrink-0">{it.category}</span>
                    )}
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
