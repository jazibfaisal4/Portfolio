"use client";

import dynamic from "next/dynamic";
import { assistant } from "@/constants";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useAssistant } from "./AssistantProvider";

const ChatPanel = dynamic(() => import("./ChatPanel"), {
  ssr: false,
  loading: () => <div className="min-h-0 flex-1" aria-hidden="true" />,
});

export function AiLabConsole() {
  const { sheetOpen, llmReady, clear, messages, status } = useAssistant();
  const canClear = messages.length > 0 || status === "streaming";

  return (
    <div
      className={cn(
        "flex h-[70dvh] w-full flex-col overflow-hidden rounded-lg border border-line bg-surface md:h-[36rem]",
      )}
      inert={sheetOpen || undefined}
    >
      <div className="flex min-h-11 shrink-0 items-center gap-3 border-b border-line bg-surface-2 px-4">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-text-dim" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        </div>
        <p className="min-w-0 flex-1 truncate font-mono text-label text-text-dim">
          {assistant.consoleTitle}
        </p>
        <p className="inline-flex items-center gap-2 font-mono text-label text-text">
          {llmReady ? (
            <>
              <span className="h-2 w-2 rounded-full bg-live" aria-hidden="true" />
              {assistant.online}
            </>
          ) : (
            assistant.notesMode
          )}
        </p>
        <Button
          type="button"
          variant="ghost"
          className="px-3"
          onClick={clear}
          disabled={!canClear}
        >
          {assistant.clear}
        </Button>
      </div>
      {sheetOpen ? <div className="min-h-0 flex-1" aria-hidden="true" /> : <ChatPanel variant="console" />}
    </div>
  );
}
