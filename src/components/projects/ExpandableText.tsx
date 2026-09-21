"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projectsCopy } from "@/constants";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { revealOffset, tween } from "@/lib/motion";
import { cn } from "@/lib/cn";

type ExpandableTextProps = {
  text: string;
  className?: string;
};

export function ExpandableText({ text, className }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className={cn("min-w-0", className)}>
      <motion.p
        key={expanded ? "open" : "closed"}
        data-motion=""
        initial={expanded && !reducedMotion ? { opacity: 0, y: revealOffset } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={reducedMotion ? { duration: 0 } : tween.base}
        className={cn(
          "text-body max-w-none text-text-dim [overflow-wrap:anywhere]",
          !expanded && "max-md:line-clamp-3",
        )}
      >
        {text}
      </motion.p>
      <button
        type="button"
        className="mt-1 inline-flex min-h-11 items-center text-small text-accent md:hidden"
        aria-expanded={expanded}
        onClick={() => setExpanded((current) => !current)}
      >
        {expanded ? projectsCopy.collapse : projectsCopy.expand}
      </button>
    </div>
  );
}
