"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { useContent, useEditable } from "@/components/ContentProvider";

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-eyebrow mb-3">{label}</dt>
      <dd className="text-[0.98rem] leading-relaxed">{children}</dd>
    </div>
  );
}

/** Editorial contact close — a statement + CTAs on the left, the practical
 *  details (phone / email / address / hours) as a quiet definition list. */
export default function Contact() {
  const { contact, cta } = useContent();
  const ed = useEditable();
  const heading = cta?.heading || "Let’s make something worth keeping.";

  return (
    <section id="contact" className="u-section">
      <div className="u-container grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="min-w-0">
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-h2 mt-7" style={{ maxWidth: "16ch" }} {...ed("cta.heading")}>
              {heading}
            </h2>
          </Reveal>
          {cta?.body && (
            <Reveal delay={0.15}>
              <p className="lead mt-6 max-w-md" {...ed("cta.body")}>
                {cta.body}
              </p>
            </Reveal>
          )}
          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-4">
            <a href={`tel:${contact.phoneTel}`} className="btn-primary">
              Call {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="btn-ghost">
              Email us
            </a>
          </Reveal>
        </div>

        <div className="min-w-0">
          <Reveal>
            <dl className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
              <Detail label="Phone">
                <a href={`tel:${contact.phoneTel}`} className="link-line">
                  {contact.phone}
                </a>
              </Detail>
              <Detail label="Email">
                <a href={`mailto:${contact.email}`} className="link-line break-words">
                  {contact.email}
                </a>
              </Detail>
              <Detail label="Visit">
                <address className="not-italic">
                  {contact.address.street}
                  <br />
                  {contact.address.city}, {contact.address.state} {contact.address.zip}
                </address>
                {contact.mapsUrl && (
                  <a
                    href={contact.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="link-line mt-2 inline-block text-dim"
                  >
                    View on map
                  </a>
                )}
              </Detail>
              <Detail label="Hours">
                <div className="space-y-1.5">
                  {contact.hours.map((h, i) => (
                    <div key={i} className="flex justify-between gap-4">
                      <span>{h.days}</span>
                      <span className="text-dim">{h.time}</span>
                    </div>
                  ))}
                </div>
              </Detail>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
