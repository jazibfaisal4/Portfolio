"use client";

import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 right-0 z-[90] h-[2px] origin-left bg-accent"
      style={{
        top: "calc(var(--nav-h) + env(safe-area-inset-top, 0px))",
        scaleX: scrollYProgress,
      }}
    />
  );
}
