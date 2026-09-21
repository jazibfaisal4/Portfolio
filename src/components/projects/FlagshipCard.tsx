"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  onlyVerified,
  pipelineNodes,
  projects,
  projectsCopy,
  type Project,
  type ProjectMediaImage,
} from "@/constants";
import { Chip } from "@/components/ui/Chip";
import { Card } from "@/components/ui/Card";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { TagList } from "@/components/ui/TagList";
import { cn } from "@/lib/cn";
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

const FLAGSHIP_SINGLE_SIZES = "(min-width: 1024px) 520px, (min-width: 768px) 45vw, calc(100vw - 4.5rem)";
const FLAGSHIP_SWITCHER_SIZES =
  "(min-width: 1024px) 1056px, (min-width: 768px) calc(100vw - 7rem), calc(100vw - 4.5rem)";

function ScreenshotSwitcher({
  images,
  sizes,
}: {
  images: readonly ProjectMediaImage[];
  sizes: string;
}) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  if (!current) {
    return null;
  }

  return (
    <div className="min-w-0">
      <MediaFrame
        src={current.src}
        alt={current.alt}
        caption={current.caption}
        width={current.width}
        height={current.height}
        sizes={sizes}
      />
      <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label={projectsCopy.screenshotSwitcher}>
        {images.map((image, index) => (
          <button
            key={image.alt}
            type="button"
            aria-pressed={index === active}
            aria-label={image.switcherAriaLabel ?? image.alt}
            onClick={() => setActive(index)}
            className={cn(
              "inline-flex min-h-11 min-w-[44px] flex-col items-center justify-center rounded border px-3 py-1.5 text-label transition-[border-color,color] duration-160 ease-out",
              index === active
                ? "border-accent text-accent"
                : "border-line text-text-dim hover-ok:border-line-strong hover-ok:text-text",
            )}
          >
            {image.switcherLabel ?? String(index + 1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export function FlagshipCard({ project }: FlagshipCardProps) {
  const simulator = project.simulator;
  const images = project.images ?? [];
  const video = project.video;
  const useSwitcher = images.length > 1;

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
        <div
          className={cn(
            "mt-8 grid min-w-0 gap-4",
            !useSwitcher ? "md:grid-cols-2 md:gap-6" : "",
          )}
        >
          {useSwitcher ? (
            <ScreenshotSwitcher images={images} sizes={FLAGSHIP_SWITCHER_SIZES} />
          ) : (
            images.map((image) => (
              <MediaFrame
                key={image.alt}
                src={image.src}
                alt={image.alt}
                caption={image.caption}
                width={image.width}
                height={image.height}
                sizes={FLAGSHIP_SINGLE_SIZES}
              />
            ))
          )}
          {video ? (
            <MediaFrame
              videoSrc={video.src}
              poster={video.poster}
              alt={video.title}
              sizes={useSwitcher ? FLAGSHIP_SWITCHER_SIZES : FLAGSHIP_SINGLE_SIZES}
            />
          ) : null}
        </div>
      ) : null}
    </Card>
  );
}
