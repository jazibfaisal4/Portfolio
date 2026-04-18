export const personalInfo = {
  name: "Jazib Faisal",
  title: "BSCS Student & Full-Stack Developer",
  focus: "Architecting Web & Desktop Experiences",
  intro:
    "A BSCS Student building modern digital solutions with a focus on high-performance architecture and immersive interface design.",
  finalYearProject:
    "Library Management System for Quaid-e-Azam Library (Built with Electron.js & React).",
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
    image: "/assets/brainwave-ai-ui.png",
    imageAlt:
      "Brainwave AI interface preview with futuristic layered UI components and vivid gradients.",
  },
  {
    name: "LMS for Quaid-e-Azam Library",
    description:
      "Final Year Project: a robust desktop system for cataloging, issuing, tracking, and managing library operations.",
    link: "#",
    stack: ["Electron.js", "React", "Tailwind", "Desktop Architecture"],
    status: "In Progress",
    image: "/assets/lms-placeholder.svg",
    imageAlt:
      "Concept placeholder illustration for the Quaid-e-Azam Library Management System desktop application.",
  },
] as const;

export const skillGroups = {
  web: [
    "Next.js (App Router)",
    "React + TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "REST APIs",
  ],
  desktop: [
    "Electron.js",
    "Desktop UX Patterns",
    "State Management",
    "SQLite / Data Modeling",
    "Offline-First Thinking",
  ],
};
