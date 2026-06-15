export const personalInfo = {
  name: "Jazib Faisal",
  title: "BSCS Student & Full-Stack Developer",
  focus: "Architecting Full-Stack & Desktop Experiences",
  intro:
    "A Full-Stack and MERN Stack Developer building modern digital solutions with a focus on high-performance architecture, robust backend systems, and immersive interface design.",
  finalYearProject:
    "Library Management System for Quaid-e-Azam Library — a full-stack Electron desktop app with Node.js, Express, and MySQL.",
};

export const socials = [
  {
    name: "GitHub",
    href: "https://github.com/jazibfaisal4",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/jazib-faisal-5a8978322/",
  },
] as const;

export const featuredProjects = [
  {
    name: "Apple 3D Website",
    description:
      "An immersive web experience focusing on high-fidelity 3D model interaction and smooth motion design.",
    link: "https://i-phone-3-d-website-omega.vercel.app/",
    stack: ["Three.js", "Framer Motion", "Tailwind"],
    status: "Live",
    highlight: false,
    image: "/assets/apple-3d-website.png",
    imageAlt:
      "3D Apple website preview showing a premium smartphone product showcase with cinematic lighting.",
  },
  {
    name: "Brainwave AI UI",
    description:
      "A futuristic AI interface with layered components, visual rhythm, and polished high-end presentation.",
    link: "https://brain-wave-1ymq.vercel.app/",
    stack: ["React", "Tailwind", "Framer Motion", "UI Engineering"],
    status: "Live",
    highlight: false,
    image: "/assets/brainwave-ai-ui.png",
    imageAlt:
      "Brainwave AI interface preview with futuristic layered UI components and vivid gradients.",
  },
  {
    name: "Library Management System — Quaid-e-Azam Library",
    description:
      "A robust full-stack desktop app managing real-time library operations, data persistence, and secure user logic. Built as a native Electron application for Quaid-e-Azam Library.",
    link: "#",
    stack: ["Electron.js", "React.js", "Node.js", "Express.js", "MySQL", "Sequelize ORM"],
    status: "In Progress",
    highlight: true,
    badge: "Final Year Project",
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
    "REST APIs",
  ],
  desktop: [
    "Electron.js",
    "Desktop UX Patterns",
    "State Management",
    "Offline-First Thinking",
  ],
};

/** Curated list for the Technical Stack bento grid */
export const techStack = [
  "Next.js",
  "React.js",
  "TypeScript",
  "Tailwind CSS",
  "Electron.js",
  "Node.js",
  "Express.js",
  "MySQL",
  "Sequelize ORM",
  "Zustand",
] as const;
