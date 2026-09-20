import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Jazib Faisal | AI/ML developer and full-stack developer",
  description:
    "I build voice-first AI systems and the full-stack products around them. Fresh BSCS graduate building a real-time AI interview system.",
  metadataBase: new URL("https://portfolio-jazib.vercel.app"),
  openGraph: {
    title: "Jazib Faisal | AI/ML developer and full-stack developer",
    description:
      "Fresh BSCS graduate. I'm building a real-time AI interview system: live audio over LiveKit, local Whisper speech-to-text and a recruiter dashboard.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} bg-surface font-body`}>{children}</body>
    </html>
  );
}
