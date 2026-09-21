"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { AssistantProvider } from "@/components/ai/AssistantProvider";
import { SmoothScroll } from "./SmoothScroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <AssistantProvider>{children}</AssistantProvider>
      </SmoothScroll>
    </MotionConfig>
  );
}
