"use client";

import { LayoutGroup, motion } from "framer-motion";
import { onlyVerified, skills } from "@/constants";
import { Stagger, StaggerItem } from "./motion";

function SkillChip({ label }: { label: string }) {
  return (
    <motion.span
      layout
      className="rounded-full border border-outline-variant/20 bg-surface-container-highest px-4 py-1.5 font-label text-xs uppercase text-secondary"
    >
      {label}
    </motion.span>
  );
}

export function SkillsBento() {
  const visibleSkills = onlyVerified(skills);
  const aiSkills = visibleSkills.filter((skill) => skill.category === "ai-ml");
  const fullstackSkills = visibleSkills.filter((skill) => skill.category === "fullstack");
  const desktopSkills = visibleSkills.filter((skill) => skill.category === "desktop");

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <StaggerItem className="group relative overflow-hidden rounded-xl bg-surface-container-low p-8 transition-all duration-500 hover:bg-surface-container-high md:col-span-4">
            <motion.div
              whileHover={{ scale: 1.02, rotateX: 1.6, rotateY: -1.6 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="relative z-10"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="mb-4 block font-headline text-sm font-bold uppercase tracking-[0.2em] text-primary-container">
                Specialization 01
              </span>
              <h3 className="mb-4 font-headline text-3xl font-bold text-on-surface">AI / ML</h3>
              <p className="mb-8 max-w-md text-on-surface-variant">
                Building predictive models and data pipelines with Python, Pandas, and Scikit-Learn — integrating
                intelligent endpoints into production applications.
              </p>
              <div className="flex flex-wrap gap-3">
                {aiSkills.map((skill) => (
                  <SkillChip key={skill.name} label={skill.name} />
                ))}
              </div>
            </motion.div>
          </StaggerItem>

          <StaggerItem className="group relative overflow-hidden rounded-xl bg-surface-container-low p-8 transition-all duration-500 hover:bg-surface-container-high md:col-span-4">
            <motion.div
              whileHover={{ scale: 1.02, rotateX: 1.2, rotateY: -1.2 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="relative z-10"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="mb-4 block font-headline text-sm font-bold uppercase tracking-[0.2em] text-primary-container">
                Specialization 02
              </span>
              <h3 className="mb-4 font-headline text-3xl font-bold text-on-surface">Full-Stack MERN</h3>
              <p className="mb-8 text-on-surface-variant">
                End-to-end web engineering with Next.js, Node.js, Express, MySQL, Prisma, Supabase, and Zustand for
                scalable, type-safe applications.
              </p>
              <div className="flex flex-wrap gap-3">
                {fullstackSkills.slice(0, 6).map((skill) => (
                  <SkillChip key={skill.name} label={skill.name} />
                ))}
              </div>
            </motion.div>
          </StaggerItem>

          <StaggerItem className="group relative overflow-hidden rounded-xl bg-surface-container-low p-8 transition-all duration-500 hover:bg-surface-container-high md:col-span-4">
            <motion.div
              whileHover={{ scale: 1.02, rotateX: 1.2, rotateY: -1.2 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="relative z-10"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="mb-4 block font-headline text-sm font-bold uppercase tracking-[0.2em] text-primary-container">
                Specialization 03
              </span>
              <h3 className="mb-4 font-headline text-3xl font-bold text-on-surface">Desktop Engineering</h3>
              <p className="mb-8 text-on-surface-variant">
                Native Electron applications with secure IPC, offline-first patterns, and production-grade database
                integration.
              </p>
              <div className="flex flex-wrap gap-3">
                {desktopSkills.map((skill) => (
                  <SkillChip key={skill.name} label={skill.name} />
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
          <LayoutGroup>
            <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-6">
              {visibleSkills.map((item) => {
                return (
                  <StaggerItem key={item.name}>
                    <motion.div
                      layout
                      whileHover={{ y: -4, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 240, damping: 18 }}
                      className="flex h-full flex-col items-center justify-center gap-4 rounded-xl border border-outline-variant/10 bg-surface-container-high/40 p-6 transition-colors hover:border-primary-container/40 sm:p-8"
                    >
                      <span className="text-center font-label text-xs font-bold uppercase tracking-[0.15em] text-secondary sm:text-sm sm:tracking-[0.2em]">
                        {item.name}
                      </span>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </LayoutGroup>
        </div>
      </motion.section>
    </>
  );
}
