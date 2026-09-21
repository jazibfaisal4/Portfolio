export type PinnedRepo = {
  name: string;
  url: string;
  description: string;
  tags: readonly string[];
};

export const pinnedRepos: readonly PinnedRepo[] = [
  {
    name: "Adaptive AI Interview System",
    url: "https://github.com/jazibfaisal4/adaptive-multimodal-ai-interview-system",
    description:
      "Real-time AI voice interviews over LiveKit with local Whisper, and a recruiter dashboard. In progress.",
    tags: ["LiveKit", "Whisper", "PostgreSQL"],
  },
  {
    name: "Apple 3D Website",
    url: "https://github.com/jazibfaisal4/iPhone-3D-Website",
    description: "Immersive 3D product showcase built with Three.js, Framer Motion and Tailwind.",
    tags: ["Three.js", "Framer Motion"],
  },
  {
    name: "Brainwave AI UI",
    url: "https://github.com/jazibfaisal4/BrainWave",
    description: "Futuristic AI landing page built with React, Tailwind and Framer Motion.",
    tags: ["React", "Tailwind"],
  },
  {
    name: "Python AI Bootcamp",
    url: "https://github.com/jazibfaisal4/Python-AI-BootCamp",
    description: "All my lab work from the PureLogics Python and AI/ML training.",
    tags: ["Python"],
  },
];
