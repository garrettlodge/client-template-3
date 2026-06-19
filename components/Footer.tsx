"use client";

import { useContent } from "@/components/ContentProvider";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

/** Quiet dark footer — bookends the dark hero. Big wordmark, menu, contact,
 *  socials, legal line. No boxes. */
export default function Footer() {
  const { business, contact, social } = useContent();
  const year = new Date().getFullYear();
  const socials = (
    [
      ["Instagram", social?.instagram],
      ["Facebook", social?.facebook],
      ["Google", social?.google],
      ["Yelp", social?.yelp],
    ] as [string, string | undefined][]
  ).filter((s): s is [string, string] => Boolean(s[1]));

  return (
    <footer className="sec-tone-dark">
      <div
        className="u-container"
        style={{ paddingBlock: "clamp(4.5rem, 9vw, 8rem)" }}
      >
        <div className="grid gap-14 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="min-w-0">
            <a
              href="#top"
              className="text-display"
              style={{
                fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
                fontWeight: 300,
                letterSpacing: "-0.01em",
              }}
            >
              {business.name}
            </a>
            <p className="lead mt-6" style={{ maxWidth: "34ch" }}>
              {business.license}
            </p>
          </div>

          <nav className="flex min-w-0 flex-col gap-4">
            <span className="text-eyebrow">Menu</span>
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="link-line w-fit text-[0.95rem] text-dim transition-colors hover:text-fg"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex min-w-0 flex-col gap-4">
            <span className="text-eyebrow">Contact</span>
            <a
              href={`tel:${contact.phoneTel}`}
              className="link-line w-fit text-[0.95rem]"
            >
              {contact.phone}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="link-line w-fit break-words text-[0.95rem]"
            >
              {contact.email}
            </a>
            <span className="text-dim text-[0.95rem]">
              {contact.address.street}, {contact.address.city}{" "}
              {contact.address.state}
            </span>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t hairline pt-8 md:flex-row md:items-center md:justify-between">
          <span className="text-eyebrow">
            © {year} {business.name}
          </span>
          {socials.length > 0 && (
            <div className="flex flex-wrap gap-x-7 gap-y-2">
              {socials.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-line text-[0.8125rem] uppercase tracking-[0.12em] text-dim transition-colors hover:text-fg"
                >
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
