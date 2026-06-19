"use client";

import { useEffect, useState } from "react";
import { useContent } from "@/components/ContentProvider";

const LINKS = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

/**
 * Floats transparent over the dark hero (light text). On scroll it gains a
 * subtle glass blur + bottom hairline and flips to ink, since the body is ivory.
 * 80px tall; tiny uppercase, wide-tracked links with generous spacing.
 */
export default function Nav() {
  const { business, contact } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={scrolled ? "glass" : ""}
        style={{
          color: scrolled ? "var(--fg)" : "#f5f2eb",
          transition: "color .6s var(--ease), background-color .6s var(--ease)",
        }}
      >
        <nav
          className="u-container flex items-center justify-between"
          style={{ height: 80 }}
        >
          <a
            href="#top"
            className="text-display shrink-0"
            style={{ fontSize: "1.6rem", fontWeight: 400, letterSpacing: "-0.01em" }}
          >
            {business.name}
          </a>

          <div className="hidden items-center lg:flex" style={{ gap: "2.6rem" }}>
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[0.8125rem] font-medium uppercase tracking-[0.14em] opacity-70 transition-opacity duration-500 hover:opacity-100"
              >
                {l.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setOpen(true)}
            className="text-[0.8125rem] font-medium uppercase tracking-[0.14em] opacity-80 transition-opacity hover:opacity-100 lg:hidden"
            aria-label="Open menu"
          >
            Menu
          </button>
        </nav>
      </div>

      {/* Mobile full-screen menu — ivory panel, ink text */}
      <div
        className="fixed inset-0 z-50 lg:hidden"
        style={{
          background: "var(--bg)",
          color: "var(--fg)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity .5s var(--ease)",
        }}
      >
        <div
          className="u-container flex items-center justify-between"
          style={{ height: 80 }}
        >
          <span className="text-display" style={{ fontSize: "1.6rem", fontWeight: 400 }}>
            {business.name}
          </span>
          <button
            onClick={() => setOpen(false)}
            className="text-[0.8125rem] font-medium uppercase tracking-[0.14em] opacity-80 transition-opacity hover:opacity-100"
            aria-label="Close menu"
          >
            Close
          </button>
        </div>
        <nav className="u-container mt-6 flex flex-col">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-display border-b hairline"
              style={{ fontSize: "clamp(1.9rem, 9vw, 3rem)", fontWeight: 300, paddingBlock: "1.1rem" }}
            >
              {l.label}
            </a>
          ))}
          <a href={`tel:${contact.phoneTel}`} className="btn-primary mt-10 self-start">
            Call {contact.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
