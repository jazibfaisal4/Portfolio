"use client";

import { useEffect, useId, useRef, type FormEvent, type KeyboardEvent } from "react";
import { assistant, MESSAGE_COUNTER_AT, MESSAGE_MAX_LENGTH } from "@/constants";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useAssistant } from "./AssistantProvider";
import { ChatMessage } from "./ChatMessage";

type ChatPanelProps = {
  variant: "console" | "sheet";
};

export default function ChatPanel({ variant }: ChatPanelProps) {
  const { messages, status, draft, setDraft, send, stop, retry } = useAssistant();
  const inputId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const streaming = status === "streaming";
  const last = messages[messages.length - 1];
  const showRetry = Boolean(last?.role === "assistant" && last.error);
  const announcement = streaming
    ? ""
    : last?.role === "assistant" && last.error
      ? last.error
      : last?.role === "assistant" && last.content && !last.aborted
        ? assistant.announcedReady
        : "";

  useEffect(() => {
    const node = listRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, streaming]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (streaming) return;
    send();
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!streaming) send();
    }
  }

  const empty = messages.length === 0;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div
        ref={listRef}
        role="log"
        aria-live="polite"
        aria-busy={streaming || undefined}
        aria-relevant="additions"
        data-lenis-prevent
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4"
      >
        {empty ? (
          <EmptyState variant={variant} onPick={(question) => send(question)} />
        ) : (
          <ul className="flex flex-col gap-3">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </ul>
        )}
        {showRetry ? (
          <div className="mt-4">
            <Button type="button" variant="secondary" onClick={retry}>
              {assistant.retry}
            </Button>
          </div>
        ) : null}
      </div>

      <div className="sr-only" aria-live="polite">
        {announcement}
      </div>

      <form
        onSubmit={onSubmit}
        className="border-t border-line bg-surface px-4 py-3"
      >
        <label htmlFor={inputId} className="mb-2 block text-small text-text-dim">
          {assistant.inputLabel}
        </label>
        <div className="flex items-end gap-2">
          <span aria-hidden="true" className="mb-3 font-mono text-small text-accent">
            &gt;
          </span>
          <input
            id={inputId}
            type="text"
            value={draft}
            maxLength={MESSAGE_MAX_LENGTH}
            autoComplete="off"
            enterKeyHint="send"
            placeholder={assistant.inputPlaceholder}
            onChange={(event) => setDraft(event.target.value.slice(0, MESSAGE_MAX_LENGTH))}
            onKeyDown={onKeyDown}
            className="min-h-11 min-w-0 flex-1 rounded border border-line-strong bg-bg px-3 text-base text-text placeholder:text-text-dim"
          />
          {streaming ? (
            <Button type="button" variant="secondary" onClick={stop}>
              {assistant.stop}
            </Button>
          ) : (
            <Button type="submit" variant="primary" disabled={!draft.trim()}>
              {assistant.ask}
            </Button>
          )}
        </div>
        {draft.length >= MESSAGE_COUNTER_AT ? (
          <p className="mt-2 font-mono text-label text-text-dim">
            {draft.length}/{MESSAGE_MAX_LENGTH}
          </p>
        ) : null}
        <p className="mt-3 text-small text-text-dim">
          {assistant.footnoteBefore}{" "}
          <a
            href={assistant.emailHref}
            className="text-accent underline underline-offset-2"
          >
            {assistant.footnoteLink}
          </a>{" "}
          {assistant.footnoteAfter}
        </p>
      </form>
    </div>
  );
}

function EmptyState({
  variant,
  onPick,
}: {
  variant: "console" | "sheet";
  onPick: (question: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[0.875rem] leading-relaxed text-text-dim">{assistant.empty}</p>
      <ul
        className={cn(
          variant === "sheet"
            ? "-mx-1 flex gap-2 overflow-x-auto overscroll-contain pb-1 snap-x snap-mandatory"
            : "flex flex-wrap gap-2",
        )}
      >
        {assistant.suggestions.map((question) => (
          <li key={question} className={variant === "sheet" ? "shrink-0 snap-start" : undefined}>
            <button
              type="button"
              onClick={() => onPick(question)}
              className="inline-flex min-h-11 max-w-[18rem] items-center rounded-full border border-line bg-surface-2 px-3 text-left text-small text-text hover-ok:border-accent"
            >
              {question}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
