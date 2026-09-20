export type FocusArea = "ai-ml" | "fullstack" | "desktop";

export const personalInfo = {
  name: "Jazib Faisal",
  title: "AI/ML Developer & Full-Stack Engineer",
  headline: "AI/ML Developer & Full-Stack Engineer",
  bio: "AI/ML Developer and Full-Stack MERN Specialist building intelligent digital solutions. Currently honing advanced machine learning at PureLogics AI Bootcamp, combining high-performance Python/AI models with robust web and desktop architectures.",
  focus: "AI/ML Developer & Full-Stack Engineer",
  intro:
    "AI/ML Developer and Full-Stack MERN Specialist building intelligent digital solutions. Currently honing advanced machine learning at PureLogics AI Bootcamp, combining high-performance Python/AI models with robust web and desktop architectures.",
  finalYearProject:
    "Full-Stack Library Management System for Quaid-e-Azam Library — native Electron desktop app with Node.js, Express, Sequelize ORM, and MySQL.",
};

export const socials = [
  { name: "GitHub", href: "https://github.com/jazibfaisal4" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/jazib-faisal-5a8978322/" },
] as const;

export const experience = [
  {
    role: "AI / Machine Learning Trainee",
    company: "PureLogics (Python AI Bootcamp)",
    period: "July 2026 – Present (3 Months)",
    location: "Lahore, Pakistan",
    highlights: [
      "Hands-on intensive bootcamp focused on Python, Data Analysis, and ML model development.",
      "Building and training predictive models using Pandas, NumPy, and Scikit-Learn.",
      "Integrating AI endpoints into full-stack web and desktop applications.",
    ],
    focusAreas: ["ai-ml"] as FocusArea[],
  },
] as const;

export const featuredProjects = [
  {
    name: "Apple 3D Website",
    tagline: "Immersive 3D Product Showcase",
    description:
      "An immersive web experience focusing on high-fidelity 3D model interaction and smooth motion design.",
    link: "https://i-phone-3-d-website-omega.vercel.app/",
    stack: ["Three.js", "Framer Motion", "Tailwind"],
    status: "Live",
    highlight: false,
    focusAreas: ["fullstack"] as FocusArea[],
    image: "/assets/apple-3d-website.png",
    imageAlt:
      "3D Apple website preview showing a premium smartphone product showcase with cinematic lighting.",
  },
  {
    name: "Brainwave AI UI",
    tagline: "Futuristic AI Landing Page",
    description:
      "A futuristic AI interface with layered components, visual rhythm, and polished high-end presentation.",
    link: "https://brain-wave-1ymq.vercel.app/",
    stack: ["React", "Tailwind", "Framer Motion", "UI Engineering"],
    status: "Live",
    highlight: false,
    focusAreas: ["ai-ml", "fullstack"] as FocusArea[],
    image: "/assets/brainwave-ai-ui.png",
    imageAlt:
      "Brainwave AI interface preview with futuristic layered UI components and vivid gradients.",
  },
  {
    name: "Full-Stack Library Management System",
    tagline: "Native Desktop Application for Quaid-e-Azam Library",
    description:
      "A robust, production-ready desktop application featuring real-time automated book tracking, secure database architecture, and native desktop integration.",
    link: "#",
    stack: ["Electron.js", "React.js", "Node.js", "Express.js", "Sequelize ORM", "MySQL"],
    status: "In Progress",
    highlight: true,
    badge: "Final Year Project",
    focusAreas: ["desktop", "fullstack"] as FocusArea[],
    image: "/assets/lms-placeholder.svg",
    imageAlt:
      "Concept placeholder illustration for the Quaid-e-Azam Library Management System desktop application.",
  },
] as const;

export const skillGroups = {
  web: [
    "Next.js (App Router)",
    "React.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Zustand",
  ],
  backend: [
    "Node.js",
    "Express.js",
    "MySQL",
    "Sequelize ORM",
    "Prisma",
    "Supabase",
    "REST APIs",
  ],
  ai: ["Python", "Pandas", "Scikit-Learn", "NumPy", "Data Analysis", "ML Models"],
  desktop: [
    "Electron.js",
    "Desktop UX Patterns",
    "State Management",
    "Offline-First Thinking",
  ],
};

export type TechStackItem = {
  name: string;
  focusAreas: FocusArea[];
};

export const techStack: TechStackItem[] = [
  { name: "Python", focusAreas: ["ai-ml"] },
  { name: "Pandas", focusAreas: ["ai-ml"] },
  { name: "Scikit-Learn", focusAreas: ["ai-ml"] },
  { name: "Next.js", focusAreas: ["fullstack"] },
  { name: "React.js", focusAreas: ["fullstack"] },
  { name: "TypeScript", focusAreas: ["fullstack"] },
  { name: "Node.js", focusAreas: ["fullstack", "desktop"] },
  { name: "Express.js", focusAreas: ["fullstack", "desktop"] },
  { name: "MySQL", focusAreas: ["fullstack", "desktop"] },
  { name: "Sequelize ORM", focusAreas: ["fullstack", "desktop"] },
  { name: "Prisma", focusAreas: ["fullstack"] },
  { name: "Supabase", focusAreas: ["fullstack"] },
  { name: "Zustand", focusAreas: ["fullstack"] },
  { name: "Electron.js", focusAreas: ["desktop"] },
  { name: "Tailwind CSS", focusAreas: ["fullstack"] },
];

export const focusOptions: { id: FocusArea; label: string }[] = [
  { id: "ai-ml", label: "AI / ML Focus" },
  { id: "fullstack", label: "Full-Stack Focus" },
  { id: "desktop", label: "Desktop Dev Focus" },
];
