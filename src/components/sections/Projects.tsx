"use client";

import { useEffect } from "react";
import {
  onlyVerified,
  projects,
  projectsCopy,
  type Project,
} from "@/constants";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { FlagshipCard, ProjectCard } from "@/components/projects";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

function isFlagship(project: Project) {
  return Boolean(project.flagship);
}

export function Projects() {
  const verified = onlyVerified(projects);
  const flagship = verified.find(isFlagship);
  const rest = verified.filter((project) => project.kind === "project" && !project.flagship);
  const repos = verified.filter((project) => project.kind === "repo");

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      return;
    }
    if (!flagship) {
      return;
    }
    const words = flagship.description.trim().split(/\s+/).filter(Boolean).length;
    console.assert(words <= 45, `Flagship description is ${words} words; max 45`);
  }, [flagship]);

  const staggerItems: Project[] = flagship ? [flagship, ...rest] : rest;

  return (
    <Section id="projects">
      <Container>
        <Reveal>
          <SectionHeader index={projectsCopy.index} title={projectsCopy.title} intro={projectsCopy.intro} />
        </Reveal>

        <Stagger className="mt-8 grid min-w-0 grid-cols-1 items-start gap-4 md:mt-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {staggerItems.map((project) =>
            project.flagship ? (
              <StaggerItem key={project.id} className="min-w-0 md:col-span-2 lg:col-span-3">
                <FlagshipCard project={project} />
              </StaggerItem>
            ) : (
              <StaggerItem key={project.id} className="min-w-0">
                <ProjectCard project={project} />
              </StaggerItem>
            ),
          )}
        </Stagger>

        {repos.length > 0 ? (
          <div className="mt-10 md:mt-12">
            <h3 className="text-h3 text-text">{projectsCopy.reposTitle}</h3>
            <Stagger className="mt-6 grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              {repos.map((project) => (
                <StaggerItem key={project.id} className="min-w-0">
                  <ProjectCard project={project} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
