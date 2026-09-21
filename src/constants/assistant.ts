import { profile } from "./profile";

export const MESSAGE_MAX_LENGTH = 500;
export const MESSAGE_COUNTER_AT = 400;
export const HISTORY_LIMIT = 8;

export const sourceTitles: Record<string, string> = {
  about: "Who Jazib is",
  contact: "Contact and availability",
  education: "Education",
  "experience-purelogics": "Experience: PureLogics",
  "interview-system": "AI Interview System (overview)",
  "voice-pipeline": "Voice pipeline",
  "stt-tts": "Speech-to-text and text-to-speech choices",
  "english-switch": "Switching the interview to English",
  persistence: "Data and persistence",
  "library-system": "Library Management System",
  "apple-3d": "Apple 3D Website",
  "brainwave-ui": "Brainwave AI UI",
  "skills-ai": "Skills: AI/ML and voice",
  "skills-web": "Skills: web and backend",
  "skills-desktop": "Skills: desktop",
  scope: "Level and scope",
};

export function sourceTitle(id: string): string {
  return sourceTitles[id] ?? id;
}

export type TelemetryInput = {
  sourceCount: number;
  retrievalMs?: number;
  firstTokenMs?: number;
  mode?: "llm" | "fallback";
};

export function formatTelemetry(input: TelemetryInput): string[] {
  const lines: string[] = [];
  const parts: string[] = [];
  if (input.retrievalMs != null && Number.isFinite(input.retrievalMs)) {
    const retrievalMs = Math.round(input.retrievalMs);
    const retrievalTime = retrievalMs < 1 ? "under 1 ms" : `${retrievalMs} ms`;
    parts.push(`Retrieved ${input.sourceCount} chunks in ${retrievalTime}`);
  }
  if (input.firstTokenMs != null && Number.isFinite(input.firstTokenMs)) {
    parts.push(`first token in ${Math.round(input.firstTokenMs)} ms`);
  }
  if (parts.length > 0) {
    lines.push(parts.join(", "));
  }
  if (input.mode === "fallback") {
    lines.push("Answered from my notes (AI model not connected)");
  }
  return lines;
}

export const assistant = {
  title: "AI Lab",
  intro: "Ask about my projects, stack, and background.",
  consoleTitle: "assistant",
  online: "Online",
  notesMode: "Notes mode",
  clear: "Clear",
  ask: "Ask",
  stop: "Stop",
  retry: "Retry",
  close: "Close",
  openLabel: "Ask about my work",
  inputLabel: "Your question",
  inputPlaceholder: "Ask about AI stacks, architecture trade-offs, projects…",
  empty: "Ask about my projects, technical stack, or background.",
  announcedReady: "Answer ready.",
  suggestions: [
    "What AI technologies do you use?",
    "Tell me about the interview system.",
    "What did you do at PureLogics?",
    "What is the Library Management System?",
  ],
  footnoteBefore: "AI answers can be wrong.",
  footnoteLink: "Email me",
  footnoteAfter: "to confirm anything important.",
  emailHref: `mailto:${profile.email}`,
  errors: {
    rateLimit: "Too many questions. Try again in a minute.",
    offline: "The assistant is offline right now. You can email me instead.",
  },
} as const;
