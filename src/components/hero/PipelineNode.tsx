"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import type { PipelineNode as PipelineNodeData } from "@/constants";
import { Chip } from "@/components/ui/Chip";
import { cn } from "@/lib/cn";

type PipelineNodeProps = {
  node: PipelineNodeData;
  pressed: boolean;
  highlighted: boolean;
  dimmed: boolean;
  tabIndex: number;
  controlsId: string;
  nodeRef: (el: HTMLButtonElement | null) => void;
  onSelect: (id: number) => void;
  onHoverChange: (id: number | null) => void;
  onFocusChange: (id: number | null) => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>, id: number) => void;
  hoverEnabled: boolean;
};

export function PipelineNode({
  node,
  pressed,
  highlighted,
  dimmed,
  tabIndex,
  controlsId,
  nodeRef,
  onSelect,
  onHoverChange,
  onFocusChange,
  onKeyDown,
  hoverEnabled,
}: PipelineNodeProps) {
  const previewTag = node.tags[0];

  function handlePointerEnter() {
    if (hoverEnabled) onHoverChange(node.id);
  }

  function handlePointerLeave() {
    if (hoverEnabled) onHoverChange(null);
  }

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    onSelect(node.id);
  }

  return (
    <button
      ref={nodeRef}
      type="button"
      data-pipeline-node={node.id}
      aria-pressed={pressed}
      aria-controls={controlsId}
      tabIndex={tabIndex}
      onClick={handleClick}
      onKeyDown={(event) => onKeyDown(event, node.id)}
      onFocus={() => onFocusChange(node.id)}
      onBlur={() => onFocusChange(null)}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "relative z-10 flex min-h-11 h-full w-full min-w-0 flex-col items-start justify-center gap-2 rounded-lg border bg-surface p-3 text-left transition-[opacity,border-color] duration-200 ease-out",
        highlighted || pressed ? "border-accent" : "border-line",
        dimmed && "opacity-40",
      )}
    >
      <span className="text-small font-medium text-text">{node.name}</span>
      {node.status ? (
        <span className="text-label text-accent">{node.status}</span>
      ) : previewTag ? (
        <Chip preserveCase className="max-w-full min-w-0">
          {previewTag}
        </Chip>
      ) : null}
    </button>
  );
}
