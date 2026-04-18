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
  title: "Jazib Faisal | Portfolio",
  description:
    "Jazib Faisal is a BSCS Student and Full-Stack Developer building modern web and desktop applications with premium UX.",
  metadataBase: new URL("https://portfolio-jazib.vercel.app"),
  openGraph: {
    title: "Jazib Faisal | BSCS Student & Full-Stack Developer",
    description:
      "Portfolio featuring Apple 3D Website, Brainwave AI UI, and a Final Year Library Management System for Quaid-e-Azam Library.",
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
