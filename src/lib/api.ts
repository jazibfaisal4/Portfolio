export type ChatRole = "user" | "assistant";

export type ChatHistoryItem = {
  role: ChatRole;
  content: string;
};

export type ChatMode = "llm" | "fallback";

export type ChatMeta = {
  sources: string[];
  retrievalMs?: number;
  firstTokenMs?: number;
  mode?: ChatMode;
};

export type HealthResponse = {
  status: string;
  llm_ready: boolean;
  chunks?: number;
};

export class ChatHttpError extends Error {
  readonly status: number;
  readonly detail: string;

  constructor(status: number, detail: string) {
    super(detail || `Chat request failed (${status})`);
    this.name = "ChatHttpError";
    this.status = status;
    this.detail = detail;
  }
}

function extractDetail(data: unknown): string {
  if (!data || typeof data !== "object") return "";
  const detail = (data as { detail?: unknown }).detail;
  if (typeof detail === "string") return detail;
  if (!Array.isArray(detail)) return "";
  return detail
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object" && "msg" in item && typeof (item as { msg: unknown }).msg === "string") {
        return (item as { msg: string }).msg;
      }
      return "";
    })
    .filter(Boolean)
    .join(" ");
}

function parseMs(value: string | null): number | undefined {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function parseMode(value: string | null): ChatMode | undefined {
  if (value === "llm" || value === "fallback") return value;
  return undefined;
}

function parseSources(value: string | null): string[] {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(value));
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === "string");
  } catch {
    return [];
  }
}

export function parseChatHeaders(headers: Headers): ChatMeta {
  const meta: ChatMeta = {
    sources: parseSources(headers.get("X-Sources")),
  };
  const retrievalMs = parseMs(headers.get("X-Retrieval-Ms"));
  if (retrievalMs != null) meta.retrievalMs = retrievalMs;
  const firstTokenMs = parseMs(headers.get("X-First-Token-Ms"));
  if (firstTokenMs != null) meta.firstTokenMs = firstTokenMs;
  const mode = parseMode(headers.get("X-Mode"));
  if (mode) meta.mode = mode;
  return meta;
}

export class ContactHttpError extends Error {
  readonly status: number;
  readonly detail: string;

  constructor(status: number, detail: string) {
    super(detail || `Contact request failed (${status})`);
    this.name = "ContactHttpError";
    this.status = status;
    this.detail = detail;
  }
}

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};

export async function submitContact(payload: ContactPayload): Promise<void> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  if (!response.ok) {
    let detail = "";
    try {
      detail = extractDetail(await response.json());
    } catch {
      detail = "";
    }
    throw new ContactHttpError(response.status, detail);
  }
}

export async function fetchHealth(): Promise<HealthResponse> {
  const response = await fetch("/api/health", { method: "GET", cache: "no-store" });
  if (!response.ok) {
    throw new Error("Health check failed");
  }
  return (await response.json()) as HealthResponse;
}

async function* readTextStream(body: ReadableStream<Uint8Array>): AsyncGenerator<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const piece = decoder.decode(value, { stream: true });
      if (piece) yield piece;
    }
    const tail = decoder.decode();
    if (tail) yield tail;
  } finally {
    try {
      reader.releaseLock();
    } catch {
      // already released
    }
  }
}

export async function streamChat(
  message: string,
  history: ChatHistoryItem[],
  signal?: AbortSignal,
): Promise<{ meta: ChatMeta; stream: AsyncIterable<string> }> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "text/plain" },
    body: JSON.stringify({ message, history }),
    signal,
    cache: "no-store",
  });

  if (!response.ok) {
    let detail = "";
    try {
      detail = extractDetail(await response.json());
    } catch {
      detail = "";
    }
    throw new ChatHttpError(response.status, detail);
  }

  const meta = parseChatHeaders(response.headers);
  const body = response.body;
  const stream = body ? readTextStream(body) : (async function* empty(): AsyncGenerator<string> {})();
  return { meta, stream };
}
