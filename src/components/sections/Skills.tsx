"use client";

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import {
  onlyVerified,
  skillCategoryLabels,
  skillFilters,
  skills,
  skillsCopy,
  type Skill,
  type SkillFilter,
} from "@/constants";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";

// tile content must never overflow at 320px
const skillGridClassName =
  "grid min-w-0 grid-cols-1 gap-4 min-[400px]:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4";

const tileTextClassName = "min-w-0 max-w-full [overflow-wrap:anywhere]";

function SkillTile({ skill }: { skill: Skill }) {
  const category = skillCategoryLabels[skill.category];

  return (
    <Card
      data-skill-tile=""
      variant="interactive"
      className="flex h-full min-w-0 max-w-full flex-col gap-3 overflow-hidden p-4 md:p-5"
    >
      <div className="flex min-w-0 max-w-full flex-col-reverse gap-1 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-x-3 sm:gap-y-1">
        <h3 className={cn("text-h3 text-[1.125rem] text-text md:text-xl", tileTextClassName)}>
          {skill.name}
        </h3>
        <p className={cn("text-label text-accent sm:pt-1", tileTextClassName)}>{category}</p>
      </div>
      {skill.usedFor ? (
        <p className={cn("text-small text-text-dim", tileTextClassName)}>{skill.usedFor}</p>
      ) : null}
    </Card>
  );
}

export function Skills() {
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeId, setActiveId] = useState<SkillFilter["id"]>("all");

  const verifiedSkills = useMemo(() => onlyVerified(skills), []);
  const visibleSkills = useMemo(() => {
    const filter = skillFilters.find((item) => item.id === activeId);
    if (!filter || filter.category === null) {
      return verifiedSkills;
    }
    return verifiedSkills.filter((skill) => skill.category === filter.category);
  }, [activeId, verifiedSkills]);

  const panelId = `${baseId}-panel`;
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelMinHeight, setPanelMinHeight] = useState(0);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      return;
    }
    let allCount = 0;
    let categorySum = 0;
    for (const filter of skillFilters) {
      const count =
        filter.category === null
          ? verifiedSkills.length
          : verifiedSkills.filter((skill) => skill.category === filter.category).length;
      console.assert(count > 0, `Skills tab "${filter.label}" produced 0 tiles`);
      if (filter.category === null) {
        allCount = count;
      } else {
        categorySum += count;
      }
    }
    console.assert(
      categorySum === allCount,
      `Skills category tab counts (${categorySum}) must add up to the All count (${allCount})`,
    );
  }, [verifiedSkills]);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel || activeId !== "all") {
      return;
    }

    const measure = () => {
      const grid = panel.firstElementChild;
      if (!(grid instanceof HTMLElement)) {
        return;
      }
      setPanelMinHeight(grid.offsetHeight);
    };

    measure();
    const observer = new ResizeObserver(measure);
    const grid = panel.firstElementChild;
    if (grid instanceof HTMLElement) {
      observer.observe(grid);
    }
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [activeId, visibleSkills]);

  useLayoutEffect(() => {
    if (process.env.NODE_ENV === "production") {
      return;
    }
    const panel = panelRef.current;
    if (!panel) {
      return;
    }
    // tile content must never overflow at 320px
    const checkOverflow = () => {
      for (const tile of panel.querySelectorAll("[data-skill-tile]")) {
        if (!(tile instanceof HTMLElement)) {
          continue;
        }
        console.assert(
          tile.scrollWidth <= tile.clientWidth + 1,
          "tile content must never overflow at 320px",
        );
      }
    };
    checkOverflow();
    const observer = new ResizeObserver(checkOverflow);
    observer.observe(panel);
    return () => observer.disconnect();
  }, [activeId, visibleSkills]);

  function selectFilter(index: number) {
    const filter = skillFilters[index];
    if (!filter) {
      return;
    }
    setActiveId(filter.id);
    tabRefs.current[index]?.focus();
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = skillFilters.length - 1;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      selectFilter(index === last ? 0 : index + 1);
      return;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      selectFilter(index === 0 ? last : index - 1);
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      selectFilter(0);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      selectFilter(last);
    }
  }

  return (
    <Section id="skills">
      <Container>
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between xl:gap-10">
          <Reveal>
            <SectionHeader title={skillsCopy.title} intro={skillsCopy.intro} />
          </Reveal>

          <Reveal className="min-w-0 xl:shrink-0">
            <div
              role="tablist"
              aria-label={skillsCopy.tablistLabel}
              className="flex flex-nowrap snap-x snap-mandatory gap-1 overflow-x-auto overscroll-x-contain rounded-lg border border-line bg-surface p-1 [-ms-overflow-style:none] [scrollbar-width:none] xl:overflow-visible [&::-webkit-scrollbar]:hidden"
            >
              {skillFilters.map((filter, index) => {
                const selected = filter.id === activeId;
                return (
                  <button
                    key={filter.id}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`${baseId}-tab-${filter.id}`}
                    aria-selected={selected}
                    aria-controls={panelId}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveId(filter.id)}
                    onKeyDown={(event) => onTabKeyDown(event, index)}
                    className={cn(
                      "snap-start shrink-0 whitespace-nowrap rounded px-4 text-small font-medium transition-colors duration-160 ease-out",
                      "min-h-11 min-w-[44px]",
                      selected
                        ? "bg-surface-2 text-text ring-1 ring-inset ring-line-strong"
                        : "text-text-dim hover-ok:text-text",
                    )}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <div
          ref={panelRef}
          role="tabpanel"
          id={panelId}
          aria-labelledby={`${baseId}-tab-${activeId}`}
          className="mt-8 md:mt-10"
          style={panelMinHeight > 0 ? { minHeight: panelMinHeight } : undefined}
        >
          <Stagger key={activeId} play="mount" className={skillGridClassName}>
            {visibleSkills.map((skill) => (
              <div key={skill.name} className="min-w-0">
                <SkillTile skill={skill} />
              </div>
            ))}
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}
