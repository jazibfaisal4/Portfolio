import { SHOW_UNVERIFIED } from "./profile";

export { SHOW_UNVERIFIED, profile } from "./profile";
export type { Profile, SocialLink } from "./profile";

export { pipelineNodes, pipelineUi, pipelineTiming } from "./pipelineNodes";
export type { PipelineNode } from "./pipelineNodes";

export { about } from "./about";
export type { AboutCopy, AboutFact } from "./about";

export { skills, skillFilters, skillCategoryLabels, skillsCopy } from "./skills";
export type { Skill, SkillCategory, SkillFilter, SkillFilterId } from "./skills";

export { projects, projectsCopy, simulatorTiming } from "./projects";
export type {
  Project,
  ProjectGroup,
  ProjectMediaImage,
  ProjectMediaVideo,
  SimulatorLine,
} from "./projects";

export { experience, experienceCopy, experienceDates, experienceDateTime } from "./experience";
export type { ExperienceItem } from "./experience";

export { pinnedRepos } from "./repos";
export type { PinnedRepo } from "./repos";

export { education } from "./education";
export type { EducationItem } from "./education";

export { navLinks } from "./navLinks";
export type { NavLink } from "./navLinks";

export {
  assistant,
  sourceTitles,
  sourceTitle,
  formatTelemetry,
  MESSAGE_MAX_LENGTH,
  MESSAGE_COUNTER_AT,
  HISTORY_LIMIT,
} from "./assistant";
export type { TelemetryInput } from "./assistant";

export function onlyVerified<T extends { verified: boolean }>(items: readonly T[]): T[] {
  if (SHOW_UNVERIFIED) {
    return [...items];
  }
  return items.filter((item) => item.verified);
}
