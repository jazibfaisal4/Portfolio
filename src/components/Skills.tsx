"use client";

import { motion } from "framer-motion";
import { skillGroups, techStack } from "@/constants";
import { Stagger, StaggerItem } from "./motion";

function SkillChip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-outline-variant/20 bg-surface-container-highest px-4 py-1.5 font-label text-xs uppercase text-secondary">
      {label}
    </span>
  );
}

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
              <div className="flex flex-wrap gap-3">
                {skillGroups.web.map((skill) => (
                  <SkillChip key={skill} label={skill} />
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
              <h3 className="mb-4 font-headline text-3xl font-bold text-on-surface">Full-Stack Desktop</h3>
              <p className="mb-8 text-on-surface-variant">
                Crafting native-feel desktop applications with Electron.js, backed by Node.js APIs, MySQL persistence,
                and production-grade state management.
              </p>
              <div className="flex flex-wrap gap-3">
                {[...skillGroups.desktop.slice(0, 2), ...skillGroups.backend.slice(0, 4)].map((skill) => (
                  <SkillChip key={skill} label={skill} />
                ))}
              </div>
            </motion.div>
          </StaggerItem>
        </Stagger>
      </section>

      <motion.section
        id="stack"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.9 }}
        className="relative mx-auto my-20 max-w-7xl overflow-hidden rounded-[2rem] bg-surface-container-lowest px-5 py-20 sm:px-8"
      >
        <div className="bento-glow pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative z-10">
          <div className="mb-16 text-center">
            <h2 className="font-headline text-3xl font-bold uppercase tracking-tightest text-on-surface">
              The Technical Stack
            </h2>
          </div>
          <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-6">
            {techStack.map((item) => (
              <StaggerItem key={item}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 240, damping: 18 }}
                  className="flex h-full flex-col items-center justify-center gap-4 rounded-xl border border-outline-variant/10 bg-surface-container-high/40 p-6 transition-colors hover:border-primary-container/40 sm:p-8"
                >
                  <span className="text-center font-label text-xs font-bold uppercase tracking-[0.15em] text-secondary sm:text-sm sm:tracking-[0.2em]">
                    {item}
                  </span>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </motion.section>
    </>
  );
}
