export const SHOW_UNVERIFIED = false;

export type SocialLink = {
  name: string;
  href: string;
};

export type Profile = {
  name: string;
  title: string;
  location: string;
  openTo: {
    roles: string;
    location: string;
    // TODO(jazib): remote preference
    remote: string;
  };
  email: string;
  github: string;
  linkedin: string;
  // TODO(jazib): replace the file with the latest one
  resume: string;
  hero: {
    pill: string;
    headline: string;
    subtext: string;
    ctas: readonly string[];
  };
  contact: {
    heading: string;
    subtext: string;
  };
  socials: readonly SocialLink[];
};

export const profile: Profile = {
  name: "Jazib Faisal",
  title: "AI/ML developer and full-stack developer. Fresh BSCS graduate.",
  location: "Lahore, Pakistan",
  openTo: {
    roles: "AI/ML Engineer roles, entry level",
    location: "Lahore",
    remote: "TODO(jazib)",
  },
  email: "jazibfaisal66@gmail.com",
  github: "https://github.com/jazibfaisal4",
  linkedin: "https://www.linkedin.com/in/jazib-faisal-5a8978322/",
  resume: "/Jazib_Faisal_Resume.pdf",
  hero: {
    pill: "Open to AI/ML opportunities",
    headline: "I build voice-first AI systems and the full-stack products around them.",
    subtext:
      "Fresh BSCS graduate. I'm building a real-time AI interview system: live audio over LiveKit, local Whisper speech-to-text and a recruiter dashboard.",
    ctas: ["See my work", "Download resume"],
  },
  contact: {
    heading: "Have a role or project in mind?",
    subtext: "Send a message and I'll reply by email.",
  },
  socials: [
    { name: "GitHub", href: "https://github.com/jazibfaisal4" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/jazib-faisal-5a8978322/" },
  ],
};
