"use client";

import { motion } from "framer-motion";
import { personalInfo, socials } from "@/constants";
import Link from "next/link";
import { Magnetic } from "./Magnetic";

const iconClass = "h-4 w-4";

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={iconClass} aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.5 2.87 8.32 6.84 9.67.5.1.66-.22.66-.49 0-.24-.01-.88-.02-1.72-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .08 1.54 1.06 1.54 1.06.9 1.58 2.35 1.12 2.93.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.09 0-1.13.39-2.05 1.03-2.77-.1-.26-.44-1.31.1-2.72 0 0 .84-.27 2.75 1.06A9.3 9.3 0 0 1 12 6.85c.85 0 1.7.12 2.5.37 1.9-1.33 2.74-1.06 2.74-1.06.55 1.4.21 2.46.1 2.72.65.72 1.03 1.64 1.03 2.77 0 3.96-2.34 4.83-4.58 5.09.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.82 0 .27.16.59.67.49A10.21 10.21 0 0 0 22 12.22C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={iconClass} aria-hidden="true">
      <path d="M6.94 8.5a1.87 1.87 0 1 1 0-3.74 1.87 1.87 0 0 1 0 3.74ZM8.5 19H5.37V9.72H8.5V19Zm10.13 0h-3.12v-4.53c0-1.08-.02-2.46-1.5-2.46-1.5 0-1.73 1.17-1.73 2.38V19H9.16V9.72h3v1.27h.04a3.3 3.3 0 0 1 2.97-1.63c3.18 0 3.76 2.1 3.76 4.83V19Z" />
    </svg>
  );
}

function SocialIcon({ name }: { name: string }) {
  if (name === "GitHub") return <GithubIcon />;
  return <LinkedinIcon />;
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-[100] w-full bg-surface-container-high/60 shadow-glass backdrop-blur-3xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="font-headline text-lg font-bold uppercase tracking-tightest text-on-surface sm:text-xl">
            {personalInfo.name}
          </span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <a className="font-headline text-sm font-bold uppercase tracking-tightest text-primary-container" href="#">
            Home
          </a>
          <a
            className="font-headline text-sm font-medium uppercase tracking-tightest text-on-surface-variant transition-colors hover:text-on-surface"
            href="#projects"
          >
            Projects
          </a>
          <a
            className="font-headline text-sm font-medium uppercase tracking-tightest text-on-surface-variant transition-colors hover:text-on-surface"
            href="#stack"
          >
            Stack
          </a>
        </nav>

        <div className="flex items-center gap-2">
          {socials.map((social) => (
            <Magnetic key={social.name} strength={0.2}>
              <motion.div whileHover={{ y: -2, scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${personalInfo.name} on ${social.name}`}
                  className="inline-flex rounded-full bg-surface-container-highest p-2 text-on-surface-variant transition-colors duration-300 hover:text-primary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container/70"
                >
                  <SocialIcon name={social.name} />
                </Link>
              </motion.div>
            </Magnetic>
          ))}
          <motion.a
            whileTap={{ scale: 0.92 }}
            href="/Jazib_Faisal_Resume.pdf"
            download="Jazib_Faisal_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 hidden rounded-full bg-primary-container px-5 py-2 font-headline text-sm font-bold uppercase tracking-tightest text-on-primary-container md:block"
          >
            Resume
          </motion.a>
        </div>
      </div>
    </header>
  );
}
