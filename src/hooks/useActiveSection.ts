"use client";

import { useEffect, useState } from "react";
import { getSectionOffsetPx } from "@/components/layout/SmoothScroll";

export function useActiveSection(ids: readonly string[], fallback = "") {
  const [active, setActive] = useState(fallback);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node instanceof HTMLElement);

    if (elements.length === 0) return;

    function pickActive() {
      const marker = getSectionOffsetPx() + 8;
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= marker) current = id;
      }
      if (current) setActive(current);
    }

    const observer = new IntersectionObserver(
      () => {
        pickActive();
      },
      {
        root: null,
        rootMargin: "0px 0px -70% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 1],
      },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [ids]);

  return [active, setActive] as const;
}
