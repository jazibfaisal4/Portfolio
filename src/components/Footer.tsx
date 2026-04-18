"use client";

import { motion } from "framer-motion";
import { personalInfo, socials } from "@/constants";
import { Magnetic } from "./Magnetic";

export function Footer() {
  return (
    <footer className="w-full bg-surface px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-outline-variant/20 pt-12 md:flex-row">
        <div className="font-headline text-sm font-bold uppercase tracking-tightest text-on-surface sm:text-base">
          {personalInfo.name}
        </div>
        <p className="font-body text-center text-xs font-light uppercase tracking-[0.2em] text-on-surface-variant">
          Engineered with precision
        </p>
        <div className="flex items-center gap-5">
          <span className="font-label text-xs uppercase tracking-[0.2em] text-primary">Connect</span>
          {socials.map((social) => (
            <Magnetic key={social.name} strength={0.15}>
              <motion.a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${personalInfo.name} on ${social.name}`}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="inline-flex font-body text-xs font-light uppercase tracking-[0.2em] text-on-surface-variant transition-all duration-300 hover:text-on-surface hover:underline"
              >
                {social.name}
              </motion.a>
            </Magnetic>
          ))}
        </div>
      </div>
    </footer>
  );
}
