"use client";

import { useState } from "react";
import { scrollTo as smoothScrollTo, useSmoothScroll } from "@/components/layout/SmoothScroll";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { staggerMaxItems } from "@/lib/motion";

const nestedLines = [
  "Chat transcripts, the mobile menu, and code blocks set data-lenis-prevent.",
  "Wheel or touch inside this panel should scroll the panel, not the page, when Lenis is on.",
  "On touch devices and when reduce motion is on, the page already uses native scrolling.",
  "Pause Lenis when a full-screen sheet is open so body scroll stays locked.",
  "Anchor links use scrollTo with the nav offset, or CSS smooth scroll as a fallback.",
];

const staggerItems = ["Pill", "Headline", "Subtext", "CTAs", "Diagram", "Nodes"];

export function MotionDemo() {
  const { setPaused } = useSmoothScroll();
  const [paused, setPausedState] = useState(false);

  function togglePause() {
    const next = !paused;
    setPausedState(next);
    setPaused(next);
  }

  return (
    <div className="flex flex-col gap-10">
      <p className="text-small text-text-dim">
        Toggle the OS reduce-motion setting to compare Lenis versus native scrolling, Reveal, and
        magnetic pull.
      </p>

      <div className="flex flex-wrap gap-4">
        <Magnetic>
          <Button variant="primary">Magnetic primary</Button>
        </Magnetic>
        <Button variant="secondary" onClick={() => smoothScrollTo("#tokens")}>
          Scroll to tokens
        </Button>
        <Button variant="ghost" href="#tokens">
          Anchor to tokens
        </Button>
        <Button variant="secondary" onClick={togglePause} aria-pressed={paused}>
          {paused ? "Resume smooth scroll" : "Pause smooth scroll"}
        </Button>
      </div>

      <Reveal>
        <p className="text-h3 text-text">Reveal: fade and 16px rise, once</p>
        <p className="mt-2 text-body text-text-dim">
          Scroll this block out and back only if you need to re-check; it will not replay.
        </p>
      </Reveal>

      <div className="flex flex-col gap-3">
        <p className="text-small text-text-dim">
          Stagger {staggerItems.length} items at 60ms (max {staggerMaxItems} per group).
        </p>
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {staggerItems.map((label) => (
            <StaggerItem key={label}>
              <Card variant="interactive">
                <p className="text-label text-accent">{label}</p>
                <p className="mt-2 text-small text-text-dim">Border and 2px lift on hover only.</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <div
        className="max-h-40 overflow-y-auto rounded-lg border border-line bg-surface p-4"
        data-lenis-prevent
      >
        <p className="text-label text-accent">data-lenis-prevent</p>
        <ul className="mt-3 flex flex-col gap-2">
          {nestedLines.map((line) => (
            <li key={line} className="text-small text-text-dim">
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
