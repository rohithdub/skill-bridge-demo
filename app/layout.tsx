import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "SKILL BRIDGE — An AI-powered Cognitive Bridge to Empowerment",
  description: "Skill Bridge helps underserved users discover a suitable career/skill pathway through a conversational AI Voice Assistant and personalized Skill Roadmap.",
  keywords: ["Skill Bridge", "Smart India Hackathon", "SIH", "AI Voice Assistant", "Skill Roadmap", "Empowerment", "NSDC", "PMKVY"],
  authors: [{ name: "Skill Bridge Team" }]
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#064e3b"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased bg-slate-950" suppressHydrationWarning>
      <body className={`${inter.className} min-h-full flex flex-col bg-slate-950 text-slate-900`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
