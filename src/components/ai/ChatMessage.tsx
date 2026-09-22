"use client";

import { motion, useReducedMotion } from "framer-motion";
import { formatTelemetry } from "@/constants";
import { tween } from "@/lib/motion";
import { cn } from "@/lib/cn";
import type { AssistantMessage } from "./AssistantProvider";
import { renderAnswer } from "./renderAnswer";
import { SourceChips } from "./SourceChips";

type ChatMessageProps = {
  message: AssistantMessage;
};

export function ChatMessage({ message }: ChatMessageProps) {
  const reduceMotion = useReducedMotion();
  const isUser = message.role === "user";
  const telemetry =
    !isUser && !message.streaming && !message.error
      ? formatTelemetry({
          sourceCount: message.sources?.length ?? 0,
          retrievalMs: message.retrievalMs,
          firstTokenMs: message.firstTokenMs,
          mode: message.mode,
        })
      : [];

  return (
    <motion.li
      data-motion=""
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={tween.fast}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[min(100%,42rem)] rounded-lg border px-3 py-2 text-[0.875rem] leading-relaxed",
          isUser
            ? "border-line-strong bg-surface-2 text-text"
            : "border-line bg-bg text-text",
        )}
      >
        {message.error ? (
          <p className="whitespace-pre-wrap break-words text-text">{message.error}</p>
        ) : (
          <div className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
            {isUser ? message.content : renderAnswer(message.content)}
            {message.streaming && !message.content ? (
              <span className="text-text-dim">…</span>
            ) : null}
          </div>
        )}
        {!isUser && !message.streaming && !message.error && message.sources ? (
          <SourceChips ids={message.sources} />
        ) : null}
        {telemetry.length > 0 ? (
          <p className="mt-2 font-mono text-label text-text-dim">{telemetry.join(" · ")}</p>
        ) : null}
      </div>
    </motion.li>
  );
}
