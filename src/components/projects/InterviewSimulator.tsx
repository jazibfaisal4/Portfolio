"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { simulatorTiming, type SimulatorLine } from "@/constants";
import { useOnScreen } from "@/hooks/useOnScreen";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { revealOffset, tween } from "@/lib/motion";
import { Waveform } from "./Waveform";

type InterviewSimulatorProps = {
  label: string;
  lines: readonly SimulatorLine[];
};

function TranscriptLines({
  lines,
  reducedMotion,
}: {
  lines: readonly SimulatorLine[];
  reducedMotion: boolean;
}) {
  const [timedShown, setTimedShown] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const timers = lines.map((_, index) =>
      window.setTimeout(() => {
        setTimedShown(index + 1);
      }, index * simulatorTiming.lineDelayMs),
    );

    return () => {
      for (const timer of timers) {
        window.clearTimeout(timer);
      }
    };
  }, [lines, reducedMotion]);

  const shown = reducedMotion ? lines.length : timedShown;

  return (
    <ol className="mt-5 flex min-h-[12.5rem] flex-col gap-3">
      {lines.slice(0, shown).map((line, index) => (
        <motion.li
          key={index}
          data-motion=""
          initial={reducedMotion ? false : { opacity: 0, y: revealOffset }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : tween.base}
        >
          <p className="text-label text-accent">{line.speaker}</p>
          <p className="mt-1 text-small text-text">{line.text}</p>
        </motion.li>
      ))}
    </ol>
  );
}

export function InterviewSimulator({ label, lines }: InterviewSimulatorProps) {
  const headingId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(rootRef, 0.2);
  const reducedMotion = usePrefersReducedMotion();
  const runWaveform = onScreen && !reducedMotion;
  const showLines = reducedMotion || onScreen;

  return (
    <div
      ref={rootRef}
      role="region"
      aria-labelledby={headingId}
      className="flex min-h-[22rem] flex-col rounded-lg border border-line bg-surface p-4 md:min-h-[24rem] md:p-5"
    >
      <p id={headingId} className="text-label text-accent">
        {label}
      </p>
      <div className="mt-4">
        <Waveform active={runWaveform} />
      </div>
      {showLines ? (
        <TranscriptLines lines={lines} reducedMotion={reducedMotion} />
      ) : (
        <ol className="mt-5 flex min-h-[12.5rem] flex-col gap-3" />
      )}
    </div>
  );
}

export default InterviewSimulator;
