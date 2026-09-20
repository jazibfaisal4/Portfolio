export type SkillCategory = "ai-ml" | "voice" | "fullstack" | "backend" | "desktop";

export type Skill = {
  name: string;
  category: SkillCategory;
  usedFor?: string;
  verified: boolean;
};

export const skills: readonly Skill[] = [
  {
    name: "Python",
    category: "ai-ml",
    usedFor: "Data analysis and ML model development at PureLogics, and the interview system worker.",
    verified: true,
  },
  {
    name: "Pandas",
    category: "ai-ml",
    usedFor: "Data analysis and ML model development at PureLogics.",
    verified: true,
  },
  {
    name: "NumPy",
    category: "ai-ml",
    usedFor: "Data analysis and ML model development at PureLogics.",
    verified: true,
  },
  {
    name: "Scikit-Learn",
    category: "ai-ml",
    usedFor: "ML model development at PureLogics.",
    verified: true,
  },
  {
    name: "data analysis",
    category: "ai-ml",
    usedFor: "Python & AI/ML trainee work at PureLogics.",
    verified: true,
  },
  {
    name: "ML model development",
    category: "ai-ml",
    usedFor: "Python & AI/ML trainee work at PureLogics.",
    verified: true,
  },
  {
    name: "Hugging Face Transformers (Whisper)",
    category: "ai-ml",
    usedFor: "Local Whisper speech-to-text in the interview system.",
    verified: true,
  },
  {
    name: "LiveKit",
    category: "voice",
    usedFor: "Real-time candidate audio in the interview system.",
    verified: true,
  },
  {
    name: "LiveKit Agents",
    category: "voice",
    usedFor: "Live interview conversation worker.",
    verified: true,
  },
  {
    name: "Whisper",
    category: "voice",
    usedFor: "Local small-model speech-to-text on CPU.",
    verified: true,
  },
  {
    name: "ElevenLabs",
    category: "voice",
    usedFor: "Primary text-to-speech in the interview system.",
    verified: true,
  },
  { name: "Next.js (App Router)", category: "fullstack", verified: true },
  {
    name: "React.js",
    category: "fullstack",
    usedFor: "Library Management System UI and Brainwave AI UI.",
    verified: true,
  },
  { name: "TypeScript", category: "fullstack", verified: true },
  {
    name: "Tailwind CSS",
    category: "fullstack",
    usedFor: "Apple 3D Website and Brainwave AI UI.",
    verified: true,
  },
  {
    name: "Framer Motion",
    category: "fullstack",
    usedFor: "Apple 3D Website and Brainwave AI UI.",
    verified: true,
  },
  { name: "Zustand", category: "fullstack", verified: true },
  {
    name: "Node.js",
    category: "backend",
    usedFor: "Library Management System backend.",
    verified: true,
  },
  {
    name: "Express.js",
    category: "backend",
    usedFor: "Library Management System backend.",
    verified: true,
  },
  {
    name: "PostgreSQL",
    category: "backend",
    usedFor: "Saving completed interview results linked to candidate applications.",
    verified: true,
  },
  {
    name: "MySQL",
    category: "backend",
    usedFor: "Library Management System database.",
    verified: true,
  },
  {
    name: "Sequelize ORM",
    category: "backend",
    usedFor: "Library Management System database access.",
    verified: true,
  },
  { name: "Prisma", category: "backend", verified: true },
  { name: "Supabase", category: "backend", verified: true },
  { name: "REST APIs", category: "backend", verified: true },
  {
    name: "Alembic",
    category: "backend",
    usedFor: "PostgreSQL migrations for interview results.",
    verified: true,
  },
  {
    name: "Electron.js",
    category: "desktop",
    usedFor: "Native Library Management System desktop app.",
    verified: true,
  },
  { name: "desktop UX patterns", category: "desktop", verified: true },
  { name: "state management", category: "desktop", verified: true },
  { name: "offline-first thinking", category: "desktop", verified: true },
  { name: "PyTorch", category: "ai-ml", verified: false },
  { name: "LangGraph", category: "ai-ml", verified: false },
  { name: "CrewAI", category: "ai-ml", verified: false },
  { name: "MCP", category: "ai-ml", verified: false },
  { name: "NeMo Guardrails", category: "ai-ml", verified: false },
  { name: "Chroma", category: "ai-ml", verified: false },
  { name: "Qdrant", category: "ai-ml", verified: false },
  { name: "FAISS", category: "ai-ml", verified: false },
  { name: "advanced RAG", category: "ai-ml", verified: false },
  { name: "Stable Diffusion", category: "ai-ml", verified: false },
  { name: "Gemini Flash / GPT-4o", category: "ai-ml", verified: false },
  { name: "Cartesia", category: "voice", verified: false },
  { name: "FastAPI for the interview system", category: "backend", verified: false },
];
