"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/constants";
import { Stagger, StaggerItem } from "./motion";

export function SkillsBento() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <StaggerItem className="group relative overflow-hidden rounded-xl bg-surface-container-low p-8 transition-all duration-500 hover:bg-surface-container-high md:col-span-7">
            <motion.div
              whileHover={{ scale: 1.02, rotateX: 1.6, rotateY: -1.6 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="relative z-10"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="mb-4 block font-headline text-sm font-bold uppercase tracking-[0.2em] text-primary-container">
                Specialization 01
              </span>
              <h3 className="mb-4 font-headline text-3xl font-bold text-on-surface">Web Engineering</h3>
              <p className="mb-8 max-w-md text-on-surface-variant">
                Developing robust, scalable applications leveraging the Next.js ecosystem for server-side excellence
                and dynamic client experiences.
              </p>
              <div className="flex gap-3">
                {skillGroups.web.slice(0, 2).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-outline-variant/20 bg-surface-container-highest px-4 py-1.5 font-label text-xs uppercase text-secondary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </StaggerItem>

          <StaggerItem className="group relative overflow-hidden rounded-xl bg-surface-container-low p-8 transition-all duration-500 hover:bg-surface-container-high md:col-span-5">
            <motion.div
              whileHover={{ scale: 1.02, rotateX: 1.2, rotateY: -1.2 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="relative z-10"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="mb-4 block font-headline text-sm font-bold uppercase tracking-[0.2em] text-primary-container">
                Specialization 02
              </span>
              <h3 className="mb-4 font-headline text-3xl font-bold text-on-surface">Desktop Architecture</h3>
              <p className="mb-8 text-on-surface-variant">
                Crafting native-feel desktop applications with Electron.js, bridging web technology and OS-level
                reliability.
              </p>
              <span className="rounded-full border border-outline-variant/20 bg-surface-container-highest px-4 py-1.5 font-label text-xs uppercase text-secondary">
                Electron.js
              </span>
            </motion.div>
          </StaggerItem>
        </Stagger>
      </section>

      <motion.section
        id="stack"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto my-20 max-w-7xl overflow-hidden rounded-[2rem] bg-surface-container-lowest px-5 py-20 sm:px-8"
      >
        <div className="bento-glow pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative z-10">
          <div className="mb-16 text-center">
            <h2 className="font-headline text-3xl font-bold uppercase tracking-tightest text-on-surface">
              The Technical Stack
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {[...skillGroups.web.slice(0, 3), "Electron", "TypeScript"].map((item) => (
              <motion.div
                key={item}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 240, damping: 18 }}
                className="flex flex-col items-center gap-4 rounded-xl border border-outline-variant/10 bg-surface-container-high/40 p-8 transition-colors hover:border-primary-container/40"
              >
                <span className="font-label text-sm font-bold uppercase tracking-[0.2em] text-secondary">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
}
