"use client";

import { useEffect, useState } from "react";

/** True while `#id` intersects the viewport. Server snapshot is false. */
export function useIdInView(id: string, threshold = 0) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = document.getElementById(id);
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(Boolean(entry?.isIntersecting));
      },
      { threshold, root: null },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [id, threshold]);

  return inView;
}
