export type EducationItem = {
  // TODO(jazib): confirm the exact degree title
  degree: string;
  school: string;
  year: string;
  note: string;
  verified: boolean;
};

export const education: readonly EducationItem[] = [
  {
    degree: "BSCS",
    school: "University of Education",
    year: "2026",
    note: "Fresh graduate. Final year project: Library Management System.",
    verified: true,
  },
];
