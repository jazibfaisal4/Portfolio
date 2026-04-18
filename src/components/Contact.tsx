"use client";

import { motion } from "framer-motion";
import { socials } from "@/constants";
import { Magnetic } from "./Magnetic";

export function Contact() {
  const linkedIn = socials.find((social) => social.name === "LinkedIn")?.href ?? "#";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.9 }}
      className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8"
    >
      <div className="rounded-[2rem] bg-surface-container-low p-12">
        <h2 className="mb-6 font-headline text-4xl font-bold uppercase tracking-tightest text-on-surface">
          Ready to Build?
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-on-surface-variant">
          Jazib is currently open to collaborations and product opportunities focused on high-performance applications.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <Magnetic strength={0.18}>
            <a
              className="inline-flex rounded-full bg-primary-container px-10 py-4 font-headline text-sm font-bold uppercase tracking-[0.12em] text-white shadow-electric-glow transition-transform hover:scale-105"
              href="mailto:jazibfaisal66@gmail.com?subject=Inquiry%20from%20Portfolio"
              aria-label="Start conversation by email"
            >
              Start a Conversation
            </a>
          </Magnetic>
          <Magnetic strength={0.16}>
            <a
              className="font-label text-sm uppercase tracking-[0.12em] text-on-surface-variant transition-colors hover:text-on-surface"
              href={linkedIn}
              target="_blank"
              rel="noreferrer"
              aria-label="View Jazib Faisal on LinkedIn"
            >
              View LinkedIn
            </a>
          </Magnetic>
        </div>
      </div>
    </motion.section>
  );
}
