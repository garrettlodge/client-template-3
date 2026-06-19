"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { useContent } from "@/components/ContentProvider";

/** Magazine pull-quote reviews. One large rotating quote, name underneath,
 *  minimal. Rendered on a dark band (layout tone) for cinematic contrast. */
export default function Reviews() {
  const { reviews } = useContent();
  const items = reviews?.items || [];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 7000);
    return () => clearInterval(t);
  }, [items.length]);

  if (!items.length) return null;
  const r = items[idx];

  return (
    <section id="reviews" className="u-section">
      <div className="u-container">
        <Reveal className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <Eyebrow index="04">
            {reviews.source ? `${reviews.source} reviews` : "Reviews"}
          </Eyebrow>
          <span className="text-eyebrow">
            <span className="text-accent">{reviews.rating}</span> ★ · {reviews.count}+ reviews
          </span>
        </Reveal>

        <figure className="mx-auto mt-14 max-w-4xl text-center">
          <blockquote key={idx} className="fade-swap">
            <p
              className="text-display"
              style={{ fontSize: "clamp(1.55rem, 3.2vw, 2.7rem)", lineHeight: 1.3, fontWeight: 300 }}
            >
              &ldquo;{r.body}&rdquo;
            </p>
          </blockquote>
          <figcaption key={`c${idx}`} className="fade-swap mt-10 flex items-center justify-center gap-4">
            <span aria-hidden className="h-px w-8 shrink-0" style={{ background: "var(--accent)" }} />
            <span className="text-eyebrow">
              {r.author}
              {r.date ? ` · ${r.date}` : ""}
            </span>
          </figcaption>
        </figure>

        {items.length > 1 && (
          <div className="mt-12 flex justify-center gap-3">
            {items.map((_, i) => (
              <button
                key={i}
                aria-label={`Show review ${i + 1}`}
                onClick={() => setIdx(i)}
                className="h-2 w-2 rounded-full transition-opacity duration-500"
                style={{ background: "var(--fg)", opacity: i === idx ? 1 : 0.3 }}
              />
            ))}
          </div>
        )}

        {reviews.sourceUrl && (
          <div className="mt-10 text-center">
            <a
              href={reviews.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="link-line text-eyebrow"
            >
              Read all reviews
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
