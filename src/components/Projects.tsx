"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { featuredProjects } from "@/constants";
import { Stagger, StaggerItem } from "./motion";

export function Projects() {
  const fyp = featuredProjects[2];
  const regularProjects = featuredProjects.slice(0, 2);

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8" id="projects">
      <h2 className="mb-16 font-headline text-4xl font-bold uppercase tracking-tightest text-on-surface">
        Featured Projects
      </h2>

      <Stagger className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {regularProjects.map((project) => (
          <StaggerItem
            key={project.name}
            className="group overflow-hidden rounded-xl bg-surface-container-low/50 backdrop-blur-glass"
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 230, damping: 18 }}
              className="h-full"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-surface-container-lowest">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={project.name === "Apple 3D Website"}
                />
              </div>
              <div className="p-6">
                <h4 className="mb-2 font-headline text-xl font-bold text-on-surface">{project.name}</h4>
                <p className="mb-4 text-sm text-on-surface-variant">{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-headline text-xs font-bold uppercase tracking-[0.2em] text-primary-container"
                >
                  Learn More
                </a>
              </div>
            </motion.div>
          </StaggerItem>
        ))}

        <StaggerItem className="overflow-hidden rounded-xl bg-surface-container-low/50 backdrop-blur-glass md:col-span-2 lg:col-span-3">
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="flex flex-col md:flex-row"
          >
            <div className="relative aspect-video overflow-hidden bg-surface-container-lowest md:w-1/2 md:aspect-auto">
              <Image
                src={fyp.image}
                alt={fyp.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:w-1/2">
              <div className="mb-4 flex items-center gap-2">
                <span className="rounded bg-primary-container px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                  Final Year Project
                </span>
                <span className="font-label text-xs text-on-surface-variant">Electron.js / React</span>
              </div>
              <h4 className="mb-4 font-headline text-3xl font-bold text-on-surface">{fyp.name}</h4>
              <p className="mb-6 leading-relaxed text-on-surface-variant">{fyp.description}</p>
              <button
                className="w-fit rounded-full bg-surface-container-highest px-8 py-3 font-headline text-sm font-bold uppercase tracking-tightest text-on-surface transition-colors hover:bg-primary-container hover:text-white"
                type="button"
              >
                Explore Technical Case Study
              </button>
            </div>
          </motion.div>
        </StaggerItem>
      </Stagger>
    </section>
  );
}
