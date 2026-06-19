import type { Metadata } from "next";
import type { CSSProperties } from "react";
import "./globals.css";
import "./templates.css";
import { siteConfig } from "@/site.config";
import { buildJsonLd } from "@/lib/schema";
import { resolveTemplate } from "@/lib/templates";
import { getTemplateFontClass, getTemplateFontVars } from "@/lib/fonts";
import ContentProvider from "@/components/ContentProvider";
import SmoothScroll from "@/components/SmoothScroll";

const plainTagline = siteConfig.business.tagline.replace(/\*/g, "");
const siteUrl = `https://${siteConfig.business.domain}`;
const template = resolveTemplate(siteConfig.template);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.business.name} — ${plainTagline}`,
    template: `%s · ${siteConfig.business.name}`,
  },
  description: siteConfig.business.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.business.name} — ${plainTagline}`,
    description: siteConfig.business.description,
    url: siteUrl,
    siteName: siteConfig.business.name,
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.business.name} — ${plainTagline}`,
    description: siteConfig.business.description,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = buildJsonLd(siteConfig);

  return (
    <html
      lang="en"
      data-template={template}
      className={`${getTemplateFontClass(template)} ${
        siteConfig.theme.mode === "dark" ? "theme-dark" : ""
      }`}
      style={
        {
          // Map the generic type tokens onto the active template's fonts…
          ...getTemplateFontVars(template),
          // …then the per-client brand color (and optional bg/fg overrides).
          "--accent": siteConfig.theme.accent,
          ...(siteConfig.theme.bg ? { "--bg": siteConfig.theme.bg } : {}),
          ...(siteConfig.theme.fg ? { "--fg": siteConfig.theme.fg } : {}),
        } as CSSProperties
      }
    >
      <body>
        <ContentProvider initial={siteConfig}>
          <SmoothScroll>{children}</SmoothScroll>
        </ContentProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
