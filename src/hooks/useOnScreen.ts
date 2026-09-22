"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * True when `ref` intersects the viewport and the document tab is visible.
 * Server snapshot is false so idle work never runs during SSR.
 */
export function useOnScreen(ref: RefObject<Element | null>, threshold = 0.2) {
  const [onScreen, setOnScreen] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setOnScreen(Boolean(entry?.isIntersecting));
      },
      { threshold, root: null },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, threshold]);

  useEffect(() => {
    function onVisibility() {
      setPageVisible(document.visibilityState === "visible");
    }

    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return onScreen && pageVisible;
}
