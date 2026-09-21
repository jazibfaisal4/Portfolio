"use client";

import dynamic from "next/dynamic";
import { onlyVerified, pipelineNodes, projects, type Project } from "@/constants";
import { Chip } from "@/components/ui/Chip";
import { Card } from "@/components/ui/Card";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { TagList } from "@/components/ui/TagList";
import { ExpandableText } from "./ExpandableText";
import { PipelineStrip } from "./PipelineStrip";

const stageNames = onlyVerified(pipelineNodes).map((node) => node.name);

function SimulatorLoading() {
  const label = projects.find((item) => item.flagship)?.simulator?.label ?? "";

  return (
    <div className="flex min-h-[22rem] flex-col rounded-lg border border-line bg-surface p-4 md:min-h-[24rem] md:p-5">
      {label ? <p className="text-label text-accent">{label}</p> : null}
    </div>
  );
}

const InterviewSimulator = dynamic(() => import("./InterviewSimulator"), {
  loading: SimulatorLoading,
});

type FlagshipCardProps = {
  project: Project;
};

export function FlagshipCard({ project }: FlagshipCardProps) {
  const simulator = project.simulator;
  const images = project.images ?? [];
  const video = project.video;

  return (
    <Card variant="featured" className="min-w-0 p-4 md:p-6 lg:p-8">
      <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
        <div className="flex min-w-0 flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2">
            {project.badge ? <Chip preserveCase>{project.badge}</Chip> : null}
            <span className="inline-flex items-center gap-2 text-label text-accent">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              {project.status}
            </span>
          </div>
          <h3 className="text-h3 text-text [overflow-wrap:anywhere]">{project.name}</h3>
          <ExpandableText text={project.description} />
          {stageNames.length > 0 ? <PipelineStrip names={stageNames} /> : null}
          {project.stack.length > 0 ? <TagList tags={project.stack} /> : null}
          {/* TODO(jazib): add repository or demo links for the interview system */}
        </div>

        {simulator ? (
          <InterviewSimulator label={simulator.label} lines={simulator.lines} />
        ) : null}
      </div>

      {images.length > 0 || video ? (
        <div className="mt-8 grid min-w-0 gap-4 md:grid-cols-2 md:gap-6">
          {images.map((image) => (
            <MediaFrame
              key={image.alt}
              src={image.src}
              alt={image.alt}
              sizes="(min-width: 1024px) 520px, (min-width: 768px) 45vw, 100vw"
            />
          ))}
          {video ? (
            <MediaFrame
              videoSrc={video.src}
              poster={video.poster}
              alt={video.title}
              sizes="(min-width: 1024px) 520px, (min-width: 768px) 45vw, 100vw"
            />
          ) : null}
        </div>
      ) : null}
    </Card>
  );
}
