import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/footer/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { site } from "@/config/site";
import { JsonLd, organizationLd } from "@/lib/seo/jsonld";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
// Not preloaded: downloaded only when Arabic glyphs are rendered.
const arabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "600", "700"], variable: "--font-arabic", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  formatDetection: { telephone: false },
};
export const viewport: Viewport = { themeColor: "#101b32" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${manrope.variable} ${arabic.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:text-navy">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">{children}</main>
        <SiteFooter />
        <JsonLd data={organizationLd} />
      </body>
    </html>
  );
}
