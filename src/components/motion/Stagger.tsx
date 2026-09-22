"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { duration, easing, revealOffset, revealViewport, staggerDelay, tween } from "@/lib/motion";
import { cn } from "@/lib/cn";

type StaggerPlay = "view" | "mount";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** `view` plays once in viewport. `mount` plays on mount — pair with a remount `key`. */
  play?: StaggerPlay;
};

export function Stagger({ children, className, play = "view" }: StaggerProps) {
  const reducedMotion = usePrefersReducedMotion();
  const playOnMount = play === "mount";
  const skipReveal = reducedMotion;

  return (
    <motion.div
      className={cn(className)}
      data-motion=""
      initial={skipReveal ? false : "hidden"}
      animate={skipReveal || playOnMount ? "show" : undefined}
      whileInView={skipReveal || playOnMount ? undefined : "show"}
      viewport={skipReveal || playOnMount ? undefined : revealViewport}
      variants={{
        hidden: playOnMount ? { opacity: 0 } : {},
        show: {
          opacity: 1,
          transition: skipReveal
            ? { duration: 0, staggerChildren: 0 }
            : playOnMount
              ? { duration: duration.filter, ease: easing, staggerChildren: 0 }
              : { staggerChildren: staggerDelay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  layout?: boolean;
};

export function StaggerItem({ children, className, layout = false }: StaggerItemProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      data-motion=""
      className={cn(className)}
      layout={layout && !reducedMotion}
      initial={reducedMotion ? false : undefined}
      animate={reducedMotion ? "show" : undefined}
      transition={layout && !reducedMotion ? { layout: tween.filter } : undefined}
      variants={{
        hidden: { opacity: 0, y: revealOffset },
        show: {
          opacity: 1,
          y: 0,
          transition: reducedMotion ? { duration: 0 } : tween.base,
        },
      }}
    >
      {children}
    </motion.div>
  );
}
