import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "@/components/layout/Providers";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
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
      <body className={`${sans.variable} ${mono.variable} bg-bg font-sans text-text antialiased`}>
        <Providers>
          <a href="#content" className="skip-link">
            Skip to content
          </a>
          {children}
        </Providers>
      </body>
    </html>
  );
}
