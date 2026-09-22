"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { useMounted } from "@/hooks/useMounted";
import { usePointerFine } from "@/hooks/usePointerFine";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { magneticPullMax, magneticSpring } from "@/lib/motion";
import { cn } from "@/lib/cn";

type MagneticProps = {
  children: ReactNode;
  className?: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function Magnetic({ children, className }: MagneticProps) {
  const mounted = useMounted();
  const pointerFine = usePointerFine();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = mounted && pointerFine && !reducedMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, magneticSpring);
  const springY = useSpring(y, magneticSpring);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!enabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const halfW = rect.width / 2 || 1;
    const halfH = rect.height / 2 || 1;
    const nx = (event.clientX - (rect.left + halfW)) / halfW;
    const ny = (event.clientY - (rect.top + halfH)) / halfH;
    x.set(clamp(nx * magneticPullMax, -magneticPullMax, magneticPullMax));
    y.set(clamp(ny * magneticPullMax, -magneticPullMax, magneticPullMax));
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      data-motion=""
      className={cn("inline-flex", className)}
      style={enabled ? { x: springX, y: springY } : undefined}
      onPointerMove={enabled ? handlePointerMove : undefined}
      onPointerLeave={enabled ? handlePointerLeave : undefined}
    >
      {children}
    </motion.div>
  );
}
