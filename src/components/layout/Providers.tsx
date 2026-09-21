"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { ScrollProgress } from "./ScrollProgress";
import { SmoothScroll } from "./SmoothScroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <ScrollProgress />
        {children}
      </SmoothScroll>
    </MotionConfig>
  );
}
