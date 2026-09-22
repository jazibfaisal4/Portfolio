"use client";

import type { MouseEvent } from "react";
import { scrollTo } from "./SmoothScroll";

/**
 * Uses the motion `scrollTo` helper when the target is on this page.
 * Leaves the native `href` alone so hash links still work without JS.
 */
export function handleSectionLinkClick(event: MouseEvent<HTMLAnchorElement>) {
  const href = event.currentTarget.getAttribute("href");
  if (!href) return;

  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return;

  const hash = href.slice(hashIndex);
  if (hash.length < 2) return;

  const path = href.slice(0, hashIndex) || "/";
  const current = window.location.pathname || "/";
  const samePage = path === current || (path === "/" && current === "/");
  if (!samePage) return;
  if (!document.querySelector(hash)) return;

  event.preventDefault();
  scrollTo(hash);
}
