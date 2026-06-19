"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type HTMLAttributes,
} from "react";
import type { SiteConfig } from "@/site.config";

// ─────────────────────────────────────────────────────────────────────────
//  ContentProvider — the single source of content for every section.
//
//  Normally it hands components the build-time content. Inside Mission
//  Control's preview (?mcpreview=1) it accepts the editor's draft over
//  postMessage and re-renders live, AND makes [data-mc-field] elements
//  click-to-type (contentEditable) — edits post back to the editor so the
//  form, the draft, and the page stay in sync. Publishing is unchanged.
// ─────────────────────────────────────────────────────────────────────────

type Ctx = { content: SiteConfig; isPreview: boolean };
const ContentContext = createContext<Ctx | null>(null);

export function useContent(): SiteConfig {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within <ContentProvider>");
  return ctx.content;
}

type EditableProps = HTMLAttributes<HTMLElement> & { "data-mc-field": string };

/**
 * Spread onto an editable text element: in preview it becomes click-to-type
 * and reports edits to Mission Control; in production it's just a data attr.
 *   <p {...editable("business.description")}>{description}</p>
 */
export function useEditable() {
  const ctx = useContext(ContentContext);
  const isPreview = ctx?.isPreview ?? false;
  return (field: string): EditableProps => {
    if (!isPreview) return { "data-mc-field": field };
    return {
      "data-mc-field": field,
      contentEditable: "plaintext-only",
      suppressContentEditableWarning: true,
      onInput: (e) =>
        window.parent.postMessage(
          { type: "mc:edit", field, value: e.currentTarget.textContent ?? "" },
          "*"
        ),
    };
  };
}

const ALLOWED_ORIGINS = [
  "https://mission-control-recstu.fly.dev",
  "http://localhost:5173",
  "http://localhost:3001",
  "http://localhost:3000",
];

export default function ContentProvider({
  initial,
  children,
}: {
  initial: SiteConfig;
  children: ReactNode;
}) {
  const [content, setContent] = useState<SiteConfig>(initial);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("mcpreview") !== "1") return;
    setIsPreview(true);
    document.documentElement.setAttribute("data-mc-preview", "1");

    // hover/focus affordance so newbies see what's editable
    const style = document.createElement("style");
    style.textContent =
      "[data-mc-field]{transition:outline-color .15s}" +
      "[data-mc-field]:hover{outline:1px dashed var(--accent);outline-offset:3px;cursor:text}" +
      "[data-mc-field]:focus{outline:2px solid var(--accent);outline-offset:3px}";
    document.head.appendChild(style);

    const allowed = (o: string) =>
      o === window.location.origin || ALLOWED_ORIGINS.includes(o);

    const onMessage = (e: MessageEvent) => {
      if (!allowed(e.origin)) return;
      if (e.data?.type === "mc:content" && e.data.content) {
        setContent(e.data.content as SiteConfig);
      }
    };

    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      // allow in-page anchor scrolling (#services, #contact…); only block
      // links that would navigate away from the preview, and buttons
      const a = t?.closest?.("a") as HTMLAnchorElement | null;
      if (a && !(a.getAttribute("href") || "").startsWith("#")) e.preventDefault();
      if (t?.closest?.("button")) e.preventDefault();
      const el = t?.closest?.("[data-mc-field]");
      if (el) {
        window.parent.postMessage(
          { type: "mc:click", field: el.getAttribute("data-mc-field") },
          "*"
        );
      }
    };

    window.addEventListener("message", onMessage);
    document.addEventListener("click", onClick, true);
    window.parent.postMessage({ type: "mc:ready" }, "*");

    return () => {
      window.removeEventListener("message", onMessage);
      document.removeEventListener("click", onClick, true);
      style.remove();
    };
  }, []);

  // In preview, the <html> class/style are baked at build time and won't
  // change as the draft streams in — so reflect theme edits (mode / accent /
  // custom bg + fg) onto the document live, matching layout.tsx's logic.
  useEffect(() => {
    if (!isPreview) return;
    const root = document.documentElement;
    const t = content.theme || ({} as SiteConfig["theme"]);
    root.classList.toggle("theme-dark", t.mode === "dark");
    // Switch the token theme live when the editor changes `template`.
    if (content.template) root.setAttribute("data-template", content.template);
    if (t.accent) root.style.setProperty("--accent", t.accent);
    if (t.bg) root.style.setProperty("--bg", t.bg);
    else root.style.removeProperty("--bg");
    if (t.fg) root.style.setProperty("--fg", t.fg);
    else root.style.removeProperty("--fg");
  }, [isPreview, content.theme, content.template]);

  return (
    <ContentContext.Provider value={{ content, isPreview }}>
      {children}
    </ContentContext.Provider>
  );
}
