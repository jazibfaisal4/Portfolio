"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { assistant } from "@/constants";
import { useIdInView } from "@/hooks/useIdInView";
import { useMobileNavOpen } from "@/hooks/useMobileNavOpen";
import { cn } from "@/lib/cn";
import { useAssistant } from "./AssistantProvider";

const MobileSheet = dynamic(() => import("./MobileSheet"), { ssr: false });

export default function Launcher() {
  const { sheetOpen, setSheetOpen } = useAssistant();
  const labInView = useIdInView("ai-lab");
  const contactInView = useIdInView("contact");
  const menuOpen = useMobileNavOpen();
  const hideFab = labInView || contactInView || menuOpen || sheetOpen;

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    function onChange() {
      if (media.matches) setSheetOpen(false);
    }
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [setSheetOpen]);

  return (
    <>
      {!hideFab ? (
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          aria-label={assistant.openLabel}
          className={cn(
            "fixed z-[80] flex h-14 w-14 items-center justify-center rounded-full border border-line-strong bg-accent text-bg md:hidden",
            "right-[max(1rem,env(safe-area-inset-right,0px))] bottom-[calc(1rem+env(safe-area-inset-bottom,0px))]",
          )}
        >
          <span aria-hidden="true" className="font-mono text-small font-medium">
            AI
          </span>
        </button>
      ) : null}
      {sheetOpen ? <MobileSheet onClose={() => setSheetOpen(false)} /> : null}
    </>
  );
}
