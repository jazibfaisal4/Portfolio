export type AboutFact = {
  title: string;
  detail: string;
};

export type AboutCopy = {
  title: string;
  statement: string;
  facts: readonly AboutFact[];
};

export const about: AboutCopy = {
  title: "About",
  statement:
    "I'm Jazib Faisal, a fresh BSCS graduate from the University of Education (2026) and an AI/ML and full-stack developer in Lahore. I completed a Python and AI/ML trainee role at PureLogics, using Pandas, NumPy and Scikit-Learn and integrating AI endpoints into full-stack apps. I'm building the real-time voice interview and recruiter dashboard for a three-person AI interview system: LiveKit audio, local Whisper speech-to-text, and PostgreSQL results. My university final year project was a native Electron.js Library Management System for Quaid-e-Azam Library.",
  facts: [
    {
      title: "Fresh BSCS graduate",
      detail: "University of Education, 2026.",
    },
    {
      title: "PureLogics trainee 2026",
      detail: "Python & AI/ML Developer Trainee, Lahore. Jun 2026 to Sep 2026.",
    },
    {
      title: "Built the AI interview system in a team of 3",
      detail: "Real-time voice interview and recruiter dashboard.",
    },
  ],
};
