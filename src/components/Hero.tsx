"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/constants";

export function Hero() {
  const headingWords = ["Architecting", "Full-Stack", "&", "Desktop", "Experiences"];
  const subtitleWords =
    "Hi, I'm Jazib Faisal. A Full-Stack and MERN Stack Developer building modern digital solutions with a focus on high-performance architecture, robust backend systems, and immersive interface design.".split(
      " ",
    );

  return (
    <section className="relative flex min-h-[707px] flex-col items-center justify-center overflow-hidden px-5 sm:px-8">
      <div className="bento-glow pointer-events-none absolute inset-0" />
      <div className="relative z-10 max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 font-headline text-sm font-bold uppercase tracking-[0.24em] text-primary"
        >
          {personalInfo.name}
        </motion.p>
        <motion.h1
          transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.9 }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.06, delayChildren: 0.12 },
            },
          }}
          initial="hidden"
          animate="show"
          className="font-headline text-5xl font-bold uppercase tracking-tightest text-on-surface md:text-8xl"
        >
          {headingWords.map((word) => (
            <motion.span
              key={word}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className={`mr-[0.24em] inline-block ${word === "Desktop" ? "text-primary-container" : ""}`}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.018, delayChildren: 0.28 },
            },
          }}
          className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-on-surface-variant md:text-xl"
        >
          {subtitleWords.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ type: "spring", stiffness: 170, damping: 20 }}
              className="mr-[0.28em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.9, delay: 0.35 }}
          className="mt-12 flex justify-center gap-4"
        >
          <div className="h-1 w-20 rounded-full bg-primary-container" />
          <div className="h-1 w-4 rounded-full bg-outline-variant opacity-30" />
        </motion.div>
      </div>
    </section>
  );
}
