export type SimulatorLine = {
  speaker: string;
  text: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  stack: readonly string[];
  status: string;
  verified: boolean;
  kind: "project" | "repo";
  flagship?: boolean;
  badge?: string;
  period?: string;
  liveUrl?: string;
  myPart?: string;
  teammates?: string;
  // TODO(jazib): screenshots and optional demo video where noted in FACTS.md
  mediaTodo?: string;
  simulator?: {
    label: string;
    lines: readonly SimulatorLine[];
  };
};

export const projects: readonly Project[] = [
  {
    id: "ai-interview-system",
    name: "Adaptive Multimodal AI Interview & Candidate Assessment System",
    description:
      "In progress. 3-person team project, my final-month project in the PureLogics training program (it is not my university final year project). Built and working: real-time audio over LiveKit; a LiveKit Agents worker with custom speech-to-text, LLM and text-to-speech stages; proactive greeting and first question; barge-in (the candidate can interrupt the AI), silence detection, noise suppression, voice-triggered interview end. Speech-to-text: OpenAI Whisper (small model), local, CPU. Text-to-speech: ElevenLabs primary, local Meta MMS-TTS fallback. Voice sessions link to real candidate application records. Completed interviews are saved as evaluated results in PostgreSQL (Alembic migrations).",
    stack: ["LiveKit", "LiveKit Agents", "Whisper", "ElevenLabs", "PostgreSQL", "Alembic", "Python"],
    status: "In progress",
    verified: true,
    kind: "project",
    flagship: true,
    badge: "PureLogics final project",
    myPart: "the real-time voice interview and the recruiter dashboard",
    teammates: "JD/CV eligibility matching, and interview question and assessment logic",
    mediaTodo: "TODO(jazib) screenshots (voice screen, dashboard) and an optional 30 to 60 second demo video",
    simulator: {
      label: "Illustrative simulation",
      lines: [
        {
          speaker: "Interviewer",
          text: "Tell me about a time you traded speed for accuracy.",
        },
        {
          speaker: "Candidate",
          text: "In our voice pipeline I chose local Whisper over a cloud API. It's free and has no quota, but it's slower on a CPU.",
        },
        {
          speaker: "Adaptive follow-up",
          text: "What would you change if you had a GPU?",
        },
      ],
    },
  },
  {
    id: "library-management-system",
    name: "Library Management System",
    description:
      "Native Electron.js desktop app for Quaid-e-Azam Library: React.js, Node.js, Express.js, MySQL with Sequelize ORM. Real-time automated book tracking, secure database architecture, native desktop integration.",
    stack: ["Electron.js", "React.js", "Node.js", "Express.js", "MySQL", "Sequelize ORM"],
    status: "Completed",
    verified: true,
    kind: "project",
    badge: "Final year project",
    period: "Jan 2026 to Aug 2026",
    mediaTodo: "TODO(jazib) screenshots",
  },
  {
    id: "apple-3d-website",
    name: "Apple 3D Website",
    description: "Immersive 3D product showcase.",
    stack: ["Three.js", "Framer Motion", "Tailwind"],
    status: "Live",
    verified: true,
    kind: "project",
    liveUrl: "https://i-phone-3-d-website-omega.vercel.app/",
  },
  {
    id: "brainwave-ai-ui",
    name: "Brainwave AI UI",
    description: "Futuristic AI landing page.",
    stack: ["React", "Tailwind", "Framer Motion"],
    status: "Live",
    verified: true,
    kind: "project",
    liveUrl: "https://brain-wave-1ymq.vercel.app/",
  },
  {
    id: "rag-document-engine",
    name: "RAG document engine",
    description: "Unverified Specialized AI Systems card.",
    stack: [],
    status: "Unverified",
    verified: false,
    kind: "project",
  },
  {
    id: "multi-agent-research-coordinator",
    name: "multi-agent research coordinator",
    description: "Unverified Specialized AI Systems card.",
    stack: [],
    status: "Unverified",
    verified: false,
    kind: "project",
  },
  {
    id: "fine-tuned-bert-classifier",
    name: "fine-tuned BERT classifier",
    description: "Unverified Specialized AI Systems card.",
    stack: [],
    status: "Unverified",
    verified: false,
    kind: "project",
  },
  {
    id: "voice-eval-interviewer",
    name: "voice-eval-interviewer",
    description: "Unverified repository.",
    stack: [],
    status: "Unverified",
    verified: false,
    kind: "repo",
  },
  {
    id: "langgraph-multi-agent-researcher",
    name: "langgraph-multi-agent-researcher",
    description: "Unverified repository.",
    stack: [],
    status: "Unverified",
    verified: false,
    kind: "repo",
  },
];
