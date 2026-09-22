"use client";

import { useEffect, useId, useRef, type MouseEvent } from "react";
import Link from "next/link";
import { navLinks } from "@/constants";
import { setSmoothScrollPaused } from "./SmoothScroll";
import { handleSectionLinkClick } from "./sectionLink";
import { cn } from "@/lib/cn";

const FOCUSABLE = "a[href], button:not([disabled])";

type MobileMenuProps = {
  onClose: () => void;
  onNavigate?: (id: string) => void;
};

export function MobileMenu({ onClose, onNavigate }: MobileMenuProps) {
  const titleId = useId();
  const sheetRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    setSmoothScrollPaused(true);

    const sheet = sheetRef.current;
    const first = sheet?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();

    function getFocusable() {
      return Array.from(sheetRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) return;
      const firstItem = items[0];
      const lastItem = items[items.length - 1];

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      setSmoothScrollPaused(false);
      previousFocus.current?.focus();
    };
  }, [onClose]);

  function onLinkClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    setSmoothScrollPaused(false);
    onNavigate?.(id);
    onClose();
    handleSectionLinkClick(event);
  }

  return (
    <div
      ref={sheetRef}
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      data-lenis-prevent
      className="fixed inset-0 z-[95] flex flex-col overflow-y-auto bg-[color-mix(in_srgb,var(--bg)_96%,transparent)] backdrop-blur-sm md:hidden"
      style={{
        paddingTop: "calc(var(--nav-h) + env(safe-area-inset-top, 0px))",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        paddingLeft: "env(safe-area-inset-left, 0px)",
        paddingRight: "env(safe-area-inset-right, 0px)",
      }}
    >
      <div className="flex flex-1 flex-col px-5 py-6">
        <p id={titleId} className="text-label text-accent">
          Menu
        </p>
        <nav aria-label="Mobile" className="mt-6 flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={`/${link.href}`}
              onClick={(event) => onLinkClick(event, link.href.slice(1))}
              className={cn(
                "flex min-h-12 items-center border-b border-line text-h3 text-text",
                "hover-ok:text-accent",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={onClose}
          className="mt-8 inline-flex h-11 min-h-11 items-center self-start text-small text-text-dim hover-ok:text-text"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default MobileMenu;
