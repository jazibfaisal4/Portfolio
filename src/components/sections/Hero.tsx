"use client";

import { motion } from "framer-motion";
import { profile } from "@/constants";
import { handleSectionLinkClick } from "@/components/layout/sectionLink";
import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { revealOffset, staggerDelay, tween } from "@/lib/motion";
import { PipelineDiagram } from "@/components/hero/PipelineDiagram";
import { PipelineList } from "@/components/hero/PipelineList";

const fadeUp = {
  hidden: { opacity: 0, y: revealOffset },
  show: { opacity: 1, y: 0, transition: tween.hero },
};

const copyList = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
};

const KEEP_TOGETHER = ["voice-first", "full-stack"] as const;

function renderHeadline(text: string) {
  return text.split(/(voice-first|full-stack)/g).map((part, index) =>
    KEEP_TOGETHER.includes(part as (typeof KEEP_TOGETHER)[number]) ? (
      <span key={index} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export function Hero() {
  const [seeWork, downloadResume] = profile.hero.ctas;

  return (
    <section
      id="home"
      className="flex scroll-mt-[var(--section-offset)] items-center py-10 md:py-16 lg:min-h-[calc(100dvh-var(--nav-h))] lg:py-12"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] lg:gap-12">
          <motion.div
            className="flex min-w-0 flex-col items-start"
            initial="hidden"
            animate="show"
            variants={copyList}
          >
            <motion.p
              data-motion=""
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-live" aria-hidden="true" />
              <span className="text-label text-accent">{profile.hero.pill}</span>
            </motion.p>

            <motion.h1
              data-motion=""
              variants={fadeUp}
              className="mt-6 text-display text-[clamp(2.25rem,5vw,3.75rem)] text-text"
            >
              {renderHeadline(profile.hero.headline)}
            </motion.h1>

            <motion.p data-motion="" variants={fadeUp} className="mt-5 text-body text-text-dim">
              {profile.hero.subtext}
            </motion.p>

            <motion.div
              data-motion=""
              variants={fadeUp}
              className="mt-8 flex w-full flex-col gap-3 md:w-auto md:flex-row md:flex-wrap"
            >
              <Magnetic className="w-full md:w-auto">
                <Button href="#projects" onClick={handleSectionLinkClick} className="w-full md:w-auto">
                  {seeWork}
                </Button>
              </Magnetic>
              <Magnetic className="w-full md:w-auto">
                <Button
                  href={profile.resume}
                  download="Jazib_Faisal_Resume.pdf"
                  variant="secondary"
                  className="w-full md:w-auto"
                >
                  {downloadResume}
                </Button>
              </Magnetic>
            </motion.div>
          </motion.div>

          <div className="min-w-0">
            <div className="md:hidden">
              <PipelineList />
            </div>
            <div className="hidden md:block">
              <PipelineDiagram />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
