import type { Metadata, Viewport } from "next";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import JsonLd from "@/components/JsonLd";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const SITE_URL = "https://editlayer.dev";
const TITLE    = "EditLayer | Live In-Page Editing for Next.js";
const DESC     = "Add ?edit=true to any URL. Log in with a magic link. Edit headlines, CTAs, and copy directly on the page. Publish and Vercel redeploys automatically. No CMS, no database, MIT licensed.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | EditLayer",
  },
  description: DESC,
  keywords: [
    "next.js content editing",
    "in-page editing next.js",
    "headless cms alternative",
    "next.js cms",
    "live editing next.js",
    "editlayer",
    "edit mode next.js",
    "no cms next.js",
    "vercel content editing",
    "magic link auth",
    "github content workflow",
    "open source cms next.js",
  ],
  authors: [{ name: "EditLayer", url: SITE_URL }],
  creator: "EditLayer",
  publisher: "EditLayer",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "EditLayer",
    title: TITLE,
    description: DESC,
    images: [
      {
        url: `${SITE_URL}/og.png`,
        width: 1200,
        height: 630,
        alt: "EditLayer — live in-page editing for Next.js",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@editlayer",
    creator: "@editlayer",
    title: TITLE,
    description: DESC,
    images: [`${SITE_URL}/og.png`],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.json",
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#16a34a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={instrumentSerif.variable}>
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla's
          cz-shortcut-listen, Grammarly) inject attributes onto <body> before
          React hydrates. That's external to our markup and safe to ignore. */}
      <body suppressHydrationWarning>
        <JsonLd />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
