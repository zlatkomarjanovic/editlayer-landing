import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "EditLayer — Edit your Next.js site, live",
  description:
    "Add ?edit=true to your Next.js site. Log in. Edit marketing copy directly on the page. Publish. Vercel redeploys automatically.",
  openGraph: {
    title: "EditLayer — Edit your Next.js site, live",
    description:
      "One npm package. Your marketing team edits copy directly on the page. No CMS, no dashboard, no compromise.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla's
          cz-shortcut-listen, Grammarly) inject attributes onto <body> before
          React hydrates. That's external to our markup and safe to ignore. */}
      <body suppressHydrationWarning>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
