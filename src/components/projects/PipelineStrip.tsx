import { projectsCopy } from "@/constants";

type PipelineStripProps = {
  names: readonly string[];
};

export function PipelineStrip({ names }: PipelineStripProps) {
  return (
    <ol
      aria-label={projectsCopy.pipelineLabel}
      className="flex flex-wrap items-center gap-x-2 gap-y-2"
    >
      {names.map((name, index) => (
        <li key={name} className="flex min-w-0 items-center gap-2">
          {index > 0 ? (
            <span className="text-label text-text-dim" aria-hidden="true">
              →
            </span>
          ) : null}
          <span className="min-w-0 break-words rounded-full border border-line bg-surface px-3 py-1 text-label text-text [overflow-wrap:anywhere]">
            {name}
          </span>
        </li>
      ))}
    </ol>
  );
}
