"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  assistant,
  HISTORY_LIMIT,
  MESSAGE_MAX_LENGTH,
} from "@/constants";
import {
  ChatHttpError,
  fetchHealth,
  streamChat,
  type ChatHistoryItem,
  type ChatMeta,
  type ChatMode,
} from "@/lib/api";

export type AssistantStatus = "idle" | "streaming" | "error";

export type AssistantMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  retrievalMs?: number;
  firstTokenMs?: number;
  mode?: ChatMode;
  error?: string;
  aborted?: boolean;
  streaming?: boolean;
};

type AssistantContextValue = {
  messages: AssistantMessage[];
  status: AssistantStatus;
  llmReady: boolean;
  draft: string;
  setDraft: (value: string) => void;
  send: (text?: string) => void;
  stop: () => void;
  retry: () => void;
  clear: () => void;
  sheetOpen: boolean;
  setSheetOpen: (open: boolean) => void;
};

const AssistantContext = createContext<AssistantContextValue | null>(null);

export function useAssistant() {
  const ctx = useContext(AssistantContext);
  if (!ctx) {
    throw new Error("useAssistant must be used within AssistantProvider");
  }
  return ctx;
}

function newId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `msg-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function toHistory(messages: AssistantMessage[]): ChatHistoryItem[] {
  const items: ChatHistoryItem[] = [];
  for (const message of messages) {
    if (message.role === "user" && message.content) {
      items.push({ role: "user", content: message.content });
      continue;
    }
    if (
      message.role === "assistant" &&
      message.content &&
      !message.error &&
      !message.aborted &&
      !message.streaming
    ) {
      items.push({ role: "assistant", content: message.content });
    }
  }
  return items.slice(-HISTORY_LIMIT);
}

function errorCopy(err: unknown): string {
  if (err instanceof ChatHttpError) {
    if (err.status === 429) return assistant.errors.rateLimit;
    if (err.detail) return err.detail;
  }
  return assistant.errors.offline;
}

function pickMeta(meta: ChatMeta): Pick<AssistantMessage, "sources" | "retrievalMs" | "firstTokenMs" | "mode"> {
  return {
    sources: meta.sources,
    retrievalMs: meta.retrievalMs,
    firstTokenMs: meta.firstTokenMs,
    mode: meta.mode,
  };
}

function isAbortError(err: unknown, controller: AbortController) {
  if (controller.signal.aborted) return true;
  if (err instanceof DOMException && err.name === "AbortError") return true;
  if (err instanceof Error && err.name === "AbortError") return true;
  return false;
}

export function AssistantProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [status, setStatus] = useState<AssistantStatus>("idle");
  const [llmReady, setLlmReady] = useState(false);
  const [draft, setDraft] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);

  const messagesRef = useRef(messages);
  const statusRef = useRef(status);
  const abortRef = useRef<AbortController | null>(null);
  const generationRef = useRef(0);

  useEffect(() => {
    messagesRef.current = messages;
    statusRef.current = status;
  }, [messages, status]);

  useEffect(() => {
    let cancelled = false;
    fetchHealth()
      .then((health) => {
        if (!cancelled) setLlmReady(Boolean(health.llm_ready));
      })
      .catch(() => {
        if (!cancelled) setLlmReady(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const stop = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const runTurn = useCallback(async (question: string, thread: AssistantMessage[]) => {
    if (statusRef.current === "streaming") return;

    const generation = generationRef.current;
    const assistantId = newId();
    const placeholder: AssistantMessage = {
      id: assistantId,
      role: "assistant",
      content: "",
      streaming: true,
    };
    const withAssistant = [...thread, placeholder];
    setMessages(withAssistant);
    messagesRef.current = withAssistant;
    setStatus("streaming");
    statusRef.current = "streaming";

    const controller = new AbortController();
    abortRef.current = controller;
    const history = toHistory(thread.slice(0, -1));

    try {
      const { meta, stream } = await streamChat(question, history, controller.signal);
      if (generation !== generationRef.current) return;

      setMessages((prev) =>
        prev.map((message) => (message.id === assistantId ? { ...message, ...pickMeta(meta) } : message)),
      );

      for await (const chunk of stream) {
        if (generation !== generationRef.current) return;
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantId ? { ...message, content: `${message.content}${chunk}` } : message,
          ),
        );
      }

      if (generation !== generationRef.current) return;
      setMessages((prev) =>
        prev.map((message) => (message.id === assistantId ? { ...message, streaming: false } : message)),
      );
      setStatus("idle");
      statusRef.current = "idle";
    } catch (err) {
      if (generation !== generationRef.current) return;

      if (isAbortError(err, controller)) {
        setMessages((prev) =>
          prev
            .map((message) =>
              message.id === assistantId ? { ...message, streaming: false, aborted: true } : message,
            )
            .filter((message) => !(message.id === assistantId && !message.content)),
        );
        setStatus("idle");
        statusRef.current = "idle";
        return;
      }

      const text = errorCopy(err);
      setMessages((prev) =>
        prev.map((message) =>
          message.id === assistantId ? { ...message, streaming: false, error: text } : message,
        ),
      );
      setStatus("error");
      statusRef.current = "error";
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
    }
  }, []);

  const send = useCallback(
    (text?: string) => {
      if (statusRef.current === "streaming") return;
      const question = (text ?? draft).trim();
      if (!question) return;
      const clipped = question.slice(0, MESSAGE_MAX_LENGTH);
      setDraft("");
      const user: AssistantMessage = { id: newId(), role: "user", content: clipped };
      const thread = [...messagesRef.current, user];
      setMessages(thread);
      messagesRef.current = thread;
      void runTurn(clipped, thread);
    },
    [draft, runTurn],
  );

  const retry = useCallback(() => {
    if (statusRef.current === "streaming") return;
    const current = messagesRef.current;
    let lastUserIndex = -1;
    for (let i = current.length - 1; i >= 0; i -= 1) {
      if (current[i]?.role === "user") {
        lastUserIndex = i;
        break;
      }
    }
    if (lastUserIndex < 0) return;
    const lastUser = current[lastUserIndex];
    if (!lastUser) return;
    const after = current[lastUserIndex + 1];
    if (after?.role === "assistant" && !after.error && !after.aborted) return;
    const thread = current.slice(0, lastUserIndex + 1);
    setMessages(thread);
    messagesRef.current = thread;
    void runTurn(lastUser.content, thread);
  }, [runTurn]);

  const clear = useCallback(() => {
    generationRef.current += 1;
    abortRef.current?.abort();
    abortRef.current = null;
    setMessages([]);
    messagesRef.current = [];
    setStatus("idle");
    statusRef.current = "idle";
    setDraft("");
  }, []);

  const value = useMemo<AssistantContextValue>(
    () => ({
      messages,
      status,
      llmReady,
      draft,
      setDraft,
      send,
      stop,
      retry,
      clear,
      sheetOpen,
      setSheetOpen,
    }),
    [messages, status, llmReady, draft, send, stop, retry, clear, sheetOpen],
  );

  return <AssistantContext.Provider value={value}>{children}</AssistantContext.Provider>;
}
