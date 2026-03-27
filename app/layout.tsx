import type { Metadata } from "next";
import { Syne, JetBrains_Mono, Crimson_Pro } from "next/font/google";
import "./globals.css";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const crimson = Crimson_Pro({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Blogy AI — SEO Blog Engine",
  description: "Transform any keyword into a fully SEO-optimized blog through an intelligent AI pipeline.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${jetbrains.variable} ${crimson.variable}`}>
      <body>{children}</body>
    </html>
  );
}
