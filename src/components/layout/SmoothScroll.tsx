"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useMounted } from "@/hooks/useMounted";
import { usePointerFine } from "@/hooks/usePointerFine";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { lenisLerp } from "@/lib/motion";

export type ScrollTarget = string | HTMLElement | number;

type SmoothScrollApi = {
  scrollTo: (target: ScrollTarget, offset?: number) => void;
  setPaused: (next: boolean) => void;
  isActive: boolean;
};

let lenisInstance: Lenis | null = null;
let paused = false;

export function getSectionOffsetPx(): number {
  if (typeof document === "undefined") return 80;
  const probe = document.createElement("div");
  probe.style.cssText =
    "position:absolute;visibility:hidden;pointer-events:none;height:var(--section-offset)";
  document.documentElement.appendChild(probe);
  const value = probe.getBoundingClientRect().height;
  probe.remove();
  return value || 80;
}

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

function getAbsoluteY(target: ScrollTarget, offset: number): number | null {
  if (typeof target === "number") return Math.max(0, target + offset);

  if (typeof target === "string") {
    const key = target.toLowerCase();
    if (key === "top" || key === "start") return Math.max(0, offset);
    if (key === "bottom" || key === "end") {
      return Math.max(0, document.documentElement.scrollHeight + offset);
    }
    const element = document.querySelector(target);
    if (!(element instanceof HTMLElement)) return null;
    return Math.max(0, element.getBoundingClientRect().top + window.scrollY + offset);
  }

  return Math.max(0, target.getBoundingClientRect().top + window.scrollY + offset);
}

/**
 * Scroll to a target. Uses Lenis when smooth scroll is active, otherwise
 * CSS `scroll-behavior: smooth` (or instant when the user prefers reduced motion).
 *
 * Nested scroll areas (chat messages, mobile menu, code blocks) must set
 * `data-lenis-prevent` so Lenis does not capture wheel or touch inside them.
 */
export function scrollTo(target: ScrollTarget, offset?: number) {
  if (typeof window === "undefined") return;
  if (paused) return;

  const resolvedOffset = offset ?? -getSectionOffsetPx();
  const top = getAbsoluteY(target, resolvedOffset);
  if (top == null) return;
  if (Math.abs(window.scrollY - top) < 1) return;

  const lenis = lenisInstance;
  if (lenis && !lenis.isStopped) {
    const from = window.scrollY;
    lenis.scrollTo(top, { offset: 0, programmatic: true });
    requestAnimationFrame(() => {
      if (Math.abs(window.scrollY - from) < 1 && Math.abs(window.scrollY - top) > 1) {
        window.scrollTo({ top, behavior: scrollBehavior() });
      }
    });
    return;
  }

  window.scrollTo({ top, behavior: scrollBehavior() });
}

/** Pause Lenis while the mobile menu is open. No-op when Lenis is not running. */
export function setSmoothScrollPaused(next: boolean) {
  paused = next;
  if (!lenisInstance) return;
  if (next) lenisInstance.stop();
  else lenisInstance.start();
}

const SmoothScrollContext = createContext<SmoothScrollApi>({
  scrollTo,
  setPaused: setSmoothScrollPaused,
  isActive: false,
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const mounted = useMounted();
  const pointerFine = usePointerFine();
  const reducedMotion = usePrefersReducedMotion();
  const isActive = mounted && pointerFine && !reducedMotion;

  useEffect(() => {
    if (!isActive) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: lenisLerp,
      smoothWheel: true,
      syncTouch: false,
      anchors: true,
      respectReducedMotion: true,
    });

    lenisInstance = lenis;
    if (paused) lenis.stop();

    return () => {
      lenis.destroy();
      if (lenisInstance === lenis) lenisInstance = null;
    };
  }, [isActive]);

  const value = useMemo<SmoothScrollApi>(
    () => ({
      scrollTo,
      setPaused: setSmoothScrollPaused,
      isActive,
    }),
    [isActive],
  );

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
}
