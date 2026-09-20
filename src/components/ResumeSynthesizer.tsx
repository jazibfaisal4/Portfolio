"use client";

import { motion } from "framer-motion";
import { focusOptions } from "@/constants";
import { useFocus } from "@/context/FocusContext";
import { Reveal } from "./motion";

export function ResumeSynthesizer() {
  const { focus, setFocus } = useFocus();

  return (
    <Reveal className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
      <div className="rounded-2xl bg-surface-container-low p-6 sm:p-8">
        <p className="mb-4 text-center font-headline text-xs font-bold uppercase tracking-[0.2em] text-primary-container">
          AI Resume Synthesizer
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          {focusOptions.map((option) => (
            <motion.button
              key={option.id}
              type="button"
              onClick={() => setFocus(option.id)}
              whileTap={{ scale: 0.97 }}
              layout
              className={`rounded-full px-5 py-2.5 font-headline text-xs font-bold uppercase tracking-tightest transition-colors sm:text-sm ${
                focus === option.id
                  ? "bg-primary-container text-white shadow-electric-glow"
                  : "bg-surface-container-highest text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {option.label}
            </motion.button>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
