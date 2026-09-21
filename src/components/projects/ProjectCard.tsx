import { projectsCopy, type Project } from "@/constants";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { TagList } from "@/components/ui/TagList";
import { ExpandableText } from "./ExpandableText";
import { cn } from "@/lib/cn";

type ProjectCardProps = {
  project: Project;
};

const LONG_COPY_WORDS = 18;

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const images = project.images ?? [];
  const expandable = wordCount(project.description) > LONG_COPY_WORDS;
  const newTabLabel = `${project.name} (${projectsCopy.opensInNewTab})`;

  return (
    <Card variant="interactive" className="flex h-full min-w-0 flex-col gap-4 p-4 md:p-6">
      <div className="flex flex-wrap items-center gap-2">
        {project.badge ? <Chip preserveCase>{project.badge}</Chip> : null}
        <span className="text-label text-accent">{project.status}</span>
        {project.period ? <span className="text-label text-text-dim">{project.period}</span> : null}
      </div>
      <h3 className="text-h3 text-text [overflow-wrap:anywhere]">{project.name}</h3>
      {expandable ? (
        <ExpandableText text={project.description} />
      ) : (
        <p className="text-body max-w-none text-text-dim [overflow-wrap:anywhere]">{project.description}</p>
      )}
      {project.stack.length > 0 ? <TagList tags={project.stack} /> : null}
      {images.map((image) => (
        <MediaFrame
          key={image.alt}
          src={image.src}
          alt={image.alt}
          className="mt-auto"
          sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, 100vw"
        />
      ))}
      {project.liveUrl ? (
        <Button
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          aria-label={newTabLabel}
          className={cn("w-full sm:w-auto", images.length > 0 ? "mt-2" : "mt-auto")}
        >
          {projectsCopy.viewSite}
        </Button>
      ) : null}
    </Card>
  );
}
