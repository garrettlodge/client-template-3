"use client";

import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { useContent, useEditable } from "@/components/ContentProvider";

/** Two-column About: a large headline (left) and the story (right, capped at a
 *  readable 650px measure), with an owner signature underneath. */
export default function About() {
  const { about } = useContent();
  const ed = useEditable();
  const headline = about.headline || "Obsessed with the details others skip.";

  return (
    <section id="about" className="u-section">
      <div className="u-container grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="min-w-0">
          <Reveal>
            <Eyebrow index="02">About</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-h2 mt-7" style={{ maxWidth: "14ch" }} {...ed("about.headline")}>
              {headline}
            </h2>
          </Reveal>
          {about.photo && (
            <Reveal variant="img" className="mt-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={about.photo}
                alt={about.owner}
                className="w-full object-cover"
                style={{ aspectRatio: "4 / 5" }}
              />
            </Reveal>
          )}
        </div>

        <div className="min-w-0 lg:pt-16">
          <Reveal>
            <div className="space-y-6" style={{ maxWidth: "650px" }}>
              {about.paragraphs.map((p, i) => (
                <p key={i} className="lead">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 flex items-center gap-4">
            <span aria-hidden className="h-px w-10 shrink-0" style={{ background: "var(--accent)" }} />
            <span className="text-eyebrow">
              {about.owner} — {about.ownerRole}
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
