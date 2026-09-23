export type SimulatorLine = {
  speaker: string;
  text: string;
};

export type ProjectMediaImage = {
  src?: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  switcherLabel?: string;
  switcherAriaLabel?: string;
};

export type ProjectMediaVideo = {
  src?: string;
  poster?: string;
  title: string;
};

export type ProjectGroup = "specialized-ai";

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
  group?: ProjectGroup;
  images?: readonly ProjectMediaImage[];
  video?: ProjectMediaVideo;
  // TODO(jazib): screenshots and optional demo video where noted in FACTS.md
  mediaTodo?: string;
  simulator?: {
    label: string;
    lines: readonly SimulatorLine[];
  };
};

export const projectsCopy = {
  title: "Projects",
  intro:
    "The AI interview system I'm building, my university Library Management System, Apple 3D Website, and Brainwave AI UI.",
  pipelineLabel: "Interview pipeline",
  expand: "Read more",
  collapse: "Show less",
  viewSite: "View site",
  opensInNewTab: "opens in a new tab",
  reposTitle: "Repositories",
  screenshotSoon: "Screenshot coming soon",
  screenshotSwitcher: "Recruiter dashboard screenshots",
} as const;

export const simulatorTiming = {
  lineDelayMs: 800,
} as const;

export const projects: readonly Project[] = [
  {
    id: "ai-interview-system",
    name: "Adaptive Multimodal AI Interview & Candidate Assessment System",
    // 42 words. Max 45. First person, from FACTS.md only.
    description:
      "I own the real-time voice interview and the recruiter dashboard on this 3-person team project, my final-month project in the PureLogics training program. It uses audio over LiveKit, a LiveKit Agents worker, barge-in, silence detection, noise suppression, and voice-triggered interview end.",
    stack: ["LiveKit", "LiveKit Agents", "Whisper", "ElevenLabs", "PostgreSQL", "Alembic", "Python"],
    status: "In progress",
    verified: true,
    kind: "project",
    flagship: true,
    badge: "PureLogics final project",
    myPart: "the real-time voice interview and the recruiter dashboard",
    teammates: "JD/CV eligibility matching, and interview question and assessment logic",
    // TODO(jazib): optional 30 to 60 second demo video
    images: [
      {
        src: "/projects/interview-dashboard.webp",
        alt: "Recruiter dashboard (in progress): live counts of applicants, eligible candidates and job postings",
        caption: "Recruiter dashboard, in progress",
        switcherLabel: "Overview",
        switcherAriaLabel: "Show dashboard overview",
        width: 1600,
        height: 766,
      },
      {
        src: "/projects/interview-dashboard-jobs.webp",
        alt: "Recruiter dashboard: creating a job posting and configuring AI screening rules",
        switcherLabel: "Job form",
        switcherAriaLabel: "Show job posting form",
        width: 1600,
        height: 766,
      },
    ],
    simulator: {
      label: "Illustrative simulation",
      lines: [
        {
          speaker: "Interviewer",
          text: "Tell me about a time you traded speed for accuracy.",
        },
        {
          speaker: "Candidate",
          text:
            "In our voice pipeline I chose local Whisper over a cloud API. It's free and has no quota, but it's slower on a CPU.",
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
    images: [
      {
        src: "/projects/LMS-Dashboard.webp",
        alt: "Library Management System desktop app: admin dashboard",
        caption: "Desktop app, admin dashboard",
        width: 1600,
        height: 803,
      },
    ],
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
    description: "Unverified.",
    stack: [],
    status: "Unverified",
    verified: false,
    kind: "project",
    group: "specialized-ai",
  },
  {
    id: "multi-agent-research-coordinator",
    name: "multi-agent research coordinator",
    description: "Unverified.",
    stack: [],
    status: "Unverified",
    verified: false,
    kind: "project",
    group: "specialized-ai",
  },
  {
    id: "fine-tuned-bert-classifier",
    name: "fine-tuned BERT classifier",
    description: "Unverified.",
    stack: [],
    status: "Unverified",
    verified: false,
    kind: "project",
    group: "specialized-ai",
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
