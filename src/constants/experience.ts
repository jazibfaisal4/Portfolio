export type ExperienceItem = {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  highlights: readonly string[];
  verified: boolean;
};

export const experienceCopy = {
  title: "Experience",
  educationTitle: "Education",
  githubTitle: "GitHub",
  githubLoading: "Loading repositories",
  viewOnGithub: "View on GitHub",
  opensInNewTab: "opens in a new tab",
  starsLabel: "stars",
} as const;

export function experienceDates(item: ExperienceItem): string {
  return `${item.start} to ${item.end}`;
}

const monthIndex: Record<string, string> = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

export function experienceDateTime(label: string): string | undefined {
  const [month, year] = label.split(" ");
  const mm = month ? monthIndex[month] : undefined;
  if (!mm || !year) return undefined;
  return `${year}-${mm}`;
}

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
