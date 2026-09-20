import { SHOW_UNVERIFIED } from "./profile";

export { SHOW_UNVERIFIED, profile } from "./profile";
export type { Profile, SocialLink } from "./profile";

export { pipelineNodes } from "./pipelineNodes";
export type { PipelineNode } from "./pipelineNodes";

export { skills } from "./skills";
export type { Skill, SkillCategory } from "./skills";

export { projects } from "./projects";
export type { Project, SimulatorLine } from "./projects";

export { experience } from "./experience";
export type { ExperienceItem } from "./experience";

export { education } from "./education";
export type { EducationItem } from "./education";

export { navLinks } from "./navLinks";
export type { NavLink } from "./navLinks";

export function onlyVerified<T extends { verified: boolean }>(items: readonly T[]): T[] {
  if (SHOW_UNVERIFIED) {
    return [...items];
  }
  return items.filter((item) => item.verified);
}
