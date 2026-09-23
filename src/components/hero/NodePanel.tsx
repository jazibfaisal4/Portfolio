"use client";

import type { PipelineNode as PipelineNodeData } from "@/constants";
import { pipelineUi } from "@/constants";
import { Button } from "@/components/ui/Button";
import { TagList } from "@/components/ui/TagList";

type NodePanelProps = {
  id: string;
  node: PipelineNodeData | null;
  onClose: () => void;
};

export function NodePanel({ id, node, onClose }: NodePanelProps) {
  return (
    <div
      id={id}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="rounded-md border border-line bg-bg/60 p-4"
    >
      {node ? (
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <p className="text-h3 text-text">{node.name}</p>
            <Button variant="ghost" onClick={onClose} className="shrink-0 px-3">
              {pipelineUi.close}
            </Button>
          </div>
          <p className="text-label text-accent">{pipelineUi.whatIBuilt}</p>
          <p className="text-small text-text-dim">{node.summary}</p>
          {node.status ? <p className="text-label text-accent">{node.status}</p> : null}
          {node.tags.length > 0 ? <TagList tags={node.tags} /> : null}
        </div>
      ) : (
        <p className="text-small text-text-dim">{pipelineUi.selectHint}</p>
      )}
    </div>
  );
}
