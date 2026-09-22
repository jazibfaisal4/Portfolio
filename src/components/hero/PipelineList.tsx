"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { onlyVerified, pipelineNodes, pipelineUi } from "@/constants";
import { Button } from "@/components/ui/Button";
import { TagList } from "@/components/ui/TagList";
import { useOnScreen } from "@/hooks/useOnScreen";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { revealOffset, staggerDelay, tween } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { usePipelinePulse } from "./usePipelinePulse";

const nodes = onlyVerified(pipelineNodes);

const nodeItem = {
  hidden: { opacity: 0, y: revealOffset },
  show: { opacity: 1, y: 0, transition: tween.hero },
};

const nodeList = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: staggerDelay * 4,
    },
  },
};

export function PipelineList() {
  const liveId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const [openId, setOpenId] = useState<number | null>(null);

  const reducedMotion = usePrefersReducedMotion();
  const canRun = useOnScreen(rootRef);
  const { mode, stepIndex, startTrace, setOnFrame } = usePipelinePulse({
    reducedMotion,
    canRun,
    nodeCount: nodes.length,
  });

  useLayoutEffect(() => {
    setOnFrame((t, pulseMode) => {
      const dot = dotRef.current;
      const track = trackRef.current;
      if (!dot || !track) return;
      if (t <= 0 || t >= 1) {
        dot.style.opacity = "0";
        return;
      }
      const travel = Math.max(track.offsetHeight - 10, 0);
      dot.style.opacity = pulseMode === "idle" ? "0.7" : "1";
      dot.style.transform = `translate3d(0, ${t * travel}px, 0)`;
    });
  }, [setOnFrame]);

  const tracing = mode === "trace";
  const liveText = tracing
    ? reducedMotion && stepIndex >= 0
      ? `${pipelineUi.illustrative}: ${nodes[stepIndex]?.name ?? ""}`
      : pipelineUi.tracing
    : "";

  useEffect(() => {
    function onKey(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") setOpenId(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function toggle(id: number) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <div
      ref={rootRef}
      className="flex flex-col gap-4 rounded-lg border border-line bg-surface-2 p-4"
    >
      <div className="flex flex-col gap-3">
        <div className="flex min-h-11 items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-live" aria-hidden="true" />
          <p className="text-label text-text">{pipelineUi.title}</p>
        </div>
        <p className="text-label text-accent">{pipelineUi.illustrative}</p>
        <Button
          variant="secondary"
          onClick={startTrace}
          disabled={tracing}
          aria-describedby={liveId}
          className="w-full"
        >
          {pipelineUi.trace}
        </Button>
      </div>

      <p id={liveId} className="sr-only" aria-live="polite">
        {liveText}
      </p>

      {reducedMotion && tracing ? (
        <ol className="flex flex-col gap-2" aria-live="polite">
          {nodes.map((node, index) => (
            <li
              key={node.id}
              className={cn(
                "text-small",
                index === stepIndex ? "text-accent" : "text-text-dim",
              )}
            >
              {node.name}
            </li>
          ))}
        </ol>
      ) : null}

      <div className="relative">
        <div
          ref={trackRef}
          className="absolute bottom-3 left-[21px] top-3 w-px bg-line"
          aria-hidden="true"
        />
        <span
          ref={dotRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-[16px] top-3 z-10 h-2.5 w-2.5 rounded-full bg-accent"
          style={{ opacity: 0, willChange: "transform" }}
        />

        <motion.ul
          className="flex flex-col gap-3"
          initial="hidden"
          animate="show"
          variants={nodeList}
        >
          {nodes.map((node) => {
            const open = openId === node.id;
            const panelId = `pipeline-list-panel-${node.name.replace(/\s+/g, "-").toLowerCase()}`;
            return (
              <motion.li key={node.id} data-motion="" variants={nodeItem} className="relative pl-10">
                <span
                  className="absolute left-[17px] top-5 z-10 h-2.5 w-2.5 rounded-full border border-accent bg-surface"
                  aria-hidden="true"
                />
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => toggle(node.id)}
                  className={cn(
                    "flex min-h-11 w-full flex-col items-start justify-center gap-1 rounded-lg border bg-surface px-4 py-3 text-left transition-[border-color] duration-200 ease-out",
                    open ? "border-accent" : "border-line",
                  )}
                >
                  <span className="text-small font-medium text-text">{node.name}</span>
                  {node.status ? (
                    <span className="text-label text-accent">{node.status}</span>
                  ) : null}
                </button>
                {open ? (
                  <div
                    id={panelId}
                    role="region"
                    className="mt-2 rounded-md border border-line bg-bg/60 p-4"
                  >
                    <p className="text-label text-accent">{pipelineUi.whatIBuilt}</p>
                    <p className="mt-2 text-small text-text-dim">{node.summary}</p>
                    {node.tags.length > 0 ? <TagList className="mt-3" tags={node.tags} /> : null}
                  </div>
                ) : null}
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </div>
  );
}
