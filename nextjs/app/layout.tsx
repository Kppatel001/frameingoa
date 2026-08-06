import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "FrameInGoa — HH Goa 2026 Frame & Builder ID",
  description:
    "Frame yourself into HH Goa 2026. Make a branded PFP frame or builder ID card in seconds and share it on X. No signup. #FrameInGoa",
  openGraph: {
    title: "FrameInGoa — HH Goa 2026",
    description: "Make your HH Goa 2026 PFP frame or builder ID and share it on X. #FrameInGoa",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Space+Grotesk:wght@400;500;700&family=Noto+Sans+Devanagari:wght@700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#071B12" />
      </head>
      <body>
        <div className="page">{children}</div>
      </body>
    </html>
  );
}
