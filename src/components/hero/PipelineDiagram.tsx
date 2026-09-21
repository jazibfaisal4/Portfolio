"use client";

import {
  type KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import { onlyVerified, pipelineNodes, pipelineUi } from "@/constants";
import { Button } from "@/components/ui/Button";
import { useOnScreen } from "@/hooks/useOnScreen";
import { usePointerFine } from "@/hooks/usePointerFine";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { revealOffset, staggerDelay, tween } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { NodePanel } from "./NodePanel";
import { PipelineNode } from "./PipelineNode";
import { concatPolylines, edgePolyline, pointAt, polylineToPath, type Point } from "./path";
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

function measureCenters(root: HTMLElement, wraps: Map<number, HTMLDivElement>): Point[] {
  const origin = root.getBoundingClientRect();
  return nodes.map((node) => {
    const el = wraps.get(node.id);
    if (!el) return { x: 0, y: 0 };
    const box = el.getBoundingClientRect();
    return {
      x: box.left - origin.left + box.width / 2,
      y: box.top - origin.top + box.height / 2,
    };
  });
}

export function PipelineDiagram() {
  const panelId = useId();
  const liveId = useId();
  const gridRef = useRef<HTMLDivElement>(null);
  const wrapRefs = useRef(new Map<number, HTMLDivElement>());
  const buttonRefs = useRef(new Map<number, HTMLButtonElement>());
  const pathRef = useRef<Point[]>([]);
  const dotRef = useRef<HTMLSpanElement>(null);

  const [layout, setLayout] = useState<{ w: number; h: number; centers: Point[] }>({
    w: 0,
    h: 0,
    centers: [],
  });
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [focusedId, setFocusedId] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [rovingId, setRovingId] = useState(nodes[0]?.id ?? 1);

  const hoverEnabled = usePointerFine();
  const reducedMotion = usePrefersReducedMotion();
  const canRun = useOnScreen(gridRef);
  const { mode, stepIndex, startTrace, setOnFrame } = usePipelinePulse({
    reducedMotion,
    canRun,
    nodeCount: nodes.length,
  });

  const selected = nodes.find((node) => node.id === selectedId) ?? null;
  const highlightId = hoveredId ?? focusedId;
  const dimOthers = highlightId != null;

  const setWrapRef = useCallback((id: number, el: HTMLDivElement | null) => {
    if (el) wrapRefs.current.set(id, el);
    else wrapRefs.current.delete(id);
  }, []);

  const setButtonRef = useCallback((id: number, el: HTMLButtonElement | null) => {
    if (el) buttonRefs.current.set(id, el);
    else buttonRefs.current.delete(id);
  }, []);

  useLayoutEffect(() => {
    const root = gridRef.current;
    if (!root) return;

    function update() {
      const next = gridRef.current;
      if (!next) return;
      const box = next.getBoundingClientRect();
      const centers = measureCenters(next, wrapRefs.current);
      const segments = [];
      for (let i = 1; i < centers.length; i += 1) {
        segments.push(edgePolyline(centers[i - 1], centers[i]));
      }
      pathRef.current = concatPolylines(segments);
      setLayout({ w: box.width, h: box.height, centers });
    }

    update();
    const observer = new ResizeObserver(update);
    observer.observe(root);
    for (const el of wrapRefs.current.values()) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    setOnFrame((t, pulseMode) => {
      const dot = dotRef.current;
      if (!dot) return;
      if (t <= 0 || t >= 1) {
        dot.style.opacity = "0";
        return;
      }
      const pt = pointAt(pathRef.current, t);
      dot.style.opacity = pulseMode === "idle" ? "0.7" : "1";
      dot.style.transform = `translate3d(${pt.x - 5}px, ${pt.y - 5}px, 0)`;
    });
  }, [setOnFrame]);

  useEffect(() => {
    function onKey(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") setSelectedId(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const edges = useMemo(() => {
    if (layout.centers.length < 2 || layout.w === 0) return [];
    const list: { key: string; d: string; from: number; to: number }[] = [];
    for (let i = 1; i < nodes.length; i += 1) {
      const from = layout.centers[i - 1];
      const to = layout.centers[i];
      if (!from || !to) continue;
      list.push({
        key: `${nodes[i - 1].id}-${nodes[i].id}`,
        d: polylineToPath(edgePolyline(from, to)),
        from: nodes[i - 1].id,
        to: nodes[i].id,
      });
    }
    return list;
  }, [layout]);

  function selectNode(id: number) {
    setSelectedId((current) => (current === id ? null : id));
    setRovingId(id);
  }

  function focusNode(id: number) {
    setRovingId(id);
    buttonRefs.current.get(id)?.focus();
  }

  function onNodeKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>, id: number) {
    const index = nodes.findIndex((node) => node.id === id);
    if (index < 0) return;

    if (event.key === "Escape") {
      event.preventDefault();
      setSelectedId(null);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      if (nodes[0]) focusNode(nodes[0].id);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      const last = nodes[nodes.length - 1];
      if (last) focusNode(last.id);
      return;
    }

    const delta =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? -1
          : 0;

    if (!delta) return;
    event.preventDefault();
    const next = nodes[(index + delta + nodes.length) % nodes.length];
    if (next) focusNode(next.id);
  }

  const tracing = mode === "trace";
  const liveText = tracing
    ? reducedMotion && stepIndex >= 0
      ? `${pipelineUi.illustrative}: ${nodes[stepIndex]?.name ?? ""}`
      : pipelineUi.tracing
    : "";

  return (
    <div className="flex h-full flex-col gap-4 rounded-lg border border-line bg-surface-2 p-4 md:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-h-11 items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-live" aria-hidden="true" />
          <p className="text-label text-text">{pipelineUi.title}</p>
        </div>
        <Button
          variant="secondary"
          onClick={startTrace}
          disabled={tracing}
          aria-describedby={liveId}
          className="w-full sm:w-auto"
        >
          {pipelineUi.trace}
        </Button>
      </div>
      <p className="text-label text-accent">{pipelineUi.illustrative}</p>

      <motion.div
        ref={gridRef}
        className="relative z-10 grid grid-cols-2 gap-4 xl:grid-cols-3"
        initial="hidden"
        animate="show"
        variants={nodeList}
        role="group"
        aria-label={pipelineUi.title}
        aria-busy={tracing}
      >
        {layout.w > 0 ? (
          <svg
            width={layout.w}
            height={layout.h}
            viewBox={`0 0 ${layout.w} ${layout.h}`}
            className="pointer-events-none absolute inset-0 z-0 overflow-visible"
            aria-hidden="true"
          >
            {edges.map((edge) => {
              const on =
                highlightId == null || highlightId === edge.from || highlightId === edge.to;
              return (
                <path
                  key={edge.key}
                  d={edge.d}
                  fill="none"
                  stroke={on && dimOthers ? "var(--accent)" : "var(--line)"}
                  strokeWidth={on && dimOthers ? 2 : 1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={dimOthers && !on ? 0.25 : dimOthers ? 1 : 0.7}
                  className="transition-[stroke,opacity] duration-200 ease-out"
                />
              );
            })}
          </svg>
        ) : null}

        <span
          ref={dotRef}
          aria-hidden="true"
          className="pointer-events-none absolute z-20 h-2.5 w-2.5 rounded-full bg-accent"
          style={{ opacity: 0, top: 0, left: 0 }}
        />

        {nodes.map((node) => (
          <div key={node.id} ref={(el) => setWrapRef(node.id, el)} className="relative z-10 min-w-0">
            <motion.div data-motion="" variants={nodeItem} className="h-full">
              <PipelineNode
                node={node}
                nodeRef={(el) => setButtonRef(node.id, el)}
                pressed={selectedId === node.id}
                highlighted={highlightId === node.id}
                dimmed={dimOthers && highlightId !== node.id}
                tabIndex={rovingId === node.id ? 0 : -1}
                controlsId={panelId}
                onSelect={selectNode}
                onHoverChange={setHoveredId}
                onFocusChange={setFocusedId}
                onKeyDown={onNodeKeyDown}
                hoverEnabled={hoverEnabled}
              />
            </motion.div>
          </div>
        ))}
      </motion.div>

      <p id={liveId} className="sr-only" aria-live="polite">
        {liveText}
      </p>

      {reducedMotion && tracing ? (
        <div
          id={panelId}
          role="status"
          aria-live="polite"
          className="rounded-md border border-line bg-bg/60 p-4"
        >
          <p className="text-label text-accent">{pipelineUi.illustrative}</p>
          <ol className="mt-3 flex flex-col gap-1">
            {nodes.map((node, index) => (
              <li
                key={node.id}
                className={cn("text-small", index === stepIndex ? "text-accent" : "text-text-dim")}
              >
                {node.name}
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <NodePanel id={panelId} node={selected} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
}
