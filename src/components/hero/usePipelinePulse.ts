"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { pipelineTiming } from "@/constants";

export type PulseMode = "off" | "idle" | "trace";

type FrameCallback = (progress: number, mode: PulseMode) => void;

type Options = {
  reducedMotion: boolean;
  canRun: boolean;
  nodeCount: number;
};

export function usePipelinePulse({ reducedMotion, canRun, nodeCount }: Options) {
  const [mode, setMode] = useState<PulseMode>("off");
  const [stepIndex, setStepIndex] = useState(-1);

  const modeRef = useRef<PulseMode>("off");
  const canRunRef = useRef(canRun);
  const elapsedRef = useRef(0);
  const startRef = useRef(0);
  const rafRef = useRef(0);
  const stepTimerRef = useRef(0);
  const stepRef = useRef(-1);
  const onFrameRef = useRef<FrameCallback>(() => {});
  const tickRef = useRef<(now: number) => void>(() => {});
  const finishRef = useRef<() => void>(() => {});

  const stopRaf = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  }, []);

  const stopSteps = useCallback(() => {
    if (stepTimerRef.current) {
      window.clearInterval(stepTimerRef.current);
      stepTimerRef.current = 0;
    }
  }, []);

  const finish = useCallback(() => {
    stopRaf();
    stopSteps();
    stepRef.current = -1;
    setStepIndex(-1);
    modeRef.current = "off";
    setMode("off");
    elapsedRef.current = 0;
    onFrameRef.current(0, "off");
  }, [stopRaf, stopSteps]);

  useEffect(() => {
    finishRef.current = finish;
  }, [finish]);

  useEffect(() => {
    tickRef.current = (now: number) => {
      if (!canRunRef.current) {
        rafRef.current = 0;
        return;
      }
      const t = Math.min(1, (now - startRef.current) / pipelineTiming.traceMs);
      elapsedRef.current = t * pipelineTiming.traceMs;
      onFrameRef.current(t, modeRef.current);
      if (t >= 1) {
        finishRef.current();
        return;
      }
      rafRef.current = requestAnimationFrame((stamp) => tickRef.current(stamp));
    };
  }, []);

  const startMotion = useCallback(
    (next: Exclude<PulseMode, "off">) => {
      stopRaf();
      stopSteps();
      modeRef.current = next;
      setMode(next);
      elapsedRef.current = 0;
      startRef.current = performance.now();
      rafRef.current = requestAnimationFrame((stamp) => tickRef.current(stamp));
    },
    [stopRaf, stopSteps],
  );

  const startSteps = useCallback(() => {
    stopRaf();
    stopSteps();
    elapsedRef.current = 0;
    onFrameRef.current(0, "off");
    modeRef.current = "trace";
    setMode("trace");
    stepRef.current = 0;
    setStepIndex(0);
    const count = Math.max(nodeCount, 1);
    const stepMs = pipelineTiming.traceMs / count;
    stepTimerRef.current = window.setInterval(() => {
      if (!canRunRef.current) return;
      const next = stepRef.current + 1;
      if (next >= count) {
        finishRef.current();
        return;
      }
      stepRef.current = next;
      setStepIndex(next);
    }, stepMs);
  }, [nodeCount, stopRaf, stopSteps]);

  const start = useCallback(
    (next: Exclude<PulseMode, "off">) => {
      if (reducedMotion) {
        if (next === "idle") return;
        startSteps();
        return;
      }
      startMotion(next);
    },
    [reducedMotion, startMotion, startSteps],
  );

  useEffect(() => {
    canRunRef.current = canRun;

    if (reducedMotion) {
      if (modeRef.current === "idle") finish();
      return;
    }

    if (!canRun) {
      stopRaf();
      if (modeRef.current === "idle") finish();
      return;
    }

    if (
      modeRef.current === "trace" &&
      !rafRef.current &&
      elapsedRef.current > 0 &&
      elapsedRef.current < pipelineTiming.traceMs
    ) {
      startRef.current = performance.now() - elapsedRef.current;
      rafRef.current = requestAnimationFrame((stamp) => tickRef.current(stamp));
    }
  }, [canRun, finish, reducedMotion, stopRaf]);

  useEffect(() => {
    if (reducedMotion || !canRun) return;
    const id = window.setInterval(() => {
      if (modeRef.current === "off") start("idle");
    }, pipelineTiming.idleEveryMs);
    return () => window.clearInterval(id);
  }, [canRun, reducedMotion, start]);

  useEffect(
    () => () => {
      stopRaf();
      stopSteps();
    },
    [stopRaf, stopSteps],
  );

  const startTrace = useCallback(() => {
    start("trace");
  }, [start]);

  const setOnFrame = useCallback((fn: FrameCallback) => {
    onFrameRef.current = fn;
  }, []);

  return { mode, stepIndex, startTrace, setOnFrame };
}
