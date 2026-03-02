import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";

export const metadata: Metadata = {
  title: "FUSION X '26 — KGISL Intercollegiate Technical Symposium",
  description:
    "Where Innovation Takes Flight. KGISL's Premier Intercollegiate Technical Symposium on March 27, 2026. Compete. Create. Conquer.",
  openGraph: {
    title: "FUSION X '26 — KGISL",
    description:
      "Where Innovation Takes Flight. KGISL's Premier Intercollegiate Technical Symposium on March 27, 2026.",
    type: "website",
  },
  keywords: [
    "FUSION X",
    "KGISL",
    "technical symposium",
    "intercollegiate",
    "2026",
    "paper presentation",
    "project expo",
    "hackathon",
    "vibathon",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="noise-overlay">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
