"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { revealOffset, revealViewport, staggerDelay, tween } from "@/lib/motion";
import { cn } from "@/lib/cn";

type StaggerProps = {
  children: ReactNode;
  className?: string;
};

export function Stagger({ children, className }: StaggerProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay,
          },
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
};

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      data-motion=""
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: revealOffset },
        show: {
          opacity: 1,
          y: 0,
          transition: tween.base,
        },
      }}
    >
      {children}
    </motion.div>
  );
}
