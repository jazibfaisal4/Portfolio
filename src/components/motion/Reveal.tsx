"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { revealOffset, revealViewport, tween } from "@/lib/motion";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      data-motion=""
      className={cn(className)}
      initial={{ opacity: 0, y: revealOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ ...tween.base, delay }}
    >
      {children}
    </motion.div>
  );
}
