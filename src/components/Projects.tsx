"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { onlyVerified, projects } from "@/constants";
import { Stagger, StaggerItem } from "./motion";

export function Projects() {
  const visibleProjects = onlyVerified(projects).filter((project) => project.kind === "project");
  const regularProjects = visibleProjects.filter((project) => !project.flagship);
  const highlightedProject = visibleProjects.find((project) => project.flagship);

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8" id="projects">
      <h2 className="mb-16 font-headline text-4xl font-bold uppercase tracking-tightest text-on-surface">
        Featured Projects
      </h2>

      <LayoutGroup>
        <Stagger className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {regularProjects.map((project) => {
              return (
                <StaggerItem
                  key={project.id}
                  className="group overflow-hidden rounded-xl bg-surface-container-low/50 backdrop-blur-glass"
                >
                  <motion.div
                    layout
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ type: "spring", stiffness: 230, damping: 18 }}
                    className="h-full"
                  >
                    <div className="p-6">
                      <h4 className="mb-2 font-headline text-xl font-bold text-on-surface">{project.name}</h4>
                      <p className="mb-4 text-sm text-on-surface-variant">{project.description}</p>
                      <div className="mb-4 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-outline-variant/20 bg-surface-container-highest px-3 py-1 font-label text-[10px] uppercase text-secondary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 font-headline text-xs font-bold uppercase tracking-[0.2em] text-primary-container"
                        >
                          Learn More
                        </a>
                      ) : null}
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </AnimatePresence>

          {highlightedProject && (
            <StaggerItem className="overflow-hidden rounded-xl bg-surface-container-low/50 backdrop-blur-glass md:col-span-2 lg:col-span-3">
              <motion.div
                layout
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="flex flex-col md:flex-row"
              >
                <div className="flex flex-col justify-center p-8">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    {highlightedProject.badge ? (
                      <span className="rounded bg-primary-container px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                        {highlightedProject.badge}
                      </span>
                    ) : null}
                    <span className="font-label text-xs text-on-surface-variant">{highlightedProject.status}</span>
                  </div>
                  <h4 className="mb-4 font-headline text-2xl font-bold text-on-surface sm:text-3xl">
                    {highlightedProject.name}
                  </h4>
                  <p className="mb-6 leading-relaxed text-on-surface-variant">{highlightedProject.description}</p>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {highlightedProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-outline-variant/20 bg-surface-container-highest px-3 py-1.5 font-label text-xs uppercase text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          )}
        </Stagger>
      </LayoutGroup>
    </section>
  );
}
