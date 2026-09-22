"use client";

import { useEffect, useId, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { assistant } from "@/constants";
import { setSmoothScrollPaused } from "@/components/layout/SmoothScroll";
import { Button } from "@/components/ui/Button";
import { useAssistant } from "./AssistantProvider";

const ChatPanel = dynamic(() => import("./ChatPanel"), {
  ssr: false,
  loading: () => <div className="min-h-0 flex-1" aria-hidden="true" />,
});

const FOCUSABLE = "a[href], button:not([disabled]), textarea, input:not([disabled])";

type MobileSheetProps = {
  onClose: () => void;
};

export default function MobileSheet({ onClose }: MobileSheetProps) {
  const titleId = useId();
  const sheetRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const { llmReady } = useAssistant();
  const [keyboardInset, setKeyboardInset] = useState(0);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;
    const view: VisualViewport = viewport;

    function sync() {
      const inset = Math.max(0, window.innerHeight - view.height - view.offsetTop);
      setKeyboardInset(inset);
    }

    sync();
    view.addEventListener("resize", sync);
    view.addEventListener("scroll", sync);
    return () => {
      view.removeEventListener("resize", sync);
      view.removeEventListener("scroll", sync);
    };
  }, []);

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
      if (!firstItem || !lastItem) return;

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

  return (
    <div className="fixed inset-0 z-[95] md:hidden">
      <button
        type="button"
        aria-label={assistant.close}
        className="absolute inset-0 bg-[color-mix(in_srgb,var(--bg)_70%,transparent)]"
        onClick={onClose}
      />
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="absolute inset-x-0 bottom-0 flex flex-col overflow-hidden rounded-t-lg border border-line bg-surface"
        data-lenis-prevent
        style={{
          height: "85dvh",
          paddingBottom: `calc(${keyboardInset}px + env(safe-area-inset-bottom, 0px))`,
          paddingLeft: "env(safe-area-inset-left, 0px)",
          paddingRight: "env(safe-area-inset-right, 0px)",
        }}
      >
        <div className="relative flex shrink-0 items-center gap-3 border-b border-line px-4 pb-3 pt-4">
          <span
            className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-line-strong"
            aria-hidden="true"
          />
          <p id={titleId} className="sr-only">
            {assistant.title}
          </p>
          <p className="min-w-0 flex-1 truncate font-mono text-label text-text">
            {llmReady ? assistant.online : assistant.notesMode}
          </p>
          <Button type="button" variant="ghost" className="px-3" onClick={onClose}>
            {assistant.close}
          </Button>
        </div>
        <ChatPanel variant="sheet" />
      </div>
    </div>
  );
}
