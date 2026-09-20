"use client";

import { motion } from "framer-motion";
import { experience } from "@/constants";
import { Stagger, StaggerItem } from "./motion";

export function Experience() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8" id="experience">
      <h2 className="mb-16 font-headline text-4xl font-bold uppercase tracking-tightest text-on-surface">
        Experience
      </h2>
      <Stagger className="space-y-8">
        {experience.map((item) => (
          <StaggerItem key={item.company}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="rounded-xl bg-surface-container-low p-8"
            >
              <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-headline text-2xl font-bold text-on-surface">{item.role}</h3>
                  <p className="mt-1 font-body text-primary-container">{item.company}</p>
                </div>
                <div className="text-right">
                  <p className="font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant">
                    {item.period}
                  </p>
                  <p className="font-label text-xs text-on-surface-variant">{item.location}</p>
                </div>
              </div>
              <ul className="space-y-3">
                {item.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-3 font-body text-sm leading-relaxed text-on-surface-variant"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-container" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
