export type ExperienceItem = {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  highlights: readonly string[];
  verified: boolean;
};

export const experience: readonly ExperienceItem[] = [
  {
    role: "Python & AI/ML Developer Trainee",
    company: "PureLogics",
    location: "Lahore, Pakistan",
    start: "Jun 2026",
    end: "Sep 2026",
    highlights: [
      "Python, data analysis and ML model development with Pandas, NumPy and Scikit-Learn.",
      "Integrating AI endpoints into full-stack applications.",
    ],
    verified: true,
  },
];
