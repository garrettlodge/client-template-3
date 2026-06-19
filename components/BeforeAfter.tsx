"use client";

import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { useContent } from "@/components/ContentProvider";

function Pane({ src, label }: { src?: string | null; label: string }) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: "4 / 3",
        background: "color-mix(in srgb, var(--fg) 7%, var(--bg))",
      }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={label} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center text-eyebrow">
          {label}
        </span>
      )}
      <span
        className="text-eyebrow absolute left-3 top-3"
        style={{ background: "var(--bg)", color: "var(--fg)", padding: "2px 8px" }}
      >
        {label}
      </span>
    </div>
  );
}

/** Before / after — a clean two-up comparison with labels (no drag, no boxes). */
export default function BeforeAfter() {
  const { beforeAfter } = useContent();
  if (!beforeAfter || !beforeAfter.items?.length) return null;

  return (
    <section id="before-after" className="u-section">
      <div className="u-container">
        <Reveal className="max-w-3xl">
          <Eyebrow>{beforeAfter.title || "Before & after"}</Eyebrow>
          {beforeAfter.intro && <p className="lead mt-6">{beforeAfter.intro}</p>}
        </Reveal>

        <div className="mt-16 space-y-16">
          {beforeAfter.items.map((it, i) => (
            <Reveal key={i} className="min-w-0">
              <div className="grid gap-4 sm:grid-cols-2">
                <Pane src={it.before} label="Before" />
                <Pane src={it.after} label="After" />
              </div>
              {it.caption && <p className="text-eyebrow mt-4">{it.caption}</p>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
