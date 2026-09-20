"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const quickPrompts = [
  "Summarize Jazib's skills",
  "Show Desktop App project",
  "Bootcamp details",
  "Contact info",
];

type Message = { role: "user" | "assistant"; content: string };

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Jazib's AI assistant. Ask about skills, projects, bootcamp, or contact info.",
    },
  ]);
  const [streaming, setStreaming] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  async function sendMessage(text: string) {
    if (!text.trim() || streaming) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setStreaming(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          return [...prev.slice(0, -1), { role: "assistant", content: `${last?.content ?? ""}${chunk}` }];
        });
      }
    }

    setStreaming(false);
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-5 z-[110] flex h-14 w-14 items-center justify-center rounded-full bg-primary-container text-white shadow-electric-glow sm:bottom-8 sm:right-8"
        aria-label="Open AI assistant"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
          <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 12 2Zm-3 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm6 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="fixed bottom-40 right-5 z-[110] flex w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-high/95 shadow-glass backdrop-blur-glass sm:bottom-24 sm:right-8"
          >
            <div className="border-b border-outline-variant/20 px-4 py-3">
              <p className="font-headline text-sm font-bold uppercase tracking-tightest text-on-surface">
                AI Assistant
              </p>
              <p className="font-label text-xs text-on-surface-variant">Powered by portfolio knowledge base</p>
            </div>

            <div className="max-h-64 space-y-3 overflow-y-auto px-4 py-3">
              {messages.map((msg, i) => (
                <div
                  key={`${msg.role}-${i}`}
                  className={`rounded-xl px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "ml-8 bg-primary-container/20 text-on-surface"
                      : "mr-8 bg-surface-container-lowest text-on-surface-variant"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="flex flex-wrap gap-2 border-t border-outline-variant/20 px-4 py-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="rounded-full bg-surface-container-highest px-3 py-1 font-label text-[10px] uppercase tracking-wide text-secondary transition-colors hover:text-primary-container"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form
              className="flex gap-2 border-t border-outline-variant/20 p-3"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 rounded-full bg-surface-container-lowest px-4 py-2 font-body text-sm text-on-surface outline-none placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary-container/50"
              />
              <button
                type="submit"
                disabled={streaming}
                className="rounded-full bg-primary-container px-4 py-2 font-headline text-xs font-bold uppercase text-white disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
